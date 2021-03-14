const path = require("path");
const { app, BrowserWindow, protocol, ipcMain } = require("electron");
const { is } = require("electron-util");
const unhandled = require("electron-unhandled");
const debug = require("electron-debug");

unhandled();
debug({showDevTools: false});

require('electron-context-menu')({
    showSearchWithGoogle: false
});

if(is.development) {
    const { watch } = require("chokidar");

    try {
        const watcher = watch(path.join(__dirname, "app"));

        watcher.on("change", () => {
            for(const window_ of BrowserWindow.getAllWindows()) {
                window_.webContents.reloadIgnoringCache();

                for(const view_ of window_.getBrowserViews()) {
                    view_.webContents.reloadIgnoringCache();
                }
            }
        })
    } catch (error) {
        throw new Error(error);
    }
}

app.setAppUserModelId("com.binyamingreen.gemium");

// autoupdater stuff goes here...

let mainWindow;

const createMainWindow = async () => {
    const win = new BrowserWindow({
        title: app.name,
        show: false,
        height: 800,
        width: 1200,
        webPreferences: {
            preload: path.resolve(__dirname, "renderer", "preload.js"),
            defaultEncoding: "utf-8"
        }
    })

    if(!is.development) {
        win.on("ready-to-show", () => {
            win.show();
        })
    }

    win.on("closed", () => {
        mainWindow = undefined;
    })


    const {goForward, goBack} = win.webContents;
    ipcMain.on("pages:go-forward", goForward)
    ipcMain.on("pages:go-back", goBack)

    await win.loadFile(path.join(__dirname, "renderer", "public", "index.html"))

    return win;
}


if(!app.requestSingleInstanceLock()) {
    app.quit();
}

app.on("second-instance", () => {
    if(mainWindow) {
        if(mainWindow.isMinimized()) {
            mainWindow.restore();
        }

        mainWindow.show();
    }
});

app.on("window-all-closed", () => {
    if(!is.macos) {
        app.quit();
    }
});

app.on("activate", async () => {
    if(!mainWindow) {
        mainWindow = await createMainWindow();
    }
});


protocol.registerSchemesAsPrivileged([
    {scheme: "gemini", privileges: { standard: true }},
]);

(async () => {
    try {
        await app.whenReady();

        require("./main/protocols/gemini").register(protocol);

        mainWindow = await createMainWindow();

        if(is.development) {
            mainWindow.show() // only for debugging
        }
    } catch (error) {
        throw error;
    }
})();
