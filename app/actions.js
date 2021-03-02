const gemparse = require("./parser");
const renderAst = require("./render");
const { fetchUrl } = require("./util");

function doLoadUrl(value) {
    fetchUrl(value).then(doc => {
        const ast = gemparse(doc);
        renderAst(ast);
    })
    .catch(e => {
        // TODO handle error gracefully
        console.error(e);
    })
}

// dispatch actions
module.exports = {
    doLoadUrl
}
