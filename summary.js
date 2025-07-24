// summary.js

// Immediately render the summary, since this script is loaded at the end of the body
const stored = JSON.parse(sessionStorage.getItem("submission") || "{}");
const container = document.getElementById("summary-container");

if (!stored.material) {
  container.innerHTML = "<p>No submission found.</p>";
} else {
  const mat  = stored.material;
  const reqs = materials[mat].requirements;

  // Build the HTML
  let html = `<h2>${mat}</h2>`;

  Object.keys(stored).forEach(key => {
    if (key === "material") return;
    const val = stored[key];
    let pass = true, range = "";

    // 1) Chemical composition
    if (key.startsWith("chem_")) {
      const el = key.slice(5);
      const { min, max } = reqs.chemical_composition.elements[el];
      pass  = (min == null || val >= min) && (max == null || val <= max);
      range = `${min != null ? min : "–"}–${max != null ? max : "–"}`;

    // 2) Yield & Tensile
    } else if (["yield_strength","tensile_strength"].includes(key)) {
      const rr  = reqs.mechanical_properties[key];
      const min = rr.min.psi, max = rr.max?.psi;
      pass  = (min == null || val >= min) && (max == null || val <= max);
      range = `${min != null ? min : "–"}–${max != null ? max : "–"}`;

    // 3) Elongation & Reduction of area
    } else if (["elongation","reduction_of_area"].includes(key)) {
      const rr  = reqs.mechanical_properties[key];
      const min = rr.min_percent, max = rr.max_percent;
      pass  = (min == null || val >= min) && (max == null || val <= max);
      range = `${min != null ? min : "–"}–${max != null ? max : "–"}%`;

    // 4) Hardness HBW
    } else if (key === "hardness_hbw") {
      const { min, max } = reqs.mechanical_properties.hardness_hbw;
      pass  = (val >= min) && (val <= max);
      range = `${min}–${max}`;

    // 5) Hardness test checkboxes
    } else if (["rockwell","brinell"].includes(key)) {
      if (key === "rockwell") {
        const performed = stored.rockwell || stored.brinell;
        pass  = performed;
        range = reqs.hardness_test_required.requirement === "at_least_one"
                ? "At least one"
                : "Both";
        html += `<p><strong>Hardness Test</strong>: ${performed ? "✅" : "❌"} (${range})</p>`;
      }
      return;

    // 6) Reduction ratio
    } else if (key === "reduction_ratio") {
      const min = reqs.reduction_ratio.min;
      pass  = val >= min;
      range = `≥ ${min}`;

    // 7) Impact testing (api_6a, api_16a, etc)
    } else if (key.startsWith("api_")) {
      const parts = key.split("_");                 // e.g. ["api","6a","0"]
      const table = parts.slice(0,2).join("_");     // "api_6a"
      const idx   = parseInt(parts[2], 10);         // 0,1,2...
      const row   = reqs.impact_testing.tables[table][idx];
      const min   = row.min_avg_impact_ftlbs;
      pass  = (min == null) || (val >= min);
      range = min != null ? `≥ ${min}` : "–";

    } else {
      // skip any unhandled keys (e.g. ht_type)
      return;
    }

    html += `
      <p>
        <strong>${key.replace(/_/g, " ").toUpperCase()}</strong>:
        ${val}
        &nbsp;[Req: ${range}]&nbsp;${pass ? "✅" : "❌"}
      </p>`;
  });

  container.innerHTML = html;
}
