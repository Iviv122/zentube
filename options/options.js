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
    "tickets",
    "voice_search"
]
const checkboxes = Array.from(document.getElementsByTagName("input"))

const enable_all = document.getElementById("enableall")
const disable_all = document.getElementById("disableall")

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
function set_everything(state_bool) {
    properites.forEach(p => {
        document.querySelector("#" + p).checked = state_bool;
    });
}

function turn_on_everything() {
    set_everything(true)
    saveOptions("placeholder");
}

function turn_off_everything() {
    set_everything(false)
    saveOptions("placeholder");
}

function saveOptions(e) {
    let data = {
        intro_label: false,
    }

    properites.forEach(p => {
        data[p] = document.querySelector("#" + p).checked ? "yes" : "no";
    });

    browser.storage.sync.set(data)
    browser.tabs.query({ active: true, currentWindow: true }).then(tabs => {
        browser.tabs.sendMessage(tabs[0].id, { type: "updateSettings" });
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

enable_all.addEventListener("click", turn_on_everything);
disable_all.addEventListener("click", turn_off_everything);
document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
checkboxes.forEach(checkbox => checkbox.addEventListener("click", saveOptions))