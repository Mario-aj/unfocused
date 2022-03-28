const { app, BrowserWindow } = require("electron");
const isDev = require("electron-is-dev");
const path = require("path");

const createMainWindow = () => {
  let mainWindow = new BrowserWindow({
    width: 700,
    height: 800,
    minWidth: 630,
    minHeight: 760,
    center: true,
    show: false,
    webPreferences: {
      nodeIntegration: false,
    },
  });

  const appUrl = isDev
    ? "http://localhost:3000"
    : `file://${path.join(__dirname, "../build/index.html")}`;

  mainWindow.loadURL(appUrl);
  mainWindow.once("ready-to-show", () => mainWindow.show());
  mainWindow.on("closed", () => {
    mainWindow = null;
  });
};

app.whenReady().then(() => {
  createMainWindow();

  app.on("activate", () => {
    if (!BrowserWindow.getAllWindows().length) {
      createMainWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
