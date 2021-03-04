if(!window.gemium) throw new Error("Gemium api not loaded");

// TODO typing suggestions based on user history
document.getElementById("address").addEventListener("keydown", (evt) => {
    if(evt.code === "Enter") {
        const root = document.getElementById("root");

        const range = document.createRange();
        range.selectNodeContents(root);
        range.deleteContents();

        renderPage(evt.target.value);
    }
})
