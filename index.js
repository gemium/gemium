const path = require("path");
const { app, BrowserWindow } = require("electron");
const { is } = require("electron-util");
const unhandled = require("electron-unhandled");
const debug = require("electron-debug");
const { watch } = require("chokidar");

unhandled();
debug({showDevTools: false});

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

app.setAppUserModelId("com.binyamingreen.gemium");

// autoupdater stuff goes here...

let mainWindow;

const createMainWindow = async () => {
    const win = new BrowserWindow({
        title: app.name,
        show: false,
        height: 600,
        width: 800,
        webPreferences: {
            nodeIntegration: true
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

    await win.loadFile(path.join(__dirname, "app", "index.html"))

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

(async () => {
    try {
        await app.whenReady();
        mainWindow = await createMainWindow();
        if(is.development) {
            mainWindow.show() // only for debugging
        }
    } catch (error) {
        throw error;
    }
})();
