function remove_items_list(list) {
    list.forEach(element => {
        if (element) element.remove()
    })
}

function onError(error) {
    console.log(`Error: ${error}`);
}

function remove_all_but_header(element) {
    while (element.firstChild) {
        if (element.firstChild.id === "header") {
            break;
        }
        element.removeChild(element.firstChild);
    }
    while (element.firstChild) {
        if (element.lastChild.id === "header") {
            break;
        }
        element.removeChild(element.lastChild)
    }
}

async function remove_during_video() {
    let remove_elements = [];

    const rightPanelRes = await browser.storage.sync.get("right_panel");
    const commentsRes = await browser.storage.sync.get("comments_section");
    const playlistRes = await browser.storage.sync.get("playlist");
    const videoAuthorRes = await browser.storage.sync.get("video_author");
    const likeDislikeRes = await browser.storage.sync.get("like_dislike");
    const merchRes = await browser.storage.sync.get("merch");
    const clipsaveRes = await browser.storage.sync.get("clip_save");
    const ticketsRes = await browser.storage.sync.get("tickets");

    if (rightPanelRes.right_panel === undefined || rightPanelRes.right_panel === "no") {
        remove_elements.push(document.getElementById("related")); // container for related videos 
    }

    if (commentsRes.comments_section === undefined || commentsRes.comments_section === "no") {
        remove_elements.push(
            ...Array.from(document.getElementsByTagName("ytd-comments")) // container
        );
    }
    if (playlistRes.playlist === undefined || playlistRes.playlist === "no") {
        remove_elements.push(
            ...Array.from(document.getElementsByTagName("ytd-playlist-panel-renderer")) // removes playlist list but still uses it
        );
    }
    if (videoAuthorRes.video_author === undefined || videoAuthorRes.video_author === "no") {
        let author = document.getElementById("owner"); // who created video, subscribe button etc.
        while (author.firstChild) {
            author.removeChild(author.firstChild);
        }
    }
    if (likeDislikeRes.like_dislike === undefined || likeDislikeRes.like_dislike === "no") {
        let el = document.getElementsByTagName("segmented-like-dislike-button-view-model")[0]; // just in case, so it won't affect any other
        while (el.firstChild) {
            el.removeChild(el.firstChild);
        }
    }

    if (merchRes.merch === undefined || merchRes.merch === "no") {
        remove_elements.push(
            ...Array.from(document.getElementsByTagName("ytd-merch-shelf-renderer")) // container
        )
    }

    if (clipsaveRes.clip_save === undefined || clipsaveRes.clip_save === "no") {
        remove_elements.push(document.getElementById("flexible-item-buttons")); // save and clip button, if remove byt tag/id removes all buttons in app
    }
    if (ticketsRes.tickets === undefined || ticketsRes.tickets === "no") {
        remove_elements.push(...Array.from(document.getElementsByTagName("ytd-ticket-shelf-renderer"))) // countainer
    }

    remove_items_list(remove_elements);

}

async function additional_removal() {
    let ret = []

    const leftMenuRes = await browser.storage.sync.get("left_panel");
    const logoRes = await browser.storage.sync.get("logo");
    const accountInfoRes = await browser.storage.sync.get("account_info");
    const voiceSearchRes = await browser.storage.sync.get("voice_search");
    const thumnailRes = await browser.storage.sync.get("thumnails");

    if (leftMenuRes.left_panel === undefined || leftMenuRes.left_panel === "no") {
        ret.push(document.getElementById("guide-wrapper")); // nav menu itself
        ret.push(...Array.from(document.getElementsByTagName("ytd-mini-guide-renderer"))); // mobile version of nav menu
        ret.push(document.getElementById("guide-button")); // button to toggle nav menu
    }

    if (logoRes.logo === undefined || logoRes.logo === "no") {
        Array.from(document.getElementsByTagName("ytd-topbar-logo-renderer")).forEach(el => {
            while (el.firstChild) { // otherwise search bar displaces from center
                el.removeChild(el.firstChild)
            }
        }
        )
    }

    if (accountInfoRes.account_info === undefined || accountInfoRes.account_info === "no") {
        let right = document.getElementById("end");
        while (right.firstChild) { // otherwise search bar displaces from center
            right.removeChild(right.firstChild);
        }
    }

    if (voiceSearchRes.voice_search === undefined || voiceSearchRes.voice_search === "no") {
        ret.push(document.getElementById("voice-search-button")) // anyone uses it?
    }

    if (thumnailRes.thumnails === undefined || thumnailRes.thumnails === "no") {
        ret.push(...Array.from(document.getElementsByTagName("yt-thumbnail-view-model")))
    }

    remove_items_list(ret)
}

async function execute_always() {

    switch (true) {
        case document.baseURI.includes("watch"):
            remove_during_video()
            break;
    }

    let remove_elements = [
        document.getElementById("reel-overlay-container"), // die
        document.getElementById("shorts-container"), // die
        document.getElementById("shorts-inner-container"), // die
        document.getElementById("chips-wrapper"), // does anyone uses them?
        ...Array.from(document.getElementsByTagName("grid-shelf-view-model")), // does anyone uses them?
        ...Array.from(document.getElementsByTagName("chip-bar-view-model")), // does anyone uses them?
        ...Array.from(document.getElementsByTagName("ytd-reel-shelf-renderer")), // die
        ...Array.from(document.getElementsByTagName("ytd-shorts")), // die
        ...Array.from(document.getElementsByTagName("ytd-reel-video-renderer")), // die
        ...Array.from(document.getElementsByTagName("yt-chip-cloud-renderer")), // does anyone uses them?
        ...Array.from(document.getElementsByTagName("a")).filter(e => e.title === "Shorts" || e.href === "/shorts/"), // remove short button on main page in left panel
        ...Array.from(document.getElementsByTagName("ytd-engagement-panel-section-list-renderer")), // ENGAGING CONTENT LOL, GO CHECK THIS XDDD
        ...Array.from(document.getElementsByName("ytd-companion-slot-renderer")) // COMPANTION PANEL, YEAH SURE (same as previous)
    ]
    additional_removal()
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
                                        root.firstChild.innerText = `Check plugin settings to configure your experience and remove this annoying label
                                        You can go to about:addons (or simply settings) and open zenube -> preferences
                                        or
                                        you can open extensions tab (right top corner) and click on zentube
                                        `
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

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "updateSettings") {
        execute_always()
    }
});