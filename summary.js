const materials = { /* same object as in script.js */ };

document.addEventListener("DOMContentLoaded", () => {
  const stored = JSON.parse(sessionStorage.getItem("submission") || "{}");
  const mat = stored.material;
  const reqs = materials[mat].requirements;
  const container = document.getElementById("summary-container");

  container.innerHTML = `<h2>${mat}</h2>`;
  // for each field in stored, compare to reqs
  for (let key in stored) {
    if (key === "material") continue;
    const val = stored[key];
    // find corresponding requirement
    let pass = true, range = "";
    // simple mapping for chem_
    if (key.startsWith("chem_")) {
      const el = key.slice(5);
      const { min, max } = reqs.chemical_composition.elements[el];
      pass = (min==null || val>=min) && (max==null || val<=max);
      range = `${min!=null?min:"–"}–${max!=null?max:"–"}`;
    }
    else if (["yield_strength","tensile_strength"].includes(key)) {
      const rr = reqs.mechanical_properties[key];
      const min = rr.min.psi, max = rr.max?.psi;
      pass = (min==null||val>=min)&&(max==null||val<=max);
      range = `${min!=null?min:"–"}–${max!=null?max:"–"}`;
    }
    else if (["elongation","reduction_of_area"].includes(key)) {
      const rr = reqs.mechanical_properties[key];
      const min = rr.min_percent, max = rr.max_percent;
      pass = (min==null||val>=min)&&(max==null||val<=max);
      range = `${min!=null?min:"–"}–${max!=null?max:"–"}%`;
    }
    else if (key==="hardness_hbw") {
      const { min, max } = reqs.mechanical_properties.hardness_hbw;
      pass = (val>=min)&&(val<=max);
      range = `${min}–${max}`;
    }
    else if (["rockwell","brinell"].includes(key)) {
      // for hardness test
      const performed = stored.rockwell || stored.brinell;
      pass = performed;
      range = reqs.hardness_test_required.requirement==="at_least_one"
        ? "At least one"
        : "Both";
      // only render once
      if (key==="rockwell") {
        container.innerHTML += `<p>Hardness Test: ${pass?"✅":"❌"} (${range})</p>`;
      }
      continue;
    }
    else if (key==="reduction_ratio") {
      const min = reqs.reduction_ratio.min;
      pass = val>=min;
      range = `≥ ${min}`;
    }
    else if (key.startsWith("api_")) {
      // impact tables: api_#__i
      const [table,i] = key.split("_").slice(0,2);
      const row = reqs.impact_testing.tables[table][i];
      const min = row.min_avg_impact_ftlbs;
      pass = (min==null)||(val>=min);
      range = min!=null?`≥${min}`:"–";
    } else {
      continue;
    }

    container.innerHTML += `
      <p>
        <strong>${key.replace(/_/g," ").toUpperCase()}</strong>: ${val}
        &nbsp;[Req: ${range}] &nbsp;${pass?"✅":"❌"}
      </p>
    `;
  }
});
