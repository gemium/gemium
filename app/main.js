if(!window.gemium) throw new Error("Gemium api not loaded");

// TODO typing suggestions based on user history
document.getElementById("address").addEventListener("keydown", (evt) => {
    if(evt.code === "Enter") {
        const root = document.getElementById("root");

        const range = document.createRange();
        range.selectNodeContents(root);
        range.deleteContents();

        navigate(evt.target.value);
    }
})

document.getElementById("page-last", () => {
    const page = gemium.pages.getLast();
    if(!!page) {
        return navigate(page);
    }
})

document.getElementById("page-next", () => {
    const page = gemium.pages.getNext();
    if(!!page) {
        return navigate(page);
    }
})

document.getElementById("refresh", () => {
    const page = gemini.pages.getCurrent();
    if(page) navigate(page, { save: false })
})
