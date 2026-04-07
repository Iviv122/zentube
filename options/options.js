const form = document.getElementById("form");
const properites = [
  "videos_main",
  "comments_section",
  "right_panel",
  "playlist",
  "left_panel",
  "logo",
  "account_info",
  "video_author",
  "like_dislike",
  "merch",
  "clip_save",
  "tickets"
]

function onError(error) {
  console.log(`Error: ${error}`);
}

function load_default() {
  console.log("loading defaults")
  let data = {
    intro_label: false,
  }
  properites.forEach(p => {
    data[p] = "no";
  });
  browser.storage.sync.get("videos_main").then(r => {
    if (r.videos_main === undefined) {
      browser.storage.sync.set(data);
    }

  })

}

function saveOptions(e) {
  e.preventDefault();
  let data = {
    intro_label: false,
  }

  properites.forEach(p => {
    data[p] = document.querySelector("#" + p).checked ? "yes" : "no";
  });

  browser.storage.sync.set(data)
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