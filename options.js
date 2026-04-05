function saveOptions(e) {
  e.preventDefault();
  browser.storage.sync.set({
    intro_label: document.querySelector("#intro_label").checked ? "yes" : "no"
  });
}

function restoreOptions() {
  function setCurrentChoice(result) {
    if (result.intro_label) {
      document.querySelector("#intro_label").checked = result.intro_label === "yes" ? true : false;
    } else {
      document.querySelector("#intro_label").checked = result.intro_label = "yes"
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