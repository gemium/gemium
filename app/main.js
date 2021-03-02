const fs = require("fs");
const path = require("path");

// const gemfetch = require("./fetch");
const gemparse = require("./parser");
const addToDom = require("./addToDom");

const remoteUrl = "gemini://gemini.circumlunar.space/docs/cheatsheet.gmi";
const localUrl = path.resolve(process.cwd(), "mocks", "localFile.gmi");

// <1> Fetch page
async function getDoc(url) {
    if(url.startsWith("gemini://")) {
        return await gemfetch(url);
    } else if(fs.statSync(url).isFile()) {
        return fs.readFileSync(url, { encoding: "utf-8" });
    } else {
        // TODO handle gracefully (display as plain-text?)
        throw new Error("format not recognized")
    }
}

getDoc(localUrl).then(doc => {
    const ast = gemparse(doc);
    ast.forEach(t => addToDom(t))
    console.log(ast)
})
.catch(e => {
    console.error(e);
})
