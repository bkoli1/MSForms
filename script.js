// script.js

document.addEventListener("DOMContentLoaded", () => {
  const sel  = document.getElementById("material");
  const form = document.getElementById("dynamic-form");

  // When a material is selected, render its form
  sel.addEventListener("change", () => {
    const key = sel.value;
    if (!key) {
      form.style.display = "none";
    } else {
      renderForm(key);
      form.style.display = "block";
    }
  });

  // When the radio for continuous/batch changes, inject the correct HT fields
  form.addEventListener("change", e => {
    if (e.target.name === "ht_type") {
      const matKey = sel.value;
      const htReq  = materials[matKey].requirements.heat_treatment[e.target.value]
                      .requirements;
      document.getElementById("ht-fields").innerHTML =
        renderHTFields(htReq, e.target.value);
    }
  });

  // On submit, gather values + checkboxes and redirect to summary
  form.addEventListener("submit", e => {
    e.preventDefault();
    const data   = new FormData(form);
    const values = {};
    for (let [k, v] of data.entries()) {
      values[k] = parseFloat(v) || v;
    }
    values.material = sel.value;
    document.querySelectorAll("input[type=checkbox]").forEach(cb => {
      values[cb.name] = cb.checked;
    });
    sessionStorage.setItem("submission", JSON.stringify(values));
    window.location.href = "summary.html";
  });
});

function renderForm(mat) {
  const cfg       = materials[mat].form.sections;
  const container = document.getElementById("form-container");
  container.innerHTML = "";

  cfg.forEach(sec => {
    const fieldset = document.createElement("fieldset");
    fieldset.innerHTML = `
      <legend>${sec.title}</legend>
      ${renderSection(sec.key, mat)}
    `;
    container.appendChild(fieldset);
  });
}

function renderSection(key, mat) {
  const req  = materials[mat].requirements[key];
  let html = "";

  switch (key) {
    case "chemical_composition":
      for (let el in req.elements) {
        html += `
          <label>${el} (%):
            <input name="chem_${el}" type="number" step="0.001" required>
          </label><br>
        `;
      }
      break;

    case "mechanical_properties":
      html = `
        <label>Yield strength (psi): <input name="yield_strength" type="number" required></label><br>
        <label>Tensile strength (psi): <input name="tensile_strength" type="number" required></label><br>
        <label>Elongation (%): <input name="elongation" type="number" required></label><br>
        <label>Reduction of area (%): <input name="reduction_of_area" type="number" required></label><br>
        <label>Hardness HBW: <input name="hardness_hbw" type="number" required></label><br>
      `;
      break;

    case "hardness_test_required":
      html = `
        <label><input type="checkbox" name="rockwell"> Rockwell</label><br>
        <label><input type="checkbox" name="brinell"> Brinell</label><br>
      `;
      break;

    case "heat_treatment":
      if (req.selection_required) {
        html = `
          <label><input type="radio" name="ht_type" value="continuous" required> Continuous</label>
          <label><input type="radio" name="ht_type" value="batch"> Batch</label><br>
          <div id="ht-fields"></div>
        `;
      } else {
        // always batch
        html = renderHTFields(req.batch.requirements, "batch");
      }
      break;

    case "impact_testing":
      for (let tableKey in req.tables) {
        html += `<strong>${tableKey}</strong><br>`;
        req.tables[tableKey].forEach((row,i) => {
          const label = row.class || row.temperature_classification;
          if (row.min_avg_impact_ftlbs !== null && row.min_avg_impact_ftlbs !== undefined) {
          html += `
              <label>${label} Avg Impact (ft-lb):
              <input name="${tableKey}_${i}" type="number" required>
              </label><br>
          `;
        }
        });
      }
      break;

    case "reduction_ratio":
      html = `
        <label>Reduction ratio (to 1):
          <input name="reduction_ratio" type="number" required>
        </label><br>
      `;
      break;
  }

  return html;
}

function renderHTFields(fields, mode) {
  let out = "";

  for (let step in fields) {
    const f = fields[step];
    out += `<fieldset><legend>${step.replace(/_/g, " ")}</legend>`;

    // Batch style: temperature_range
    if (f.temperature_range) {
      out += `
        <label>Min Temp (°F):
          <input name="${mode}_${step}_min_f" type="number" required>
        </label><br>
        <label>Max Temp (°F):
          <input name="${mode}_${step}_max_f" type="number" required>
        </label><br>
      `;
    }
    // Continuous style: min_f / max_f
    else {
      if ("min_f" in f) {
        out += `
          <label>Min Temp (°F):
            <input name="${mode}_${step}_min_f" type="number" required>
          </label><br>
        `;
      }
      if ("max_f" in f) {
        out += `
          <label>Max Temp (°F):
            <input name="${mode}_${step}_max_f" type="number" required>
          </label><br>
        `;
      }
    }

    // Time‐based fields (both batch & continuous)
    if ("time_per_inch_thickness_min_minutes" in f) {
      out += `
        <label>Time per inch (min):
          <input
            name="${mode}_${step}_time_per_inch_thickness_min_minutes"
            type="number" required>
        </label><br>
      `;
    }
    if ("min_minutes" in f) {
      out += `
        <label>Time (min):
          <input name="${mode}_${step}_min_minutes" type="number" required>
        </label><br>
      `;
    }
    if ("total_min_time_minutes" in f) {
      out += `
        <label>Total Min Time (min):
          <input
            name="${mode}_${step}_total_min_time_minutes"
            type="number" required>
        </label><br>
      `;
    }

    out += `</fieldset>`;
  }

  return out;
}
