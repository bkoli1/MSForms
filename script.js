


document.addEventListener("DOMContentLoaded", () => {
  const sel = document.getElementById("material");
  const form = document.getElementById("dynamic-form");
  sel.addEventListener("change", () => {
    const key = sel.value;
    if (!key) {
      form.style.display = "none";
      return;
    }
    renderForm(key);
    form.style.display = "block";
  });

  form.addEventListener("submit", e => {
    e.preventDefault();
    const data = new FormData(form);
    const values = {};
    for (let [k, v] of data.entries()) values[k] = parseFloat(v) || v;
    // include which material and any checkboxes
    values.material = sel.value;
    document.querySelectorAll("input[type=checkbox]").forEach(cb => {
      values[cb.name] = cb.checked;
    });
    // store and redirect
    sessionStorage.setItem("submission", JSON.stringify(values));
    window.location.href = "summary.html";
  });
});

function renderForm(mat) {
  const cfg = materials[mat].form.sections;
  const container = document.getElementById("form-container");
  container.innerHTML = "";

  cfg.forEach(sec => {
    const fieldset = document.createElement("fieldset");
    fieldset.innerHTML = `<legend>${sec.title}</legend>${renderSection(sec.key, mat)}`;
    container.appendChild(fieldset);
  });
}

function renderSection(key, mat) {
  const req = materials[mat].requirements[key];
  let html = "";
  switch (key) {
    case "chemical_composition":
      for (let el in req.elements) {
        html += `<label>${el} (%): <input name="chem_${el}" type="number" step="0.001" required></label><br>`;
      }
      break;

    case "mechanical_properties":
      html += `
        <label>Yield strength (psi): <input name="yield_strength" type="number" required></label><br>
        <label>Tensile strength (psi): <input name="tensile_strength" type="number" required></label><br>
        <label>Elongation (%): <input name="elongation" type="number" required></label><br>
        <label>Reduction of area (%): <input name="reduction_of_area" type="number" required></label><br>
        <label>Hardness HBW: <input name="hardness_hbw" type="number" required></label><br>
      `;
      break;

    case "hardness_test_required":
      html += `
        <label><input type="checkbox" name="rockwell"> Rockwell performed</label><br>
        <label><input type="checkbox" name="brinell"> Brinell performed</label><br>
      `;
      break;

    case "heat_treatment":
      if (req.selection_required) {
        html += `<label><input type="radio" name="ht_type" value="continuous" required> Continuous</label>
                 <label><input type="radio" name="ht_type" value="batch"> Batch</label><br>`;
        html += `<div id="ht-fields"></div>`;
        // delegate showing appropriate sub-fields
        setTimeout(() => {
          document.getElementsByName("ht_type")
            .forEach(r => r.addEventListener("change", e => {
              document.getElementById("ht-fields").innerHTML =
                renderHTFields(req[e.target.value].requirements, e.target.value);
            }));
        }, 0);
      } else {
        html += renderHTFields(req.batch.requirements, "batch");
      }
      break;

    case "impact_testing":
      for (let tableKey in req.tables) {
        html += `<strong>${tableKey}</strong><br>`;
        req.tables[tableKey].forEach((row,i) => {
          html += `
            <label>${row.class || row.temperature_classification} Avg Impact (ft-lb):
              <input name="${tableKey}_${i}" type="number" required>
            </label><br>
          `;
        });
      }
      break;

    case "reduction_ratio":
      html += `<label>Reduction ratio (to 1): <input name="reduction_ratio" type="number" required></label><br>`;
      break;
  }
  return html;
}

function renderHTFields(fields, mode) {
  let out = "";
  for (let key in fields) {
    const f = fields[key];
    // temperature_range?
    if (f.temperature_range) {
      out += `<fieldset><legend>${key}</legend>
        <label>Min Temp (°F): <input name="${mode}_${key}_min_f" type="number" required></label><br>
        <label>Max Temp (°F): <input name="${mode}_${key}_max_f" type="number" required></label><br>
      `;
      if (f.min_minutes != null) {
        out += `<label>Time per inch (min): <input name="${mode}_${key}_min_minutes" type="number" required></label><br>`;
      }
      if (f.total_min_time_minutes) {
        out += `<label>Total Min Time (min): <input name="${mode}_${key}_total_minutes" type="number" required></label><br>`;
      }
      out += `</fieldset>`;
    }
  }
  return out;
}
