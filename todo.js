// all global declarations

let data = JSON.parse(localStorage.getItem("data"));

// all selections

let title_input = document.querySelector("#title");
let detail_input = document.querySelector("#details");
let checkimp = document.querySelector("#imp");
let addtask_btn = document.querySelector("#add-task-btn");

let task_container = document.querySelector(".inner-todo-right");

// all functions

function resetValue() {
  title_input.value = ``;
  detail_input.value = ``;
  checkimp.checked = false;
}

function render_tasks() {
  let html = ``;

  data.forEach((ech, id) => {
    html += `<div class="echtask" id="${id}">
                    <div class="task-cntnt">
                        <h1>${ech.titile}</h1>
                        <button class="mark-imp ${ech.isimp == true ? `visible` : `hidden`}">imp</button>
                     </div>

                    <button class="mark-comp" id="${id}">mark as completed</button>
                </div>`;
  });

  task_container.innerHTML = html;
  localStorage.setItem("data", JSON.stringify(data));
}

render_tasks();

// all event listners

addtask_btn.addEventListener("click", (e) => {
  let obj = {
    titile: title_input.value,
    details: detail_input.value,
    isimp: checkimp.checked,
  };

  if (title_input.value == `` || detail_input.value == ``) {
    console.warn("data missing");
    title_input.value = ``;
    detail_input.value = ``;
  } else {
    data.push(obj);
    render_tasks();

    resetValue();
  }
});

task_container.addEventListener("click", (e) => {
  if (e.target.className == "mark-comp") {
    let id = e.target.id;

    data = data.filter((ech, idx) => {
      return idx != id;
    });

    e.target.style.backgroundColor=`red`;

    setTimeout(() => {
      render_tasks();
    }, 1500);
  }
});
