const { app, BrowserWindow } = require("electron");
const path = require("node:path");

// loading .env
require("dotenv").config();

// hot reloading
if (process.env.APP_MODE === "development") {
  require("electron-reload")(__dirname, {
    electron: path.join(__dirname, "node_modules", ".bin", "electron"),
  });
}

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
  });

  win.loadFile("index.html");
  if (process.env.APP_MODE === "development") {
    // open dev tool
    win.webContents.openDevTools();
  }
};

app.whenReady().then(() => {
  createWindow();
});
