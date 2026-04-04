function remove(list) {
    list.forEach(e => {
        if (e) e.remove()
    })
}

function execute_mainpage() {
    let primary = document.getElementById("primary");
    let remove_elements = [
        document.getElementById("chips-wrapper"),
    ]
    if (primary) {
        while (primary.firstChild) {
            primary.removeChild(primary.firstChild);
        }
    }

    remove(remove_elements);
}

function execute_always() {


    let remove_elements = [
        document.getElementById("reel-overlay-container"),
        document.getElementById("shorts-container"),
        document.getElementById("shorts-inner-container"),
        document.getElementById("voice-search-button"),
        ...Array.from(document.getElementsByTagName("ytd-shorts")),
        ...Array.from(document.getElementsByTagName("ytd-reel-video-renderer")),
        ...Array.from(document.getElementsByTagName("a")).filter(e => e.title === "Shorts" || e.href === "/shorts/")
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

let events_always = [
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
events_always.forEach(e => {
    document.addEventListener(e, execute_always)
})