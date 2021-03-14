const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("gemium", {
    pages: {
        goForward: () => ipcRenderer.send("pages:go-forward"),
        goBack: () => ipcRenderer.send("pages:go-back")
    }
});
