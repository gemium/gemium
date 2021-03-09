if(!window.gemium) throw new Error("Gemium api not loaded");

// TODO typing suggestions based on user history
document.getElementById("address").addEventListener("keydown", (evt) => {
    if(evt.code === "Enter") {
        navigate(evt.target.value);
        gemium.pages.to(evt.target.value);
    }
})

document.getElementById("page-last").addEventListener("click", () => {
    const page = gemium.pages.toLast();
    if(!!page) {
        return navigate(page);
    }
})

document.getElementById("page-next").addEventListener("click", () => {
    const page = gemium.pages.toNext();
    if(!!page) {
        return navigate(page);
    }
})

document.getElementById("page-refresh").addEventListener("click", () => {
    const page = gemium.pages.current();
    if(page) navigate(page);
})
