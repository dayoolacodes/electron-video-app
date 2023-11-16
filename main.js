const { app, BrowserWindow, Menu, shell } = require("electron");
const path = require("node:path");

const menuItems = [
  {
    label: "Menu",
    submenu: [
      {
        label: "About",
      },
    ],
  },
  {
    label: "File",
    submenu: [
      {
        label: "New Window",
        click: async () => {
          const win2 = new BrowserWindow({
            height: 500,
            width: 600,
            show: false
          })

          // win2.loadFile("index2.html")
          win2.loadURL("https://www.google.com/");
          win2.once("ready-to-show", () => win2.show())
        },
      },
      {
        label: "Open Camera",
        click: async () => {
          const win2 = new BrowserWindow({
            height: 500,
            width: 400
          })

          // win2.webContents.openDevTools();
          win2.loadFile("camera.html")
        },
      },
      {
        label: "Learn More",
        click: async () => {
          await shell.openExternal("https://www.google.com/");
        },
      },
      { type: "separator" },
      {
        label: "Exit",
        click: () => app.quit(),
      },
    ],
  },
  {
    label: "Window",
    submenu: [
      {
        role: "close",
      },
      {
        role: "Minimize",
      },
    ],
  },
];

const menu = Menu.buildFromTemplate(menuItems);

Menu.setApplicationMenu(menu);

const createWindow = () => {
  const win = new BrowserWindow({
    height: 500,
    width: 1000,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.loadFile("index.html");
};

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
