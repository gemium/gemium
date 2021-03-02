const path = require("path");
const actions = require("./actions")

const remoteUrl = "gemini://gemini.circumlunar.space/docs/cheatsheet.gmi";
const localUrl = path.resolve(process.cwd(), "mocks", "localFile.gmi");

// Dispatch actions
document.getElementById("address").addEventListener("keydown", (evt) => {
    if(evt.code === "Enter") {
        try {
            actions.doLoadUrl(evt.target.value);
        } catch (e) {
            throw e;
        }
    }
})
