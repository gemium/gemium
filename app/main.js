if(!window.gemium) throw new Error("Gemium api not loaded");


function open(url) {
    const root = document.getElementById("root");

    // The next line allows us to change the url of the iframe,
    // without triggering "cross-origin" security issues
    root.setAttribute("src", "about:blank")
    setTimeout(() => {
        root.contentWindow.open(url, "_self");
    }, 50)
}

// TODO typing suggestions based on user history
document.getElementById("address").addEventListener("keydown", (evt) => {
    if(evt.code === "Enter") {
        open(evt.target.value)
    }
})

document.getElementById("page-last").addEventListener("click", () => {
    gemium.pages.goBack();
})

document.getElementById("page-next").addEventListener("click", () => {
    gemium.pages.goForward()
})

document.getElementById("page-refresh").addEventListener("click", () => {
    location.reload();
})
