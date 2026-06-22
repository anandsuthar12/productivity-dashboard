// global declarations

let mouseX = 0,
  mouseY = 0;
let currX = 0,
  currY = 0;

let dropdown_info = {
  theme: "dark",
  phase: "hidden",
};

// all selections

let allcross = document.querySelectorAll(`.cross`);

let allScreens = document.querySelectorAll(".screen");

let main = document.querySelector("main");

let elems = document.querySelectorAll(".elem");

let follower = document.querySelector(".follower");

let themebtn = document.querySelector("#changeThemeBtn");

let themeDropDown = document.querySelector(".dropDown");

let date = document.querySelector("#date");

let day_time = document.querySelector("#day-time");

let city = document.querySelector("#city");

let info_right = Array.from(document.querySelectorAll(".weather-info"))

// all functions

function setTheme(dets) {
  let allScreens = document.querySelectorAll(".screen");
  main.style.backgroundColor = dets;

  allScreens.forEach((ech) => {
    ech.style.backgroundColor = dets;
  });
}

function keyReturn() {
  let key = `f573181c0d1f8f4c0b72596b036e44b1`;

  return key;
}

setTheme("var(--primary)");

function weatherSetup(dets){
  info_right[0].innerHTML=`${dets.main.temp} &deg;C`;
  info_right[1].innerHTML=`${dets.weather[0].description}`
  info_right[2].innerHTML=`pressure : ${dets.main.pressure} (Pa)`
  info_right[3].innerHTML=`humidity : ${dets.main.humidity}%`
  info_right[4].innerHTML=`wind : ${dets.wind.speed}km/hr`
}

async function letfetch(lat, lon) {
  let rawdata = await fetch(
    `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`,
  );

  let data = await rawdata.json();

  let whichCity = `${data.address.city}`;

  city.innerHTML = whichCity;

  let rawWeather = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${whichCity}&appid=${keyReturn()}&units=metric`,
  );

  let crrWeather = await rawWeather.json();

  weatherSetup(crrWeather);
}

navigator.geolocation.getCurrentPosition((position) => {
  let { latitude, longitude } = position.coords;

  letfetch(latitude, longitude);
});

function day_time_setup() {
  const now = new Date();

  day_time.innerHTML = now.toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  setInterval(() => {
    let time = new Date();
    let hr=`${time.getHours()}`.padStart(2,0);
    let mn=`${time.getMinutes()}`.padStart(2,0);
    let sc=`${time.getSeconds()}`.padStart(2,0);
    date.innerHTML=`${hr}:${mn}:${sc}`;
  }, 1000);
}

day_time_setup();

function letcheck(text, arr, interval) {
  if (text === arr) {
    clearInterval(interval);
  }
}

function matrix_effect(target, slap = 10) {
  let charactar = `abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ`;
  let counter = 0;
  let text = target.innerHTML;

  let interval = setInterval(() => {
    let arr = text.split("").map((ech, idx) => {
      if (counter >= idx) {
        return ech;
      } else {
        return charactar.split("")[
          Math.floor(Math.random() * charactar.length)
        ];
      }
    });

    counter += 0.95;
    arr = arr.join("");

    target.innerHTML = arr;
    letcheck(text, arr, interval);
  }, slap);
}

function positon_follower() {
  currX += (mouseX - currX) * 0.03;
  currY += (mouseY - currY) * 0.03;

  follower.style.left = `${currX}px`;
  follower.style.top = `${currY}px`;

  requestAnimationFrame(positon_follower);
}

positon_follower();

// all event listners

allcross.forEach((ech) => {
  ech.addEventListener("click", (e) => {
    allScreens[ech.id].style.display = "none";
    follower.style.display = `block`;
  });
});

elems.forEach((ech) => {
  ech.addEventListener("mouseenter", (e) => {
    ech.style.color = `var(--secondary)`;
    ech.style.textShadow = `0 0 10px var(--btn)`;
    // matrix_effect(ech);
  });

  ech.addEventListener("mouseleave", (e) => {
    ech.style.color = `var(--text)`;
    ech.style.textShadow = `0 0 0 transparent`;
  });

  ech.addEventListener("click", (e) => {
    allScreens[ech.dataset.id].style.display = `block`;
    follower.style.display = `none`;
  });
});

main.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

themebtn.addEventListener("click", (e) => {
  if (dropdown_info.phase == "hidden") {
    dropdown_info.phase = "visible";
    themeDropDown.style.transform = `translate(-0%,0px)`;
    themeDropDown.style.visibility = `visible`;
  } else {
    dropdown_info.phase = "hidden";
    themeDropDown.style.transform = `translate(120%,0px)`;
    themeDropDown.style.visibility = `hidden`;
  }
});

themeDropDown.addEventListener("click", (e) => {
  if (e.target.innerHTML == `dark`) {
    setTheme("var(--primary)");
  } else {
    setTheme("var(--text)");
  }
});
