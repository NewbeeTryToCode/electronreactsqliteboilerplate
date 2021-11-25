const electron = require("electron");

const { app } = electron;
const { BrowserWindow } = electron;

const path = require("path");
const isDev = require("electron-is-dev");

// preferable require it right after the main imports.
require("../src/message-control/main");

var knex = require("knex")
knex({
  client:"sqlite3",
  connection:{
    filename:"./database.sqlite"
  }
})

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 900, 
    height: 680,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );
  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
