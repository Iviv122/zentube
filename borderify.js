function remove(list) {
    list.forEach(e => {
        if (e) e.remove()
    })
}

function execute_mainpage() {
    let primary = document.getElementById("primary");
    let remove_elements = [
        document.getElementById("guide-button"),
        document.getElementById("chips-wrapper"),
        document.getElementById("voice-search-button"),
    ]
    if (primary) {
        while (primary.firstChild) {
            primary.removeChild(primary.firstChild);
        }
    }

    remove(remove_elements);
}

function execute_shorts() {


    let remove_elements = [
        document.getElementById("reel-overlay-container"),
        document.getElementById("shorts-container"),
        document.getElementById("shorts-inner-container"),
        ...Array.from(document.getElementsByTagName("ytd-shorts")),
        ...Array.from(document.getElementsByTagName("ytd-reel-video-renderer")),
    ]
    remove(remove_elements)

}

let events_main = [
    "yt-service-request-completed",
    "yt-service-request-sent",
    "yt-page-data-updated",
    "iron-overlay-opened",
    "yt-page-type-changed",
]
events_main.forEach(e => {
    document.addEventListener(e, execute_mainpage);
})

let events_shorts = [
    "yt-shorts-reset",
    "yt-page-data-updated",
    "DOMContentLoaded",
    "load",
    "yt-service-request-completed",
    "yt-service-request-sent",
    "yt-page-data-updated",
    "iron-overlay-opened",
    "yt-page-type-changed",
]
events_shorts.forEach(e => {
    document.addEventListener(e, execute_shorts)
})