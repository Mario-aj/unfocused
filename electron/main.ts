const { app, BrowserWindow } = require("electron");

console.log("Starting electron");

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
  const startURL = "http://localhost:3000";

  mainWindow.loadURL(startURL);

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
