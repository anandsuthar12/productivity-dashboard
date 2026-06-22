let motivation_parent = document.querySelector(".inner-motivation");
let moti_child = motivation_parent.children;

// functions

function establish(data) {
  // console.log(data[0])

  moti_child[0].innerHTML = data[0].a;
  moti_child[1].innerHTML = data[0].q;
}

async function apifetch() {
  try {
    // Using a CORS proxy to bypass the restriction
    let proxy = "https://corsproxy.io/?";
    let url = `https://zenquotes.io/api/random?${Date.now()}`;
    let raw = await fetch(proxy + encodeURIComponent(url));

    if (!raw.ok) throw new Error("Network response was not ok");

    let data = await raw.json();

    establish(data);
  } catch (error) {
    console.error("Fetch error:", error);
  }
}

apifetch();

// event listner

motivation_parent.addEventListener("click", (e) => {
  if (e.target.tagName == "BUTTON") {
    apifetch();
  }
});
