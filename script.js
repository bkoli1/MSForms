// 1. Embed all four materials’ definitions
const materials = {
  "MS-B14": {
    material: "MS-B14",
    form: {
      sections: [
        { key: "chemical_composition",   title: "Chemical Composition",   order: 1 },
        { key: "mechanical_properties",  title: "Mechanical Properties",  order: 2 },
        { key: "hardness_test_required", title: "Hardness Test",           order: 3 },
        { key: "heat_treatment",         title: "Heat Treatment",          order: 4 },
        { key: "impact_testing",         title: "Impact Testing",          order: 5 },
        { key: "reduction_ratio",        title: "Reduction Ratio",         order: 6 }
      ]
    },
    requirements: {
      chemical_composition: {
        per_astm_a751: true,
        elements: {
          C:  { min: 0.28, max: 0.33 },
          Mn: { min: 0.40, max: 0.60 },
          Si: { min: 0.15, max: 0.35 },
          P:  { min: null, max: 0.025 },
          S:  { min: null, max: 0.025 },
          Cr: { min: 0.80, max: 1.10 },
          Mo: { min: 0.15, max: 0.35 },
          Ni: { min: null, max: 0.50 },
          V:  { min: null, max: 0.08 }
        }
      },
      mechanical_properties: {
        per_astm_a370: true,
        yield_strength:     { min: { psi: 75000, mpa: 517 }, max: null },
        tensile_strength:   { min: { psi: 95000, mpa: 655 }, max: null },
        elongation:         { min_percent: 17,   max_percent: null },
        reduction_of_area:  { min_percent: 35,   max_percent: null },
        hardness_hbw:       { min: 197,           max: 237 }
      },
      hardness_test_required: {
        rockwell_performed: false,
        brinell_performed:  false,
        requirement:       "at_least_one"
      },
      heat_treatment: {
        selection_required: true,
        options: ["continuous","batch"],
        continuous: {
          requirements: {
            bar_temp_exit_hardening_furnace:  { min_f: 1575, min_c: 857 },
            time_in_hardening_furnace:        { min_minutes: 5 },
            bar_temp_exit_tempering_furnace:  { min_f: 1200, min_c: 635 },
            time_in_tempering_furnace:        { min_minutes: 5 },
            quench_water_temp_start:          { max_f: 100,  max_c: 38 }
          }
        },
        batch: {
          requirements: {
            normalizing: {
              required: false,
              temperature_range: { min_f: 1600, max_f: 1700, min_c: 871, max_c: 926 },
              time_per_inch_thickness_min_minutes: 30
            },
            austenitizing: {
              temperature_range: { min_f: 1525, max_f: 1650, min_c: 829, max_c: 898 },
              time_per_inch_thickness_min_minutes: 30
            },
            quenching: {
              water:      { temp_max_before_quenching_f: 100, temp_max_during_cycle_f: 120,
                            temp_max_before_quenching_c: 38,  temp_max_during_cycle_c: 49 },
              polymer_oil:{ temp_min_before_quenching_f: 100, temp_min_before_quenching_c: 38 }
            },
            tempering: {
              temperature_min_f: 1200, temperature_min_c: 635,
              time_per_inch_thickness_min_minutes: 45,
              total_min_time_minutes: 60
            }
          }
        }
      },
      impact_testing: {
        per_astm_a370: true,
        tables: {
          api_6a: [
            { class: "K", temperature_f: -75, temperature_c: -60, min_avg_impact_ftlbs: 15, min_avg_impact_joules: 20, alt_longitudinal_avg_ftlbs: 20, alt_longitudinal_avg_joules: 27 },
            { class: "L", temperature_f: -50, temperature_c: -46, min_avg_impact_ftlbs: 15, min_avg_impact_joules: 20, alt_longitudinal_avg_ftlbs: 20, alt_longitudinal_avg_joules: 27 },
            { class: "N", temperature_f: -50, temperature_c: -46, min_avg_impact_ftlbs: 15, min_avg_impact_joules: 20, alt_longitudinal_avg_ftlbs: 20, alt_longitudinal_avg_joules: 27 },
            { class: "P", temperature_f: -20, temperature_c: -29, min_avg_impact_ftlbs: 15, min_avg_impact_joules: 20, alt_longitudinal_avg_ftlbs: 20, alt_longitudinal_avg_joules: 27 },
            { class: "S", temperature_f:   0, temperature_c: -18, min_avg_impact_ftlbs: null, min_avg_impact_joules: 20, alt_longitudinal_avg_ftlbs: null, alt_longitudinal_avg_joules: 27 },
            { class: "T", temperature_f:   0, temperature_c: -18, min_avg_impact_ftlbs: null, min_avg_impact_joules: 20, alt_longitudinal_avg_ftlbs: null, alt_longitudinal_avg_joules: 27 },
            { class: "U", temperature_f:   0, temperature_c: -18, min_avg_impact_ftlbs: null, min_avg_impact_joules: 20, alt_longitudinal_avg_ftlbs: null, alt_longitudinal_avg_joules: 27 },
            { class: "V", temperature_f:   0, temperature_c: -18, min_avg_impact_ftlbs: null, min_avg_impact_joules: 20, alt_longitudinal_avg_ftlbs: null, alt_longitudinal_avg_joules: 27 }
          ],
          api_16a: [
            { temperature_classification: "T-75/250", temperature_f: -75, temperature_c: -59, min_avg_impact_joules: 20, min_avg_impact_ftlbs: 15, min_single_impact_joules: 14, min_single_impact_ftlbs: 10 },
            { temperature_classification: "T-75/350", temperature_f: -75, temperature_c: -59, min_avg_impact_joules: 20, min_avg_impact_ftlbs: 15, min_single_impact_joules: 14, min_single_impact_ftlbs: 10 },
            { temperature_classification: "T-20/250", temperature_f: -20, temperature_c: -29, min_avg_impact_joules: 20, min_avg_impact_ftlbs: 15, min_single_impact_joules: 14, min_single_impact_ftlbs: 10 },
            { temperature_classification: "T-20/350", temperature_f: -20, temperature_c: -29, min_avg_impact_joules: 20, min_avg_impact_ftlbs: 15, min_single_impact_joules: 14, min_single_impact_ftlbs: 10 },
            { temperature_classification: "T-0/250",  temperature_f:   0, temperature_c: -18, min_avg_impact_joules: 20, min_avg_impact_ftlbs: 15, min_single_impact_joules: 14, min_single_impact_ftlbs: 10 },
            { temperature_classification: "T-0/350",  temperature_f:   0, temperature_c: -18, min_avg_impact_joules: 20, min_avg_impact_ftlbs: 15, min_single_impact_joules: 14, min_single_impact_ftlbs: 10 }
          ]
        }
      },
      reduction_ratio: {
        min: 3,
        unit: "to_1"
      }
    }
  },



    "MS-B19": {
        material: "MS-B19",
        form: {
            sections: [
            { key: "chemical_composition",   title: "Chemical Composition",   order: 1 },
            { key: "mechanical_properties",  title: "Mechanical Properties",  order: 2 },
            { key: "hardness_test_required", title: "Hardness Test",           order: 3 },
            { key: "heat_treatment",         title: "Heat Treatment",          order: 4 },
            { key: "impact_testing",         title: "Impact Testing",          order: 5 },
            { key: "reduction_ratio",        title: "Reduction Ratio",         order: 6 }
            ]
        },
        requirements: {
            chemical_composition: {
            per_astm_a751: true,
            elements: {
                C:  { min: null, max: 0.070 },
                Mn: { min: null, max: 1.00 },
                Si: { min: null, max: 1.00 },
                P:  { min: null, max: 0.040 },
                S:  { min: null, max: 0.030 },
                Cr: { min: 15.00, max: 17.50 },
                Nb: { min: 0.15,   max: 0.45 },
                Ni: { min: 3.00,   max: 5.00 },
                Cu: { min: 3.00,   max: 5.00 }
            }
            },                                              
            mechanical_properties: {
            per_astm_a370: true,
            yield_strength:   { min: { psi: 105000, mpa: 724 }, max: null },
            tensile_strength: { min: { psi: 125000, mpa: 862 }, max: { psi: 160000, mpa: 1103 } },
            yield_to_tensile_ratio_max: 0.90,
            elongation:       { min_percent: 16, max_percent: null },
            reduction_of_area:{ min_percent: 50, max_percent: null },
            hardness_hbw:     { min: 248, max: 311 }
            },                                              
            hardness_test_required: {
            rockwell_performed: false,
            brinell_performed:  false,
            requirement:       "at_least_one"
            },
            heat_treatment: {
            selection_required: false,
            type: "batch",
            batch: {
                requirements: {
                solution_anneal: {
                    temperature_range: { min_f: 1875, max_f: 1925, min_c: 1024, max_c: 1052 },
                    time_per_inch_thickness_min_minutes: 30,
                    cooling: "90°F (32°C) or below using air or liquid quench"
                },
                precipitation_hardening_1: {
                    temperature_range: { min_f: 1125, max_f: 1175, min_c: 607, max_c: 635 },
                    time_per_inch_thickness_min_minutes: 30,
                    total_min_time_minutes: 240,
                    cooling: "90°F (32°C) or below using air or liquid quench"
                }
                }
            }
            },                                              
            impact_testing: {
            per_astm_a370: true,
            tables: {
                api_6a: [
                { class: "K", temperature_f: -75, temperature_c: -60, min_avg_impact_ftlbs: 15, min_avg_impact_joules: 20 },
                { class: "L", temperature_f: -50, temperature_c: -46, min_avg_impact_ftlbs: 15, min_avg_impact_joules: 20 },
                { class: "N", temperature_f: -50, temperature_c: -46, min_avg_impact_ftlbs: 15, min_avg_impact_joules: 20 },
                { class: "P", temperature_f: -20, temperature_c: -29, min_avg_impact_ftlbs: 15, min_avg_impact_joules: 20 },
                { class: "S", temperature_f:   0, temperature_c: -18, min_avg_impact_ftlbs: null, min_avg_impact_joules: 20 },
                { class: "T", temperature_f:   0, temperature_c: -18, min_avg_impact_ftlbs: null, min_avg_impact_joules: 20 },
                { class: "U", temperature_f:   0, temperature_c: -18, min_avg_impact_ftlbs: null, min_avg_impact_joules: 20 },
                { class: "V", temperature_f:   0, temperature_c: -18, min_avg_impact_ftlbs: null, min_avg_impact_joules: 20 }
                ],
                api_16a: [
                { temperature_classification: "T–0",  temperature_f:   0, temperature_c: -18, min_avg_impact_ftlbs: 15, min_avg_impact_joules: 20 },
                { temperature_classification: "T–20", temperature_f: -20, temperature_c: -29, min_avg_impact_ftlbs: 15, min_avg_impact_joules: 20 },
                { temperature_classification: "T–75", temperature_f: -75, temperature_c: -60, min_avg_impact_ftlbs: 15, min_avg_impact_joules: 20 }
                ]
            }
            },                                            
            reduction_ratio: {
            min: 3,
            unit: "to_1"
            }                                              
        }
    },

    "MS-B21": {
        material: "MS-B21",
        form: {
            sections: [
            { key: "chemical_composition",   title: "Chemical Composition",   order: 1 },
            { key: "mechanical_properties",  title: "Mechanical Properties",  order: 2 },
            { key: "hardness_test_required", title: "Hardness Test",           order: 3 },
            { key: "heat_treatment",         title: "Heat Treatment",          order: 4 },
            { key: "impact_testing",         title: "Impact Testing",          order: 5 },
            { key: "reduction_ratio",        title: "Reduction Ratio",         order: 6 }
            ]
        },
        requirements: {
            chemical_composition: {
            per_astm_a751: true,
            elements: {
                C:  { min: 0.06,  max: 0.15 },
                Mn: { min: null,  max: 1.00 },
                Si: { min: null,  max: 1.00 },
                P:  { min: null,  max: 0.025 },
                S:  { min: null,  max: 0.025 },
                Cr: { min: 11.50, max: 13.50 },
                Mo: { min: null,  max: 0.60 },
                Ni: { min: null,  max: 0.50 },
                Fe: { min: null,  max: null, note: "Balance" }
            }
            },                                                

            mechanical_properties: {
            per_astm_a370: true,
            test_temperature_range: {
                min_c: 4, max_c: 50,
                min_f: 40, max_f: 120
            },
            yield_strength:             { min: { psi: 75000, mpa: 517 }, max: null },
            tensile_strength:           { min: { psi: 95000, mpa: 655 }, max: null },
            yield_to_tensile_ratio_max: 0.90,
            elongation:                 { min_percent: 17, max_percent: null },
            reduction_of_area:          { min_percent: 35, max_percent: null },
            hardness_hbw:               { min: 197, max: 237 }
            },                                            

            hardness_test_required: {
            rockwell_performed: false,
            brinell_performed:  false,
            requirement:        "at_least_one",
            per_standard:      ["ASTM E10", "ASTM E18", "ASTM E110"]
            },                                              

            heat_treatment: {
            selection_required: false,
            type: "batch",
            batch: {
                requirements: {
                austenitizing: {
                    temperature_range: { min_f: 1750, max_f: 1850, min_c: 956, max_c: 1010 },
                    time_per_inch_thickness_min_minutes: 30
                },
                quenching: {
                    optional: true,
                    water:       { temp_max_before_quenching_f: 100, temp_max_before_quenching_c: 38 },
                    polymer_oil: { temp_min_before_quenching_f: 100, temp_min_before_quenching_c: 38 }
                },
                tempering_1: {
                    temperature_min_f: 1150, temperature_min_c: 621,
                    time_per_inch_thickness_min_minutes: 45,
                    total_min_time_minutes: 60
                },
                tempering_2: {
                    temperature_min_f: 1150, temperature_min_c: 621,
                    must_be_lower_than_first_tempering: true,
                    time_per_inch_thickness_min_minutes: 45,
                    total_min_time_minutes: 60
                }
                }
            }
            },                                               

            impact_testing: {
            per_astm_a370: true,
            tables: {
                api_6a: [
                { class: "K", temperature_f: -75, temperature_c: -60, min_avg_impact_ftlbs: 15, min_avg_impact_joules: 20 },
                { class: "L", temperature_f: -50, temperature_c: -46, min_avg_impact_ftlbs: 15, min_avg_impact_joules: 20 },
                { class: "N", temperature_f: -50, temperature_c: -46, min_avg_impact_ftlbs: 15, min_avg_impact_joules: 20 },
                { class: "P", temperature_f: -20, temperature_c: -29, min_avg_impact_ftlbs: 15, min_avg_impact_joules: 20 },
                { class: "S", temperature_f:   0, temperature_c: -18, min_avg_impact_ftlbs: null, min_avg_impact_joules: 20 },
                { class: "T", temperature_f:   0, temperature_c: -18, min_avg_impact_ftlbs: null, min_avg_impact_joules: 20 },
                { class: "U", temperature_f:   0, temperature_c: -18, min_avg_impact_ftlbs: null, min_avg_impact_joules: 20 },
                { class: "V", temperature_f:   0, temperature_c: -18, min_avg_impact_ftlbs: null, min_avg_impact_joules: 20 }
                ],
                api_16a: [
                { temperature_classification: "T–0",  temperature_f:   0, temperature_c: -18, min_avg_impact_ftlbs: 15, min_avg_impact_joules: 20 },
                { temperature_classification: "T–20", temperature_f: -20, temperature_c: -29, min_avg_impact_ftlbs: 15, min_avg_impact_joules: 20 },
                { temperature_classification: "T–75", temperature_f: -75, temperature_c: -60, min_avg_impact_ftlbs: 15, min_avg_impact_joules: 20 }
                ]
            }
            },                                       

            reduction_ratio: {
            min: 3,
            unit: "to_1"
            }                                               
        }
    },




"MS-B41": {
  material: "MS-B41",
  form: {
    sections: [
      { key: "chemical_composition",   title: "Chemical Composition",   order: 1 },
      { key: "mechanical_properties",  title: "Mechanical Properties",  order: 2 },
      { key: "hardness_test_required", title: "Hardness Test",           order: 3 },
      { key: "heat_treatment",         title: "Heat Treatment",          order: 4 },
      { key: "impact_testing",         title: "Impact Testing",          order: 5 },
      { key: "reduction_ratio",        title: "Reduction Ratio",         order: 6 }
    ]
  },
  requirements: {
    chemical_composition: {
      per_astm_a751: true,
      elements: {
        C:  { min: 0.38, max: 0.43 },
        Mn: { min: 0.75, max: 1.00 },
        Si: { min: 0.15, max: 0.35 },
        P:  { min: null, max: 0.025 },
        S:  { min: null, max: 0.025 },
        Cr: { min: 0.80, max: 1.10 },
        Mo: { min: 0.15, max: 0.25 },
        Ni: { min: null, max: 0.50 }
      }
    }, // :contentReference[oaicite:0]{index=0}

    mechanical_properties: {
      per_astm_a370: true,
      yield_strength:   { min: { psi: 110000, mpa: 758 }, max: null },
      tensile_strength: { min: { psi: 125000, mpa: 862 }, max: { psi: 160000, mpa: 1103 } },
      yield_to_tensile_ratio_max: 0.90,
      elongation:       { min_percent: 15, max_percent: null },
      reduction_of_area:{ min_percent: 40, max_percent: null },
      hardness_hbw:     { min: 285, max: 336 }
    }, // :contentReference[oaicite:1]{index=1}

    hardness_test_required: {
      rockwell_performed: false,
      brinell_performed:  false,
      requirement:        "at_least_one",
      per_standard:       ["ASTM E10", "ASTM E18", "ASTM E110"]
    }, // :contentReference[oaicite:2]{index=2}

    heat_treatment: {
      selection_required: true,
      options: ["continuous","batch"], // :contentReference[oaicite:3]{index=3}
      continuous: {
        requirements: {
          bar_temp_exit_hardening_furnace: { min_f: 1525, min_c: 829 },
          time_in_hardening_furnace:       { min_minutes: 5 },
          bar_temp_exit_tempering_furnace: { min_f: 950,  min_c: 510 },
          time_in_tempering_furnace:       { min_minutes: 5 },
          quench_water_temp_start:         { max_f: 100,  max_c: 38 }
        }
      }, // :contentReference[oaicite:4]{index=4} :contentReference[oaicite:5]{index=5}
      batch: {
        requirements: {
          normalizing: {
            required: false,
            temperature_range: { min_f: 1575, max_f: 1700, min_c: 857, max_c: 926 },
            time_per_inch_thickness_min_minutes: 30
          },
          austenitizing: {
            temperature_range: { min_f: 1525, max_f: 1625, min_c: 829, max_c: 885 },
            time_per_inch_thickness_min_minutes: 30
          },
          quenching: {
            water:      { temp_max_before_quenching_f: 100, temp_max_during_cycle_f: 120, temp_max_before_quenching_c: 38, temp_max_during_cycle_c: 49 },
            polymer_oil:{ temp_min_before_quenching_f: 100, temp_min_before_quenching_c: 38 }
          },
          tempering: {
            temperature_range: { min_f: 900, max_f: 1250, min_c: 482, max_c: 677 },
            time_per_inch_thickness_min_minutes: 45,
            total_min_time_minutes: 60
          }
        }
      } // :contentReference[oaicite:6]{index=6} :contentReference[oaicite:7]{index=7}
    },

    impact_testing: {
      per_astm_a370: true,
      tables: {
        api_6a: [
          { class: "K", temperature_f: -75, temperature_c: -60, min_avg_impact_ftlbs: 15, min_avg_impact_joules: 20, longitudinal_ftlbs: 20, longitudinal_joules: 27 },
          { class: "L", temperature_f: -50, temperature_c: -46, min_avg_impact_ftlbs: 15, min_avg_impact_joules: 20, longitudinal_ftlbs: 20, longitudinal_joules: 27 },
          { class: "N", temperature_f: -50, temperature_c: -46, min_avg_impact_ftlbs: 15, min_avg_impact_joules: 20, longitudinal_ftlbs: 20, longitudinal_joules: 27 },
          { class: "P", temperature_f: -20, temperature_c: -29, min_avg_impact_ftlbs: 15, min_avg_impact_joules: 20, longitudinal_ftlbs: 20, longitudinal_joules: 27 },
          { class: "S", temperature_f:   0, temperature_c: -18, min_avg_impact_ftlbs: null, min_avg_impact_joules: 20, longitudinal_ftlbs: 20, longitudinal_joules: 27 },
          { class: "T", temperature_f:   0, temperature_c: -18, min_avg_impact_ftlbs: null, min_avg_impact_joules: 20, longitudinal_ftlbs: 20, longitudinal_joules: 27 },
          { class: "U", temperature_f:   0, temperature_c: -18, min_avg_impact_ftlbs: null, min_avg_impact_joules: 20, longitudinal_ftlbs: 20, longitudinal_joules: 27 },
          { class: "V", temperature_f:   0, temperature_c: -18, min_avg_impact_ftlbs: null, min_avg_impact_joules: 20, longitudinal_ftlbs: 20, longitudinal_joules: 27 }
        ], // :contentReference[oaicite:8]{index=8}
        api_16a: [
          { temperature_rating: "T-75/250", temperature_f: -75, temperature_c: -59, min_avg_impact_joules: 20, min_one_specimen_joules: 14 },
          { temperature_rating: "T-75/350", temperature_f: -75, temperature_c: -59, min_avg_impact_joules: 20, min_one_specimen_joules: 14 },
          { temperature_rating: "T-20/250", temperature_f: -20, temperature_c: -29, min_avg_impact_joules: 20, min_one_specimen_joules: 14 },
          { temperature_rating: "T-20/350", temperature_f: -20, temperature_c: -29, min_avg_impact_joules: 20, min_one_specimen_joules: 14 },
          { temperature_rating: "T-0/250",  temperature_f:   0, temperature_c: -18, min_avg_impact_joules: 20, min_one_specimen_joules: 14 },
          { temperature_rating: "T-0/350",  temperature_f:   0, temperature_c: -18, min_avg_impact_joules: 20, min_one_specimen_joules: 14 }
        ] // :contentReference[oaicite:9]{index=9}
      }
    },

    reduction_ratio: {
      min: 3,
      unit: "to_1"
    } // :contentReference[oaicite:10]{index=10}
  }
}


};


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
