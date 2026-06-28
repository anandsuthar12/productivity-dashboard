// global declarations
let values = JSON.parse(localStorage.getItem("input-value")) || [];

// selections

let planner_box = document.querySelector(".inner-planner");

// functions

function setup_planner() {
  let hours = Array.from({ length: 18 }, function (elem, idx) {
    return `${6 + idx}:00 - ${7 + idx}:00`;
  });

  let sum = ``;
  hours.forEach((ech, id) => {
    sum += `  <div class="ech-planner" id="${id}">
                    <h3>${ech}</h3>
                    <input type="text" placeholder="..." value="${values[id]}" id="${id}">
                </div>`;
  });

  planner_box.innerHTML = sum;
}

setup_planner();

let all_input = document.querySelectorAll(".ech-planner>input");
all_input = Array.from(all_input);

function getvalue() {
  values = all_input.map((ech) => ech.value);
  localStorage.setItem("input-value", JSON.stringify(values));
}

getvalue();
// eventlistners

planner_box.addEventListener("input", (e) => {
  if (e.target.tagName == "INPUT") {
    getvalue();
  }
});
