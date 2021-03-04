// const path = require("path");

// const remoteUrl = "gemini://gemini.circumlunar.space/docs/cheatsheet.gmi";
// const localUrl = path.resolve(process.cwd(), "mocks", "localFile.gmi");

// Dispatch actions
// TODO entry history/suggestions
document.getElementById("address").addEventListener("keydown", (evt) => {
    if(evt.code === "Enter") {
        try {
            gemium.load(evt.target.value);
        } catch (e) {
            throw e;
        }
    }
})

gemium.load("gemini://gemini.circumlunar.space/")
