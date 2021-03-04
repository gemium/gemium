const {shell} = require("electron");

function add(token) {
    const root = document.getElementById("root");

    let element;
    switch (token.type) {
        case 'heading_1':
            element = document.createElement("h1");
            element.innerText = token.value;
            break;
        case 'heading_2':
            element = document.createElement("h2");
            element.innerText = token.value;
            break;
        case 'heading_3':
            element = document.createElement("h3");
            element.innerText = token.value;
            break;
        case 'break':
            element = document.createElement("br");
            break;
        case 'pre':
            element = document.createElement("pre");
            element.innerText = token.value;
            break;
        case 'text':
            element = document.createElement("p");
            element.innerText = token.value;
            break;
        case 'link':
            // TODO add classes for different types of links
            // TODO mark external links
            element = document.createElement("p");
            let a =  document.createElement("a");
            a.href = token.url;
            a.innerText = token.value;
            if(/^https?/.test(a.href)) {
                a.onclick = (evt) => {
                    evt.preventDefault();
                    shell.openExternal(a.href);
                }

                // TODO does the next line do anything?
                a.relList.add("noopener", "noreferrer");
            }

            element.appendChild(a);
            break;
        case 'quote':
            element = document.createElement("blockquote");
            element.innerText = token.value;
            break;
        case 'list':
            element = document.createElement("ul");
            for(const c of token.children) {
                let li = document.createElement("li");
                li.innerText = c.value;
                element.appendChild(li)
            }
            break;
        default:
            console.log(token.type + " not added");
    }

    if(!!element) root.appendChild(element);
}

function renderAst(ast) {
    // Clear page
    const range = document.createRange();
    range.selectNodeContents(document.getElementById("root"));
    range.deleteContents();

    // Render page
    ast.forEach(t => add(t));
}

module.exports = renderAst;
