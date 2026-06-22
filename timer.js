let time = document.querySelector("#crr_time");
let btn_box = document.querySelector(".inner-timer-btn-box");

let whichtype = document.querySelector(".timer > h4");

let isworktime = true;
let btns = btn_box.children;
let totalTime = 25 * 60;
let start;

function updateDisplay() {
  let min = Math.floor(totalTime / 60);
  let sec = totalTime % 60;
  time.innerHTML = `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
}

function setSessionDuration() {
  totalTime = isworktime ? 25 * 60 : 5 * 60;

  totalTime == 25 * 60
    ? (() => {
        whichtype.style.backgroundColor = `green`,
        whichtype.style.innerHTML = `work time`
      })()
    : (() => {
        whichtype.style.backgroundColor = `skyblue`,
        whichtype.style.innerHTML = `take a break`
      })()

  updateDisplay();
}

function startfxn() {
  start = setInterval(() => {
    totalTime--;
    updateDisplay();

    if (totalTime <= 0) {
      clearInterval(start);
      btns[0].style.pointerEvents = "all";
      isworktime = !isworktime;
      setSessionDuration();
    }
  }, 1000);
}

btn_box.addEventListener("click", (e) => {
  if (e.target.id == "start") {
    e.target.style.pointerEvents = "none";
    startfxn();
  }

  if (e.target.id == "pause") {
    clearInterval(start);
    btns[0].style.pointerEvents = "all";
  }

  if (e.target.id == "reset") {
    clearInterval(start);
    btns[0].style.pointerEvents = "all";
    setSessionDuration();
  }
});
