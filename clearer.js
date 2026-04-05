function remove(list) {
    list.forEach(e => {
        if (e) e.remove()
    })
}

function onError(error) {
    console.log(`Error: ${error}`);
}

function execute_always() {


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
        ...Array.from(document.getElementsByTagName("a")).filter(e => e.title === "Shorts" || e.href === "/shorts/")
    ]
    remove(remove_elements)

    let mains = [
        "home",
    ]

    Array.from(document.getElementsByTagName("ytd-browse"))
        .filter(e => mains.includes(e.getAttribute('page-subtype')))
        .forEach(e => {
            if (e) {
                while (e.firstChild) {
                    if (e.firstChild.id === "header") {
                        break;
                    }
                    e.removeChild(e.firstChild);
                }
                while (e.lastChild) {
                    if (e.lastChild.id === "header") {
                        break;
                    }
                    e.removeChild(e.lastChild)
                }
                console.log(e.firstChild);


                browser.storage.sync.get("intro_label")
                    .then(Response => {
                        console.log(Response.intro_label)
                        if (Response.intro_label === "yes" || Response.intro_label === undefined) {
                            if (e.firstChild) {

                                e.firstChild.innerText = "Check plugin settings to configure your experience and remove this annoying label"
                                e.firstChild.style.zIndex = "3000"
                                e.firstChild.style.color = "white"
                                e.firstChild.style.fontSize = "45px";
                            }
                        }
                    }, onError);



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
    document.addEventListener(e, execute_always)
})