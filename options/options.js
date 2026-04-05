const properites = [
  "videos_main",
]

function onError(error) {
  console.log(`Error: ${error}`);
}
function load_default() {
  console.log("loading defaults")
  browser.storage.sync.get("videos_main").then(r => {
    if (r.videos_main === undefined) {
      browser.storage.sync.set({
        intro_label: false,
        videos_main: "no"
      });
      console.log("saved")
    }

  })

}

function saveOptions(e) {
  e.preventDefault();
  browser.storage.sync.set({
    intro_label: false,
    videos_main: document.querySelector("#videos_main").checked ? "yes" : "no"
  });
}

function restoreOptions() {

  load_default();

  properites.forEach(p => {
    browser.storage.sync.get(p)
      .then(r => {
        document.querySelector("#" + p).checked = r[p] === "yes";
      }, onError);
  });

}


document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);