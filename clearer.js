function remove_items_list(list) {
    list.forEach(e => {
        if (e) e.remove()
    })
}

function onError(error) {
    console.log(`Error: ${error}`);
}

function remove_all_but_header(e) {
    while (e.firstChild) {
        if (e.firstChild.id === "header") {
            break;
        }
        e.removeChild(e.firstChild);
    }
    while (e.firstChild) {
        if (e.lastChild.id === "header") {
            break;
        }
        e.removeChild(e.lastChild)
    }
}

async function remove_during_video() {
    let remove_elements = [];

    const rightPanelRes = await browser.storage.sync.get("right_panel");
    const commentsRes = await browser.storage.sync.get("comments_section");
    const playlistRes = await browser.storage.sync.get("playlist");

    if (rightPanelRes.right_panel === undefined || rightPanelRes.right_panel === "no") {
        remove_elements.push(document.getElementById("related")); // remove videos without playlist
    }

    if (commentsRes.comments_section === undefined || commentsRes.comments_section === "no") {
        remove_elements.push(
            ...Array.from(document.getElementsByTagName("ytd-comments"))
        );
    }
    if (playlistRes.playlist === undefined || playlistRes.playlist === "no") {
        remove_elements.push(
            ...Array.from(document.getElementsByTagName("ytd-playlist-panel-renderer"))
        );
    }

    remove_items_list(remove_elements);

}

function execute_always() {

    switch (true) {
        case document.baseURI.includes("watch"):
            remove_during_video()
            break;
    }

    let remove_elements = [
        document.getElementById("reel-overlay-container"),
        document.getElementById("shorts-container"),
        document.getElementById("shorts-inner-container"),
        document.getElementById("voice-search-button"),
        document.getElementById("chips-wrapper"),
        ...Array.from(document.getElementsByTagName("grid-shelf-view-model")),
        ...Array.from(document.getElementsByTagName("chip-bar-view-model")),
        ...Array.from(document.getElementsByTagName("ytd-reel-shelf-renderer")),
        ...Array.from(document.getElementsByTagName("ytd-shorts")),
        ...Array.from(document.getElementsByTagName("ytd-reel-video-renderer")),
        ...Array.from(document.getElementsByTagName("yt-chip-cloud-renderer")),
        ...Array.from(document.getElementsByTagName("a")).filter(e => e.title === "Shorts" || e.href === "/shorts/"), // remove short button on main page in left panel
        ...Array.from(document.getElementsByTagName("ytd-engagement-panel-section-list-renderer")) // ENGAGING CONTENT LOL, GO CHECK THIS XDDD
    ]
    remove_items_list(remove_elements)

    let mains = [
        "home",
    ]

    // try to remove main page content
    Array.from(document.getElementsByTagName("ytd-browse"))
        .filter(e => mains.includes(e.getAttribute('page-subtype')))
        .forEach(root => {
            if (root) {
                browser.storage.sync.get("videos_main")
                    .then(Response => {

                        if (Response.videos_main === "no" || Response.videos_main === undefined) remove_all_but_header(root);

                        browser.storage.sync.get("intro_label")
                            .then(Response1 => {
                                if (Response1.intro_label === undefined || Response1.intro_label) {
                                    if (root.firstChild) {
                                        root.firstChild.innerText = "Check plugin settings to configure your experience and remove this annoying label"
                                        root.firstChild.style.zIndex = "3000"
                                        root.firstChild.style.color = "white"
                                        root.firstChild.style.fontSize = "45px";
                                    }
                                }
                            }, onError);



                    }, onError)

            }
        })
}


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
    "clicked",
    "focus",
    "click",
    "mouseover"
]

events_always.forEach(e => {
    document.addEventListener(e, execute_always);
})
