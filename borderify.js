

function execute_mainpage() {
    let remove_elements = [
        document.getElementById("guide-button"),
        document.getElementById("chips-wrapper"),
        document.getElementById("primary"),
        document.getElementById("voice-search-button"),
        Array.from(document.getElementsByTagName("ytd-mini-guide-entry-renderer"))
            .find(e => e.getAttribute("href") === "/shorts/")?.parentNode
    ].filter(Boolean); // removes null/undefined

    remove_elements.forEach(e => {
        if (e) e.remove();
    });
}

function execute_shorts() {
    let remove_elements = [

        document.getElementById("shorts-container")

    ]
}

let events_main = [
    "yt-service-request-completed",
    "yt-service-request-sent",
    "yt-page-data-updated",
    "iron-overlay-opened",
]
events_main.forEach(e => {
    document.addEventListener(e, execute_mainpage, { once: true });
})

/*
// I don't care just die pls already
document.addeventlistener("yt-service-request-completed", execute_shorts);
document.addeventlistener("yt-service-request-sent", execute_shorts);
document.addeventlistener("yt-page-data-updated", execute_mainpage, { once: true });
document.addeventlistener("iron-overlay-opened", execute_mainpage, { once: true });

*/