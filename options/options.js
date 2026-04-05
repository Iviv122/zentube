function saveOptions(e) {
  e.preventDefault();
  browser.storage.sync.set({
    intro_label: false,
    videos_main: document.querySelector("#videos_main").checked ? "yes" : "no"
  });
}

function restoreOptions() {
  function setCurrentChoice(result) {
    if (result.videos_main) {
      document.querySelector("#videos_main").checked = result.videos_main === "yes" ? true : false;
    } else {
      document.querySelector("#videos_main").checked = result.videos_main = false;
    }
  }

  function onError(error) {
    console.log(`Error: ${error}`);
  }

  browser.storage.sync.get("intro_label")
    .then(setCurrentChoice, onError);
}



document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);