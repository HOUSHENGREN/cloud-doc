const isDev = require('electron-is-dev');
const { app, BrowserWindow } = require('electron');

app.on('ready', () => {
  const mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: {
      // webSecurity: false,
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  mainWindow.webContents.openDevTools();

  const url = isDev ? 'http://localhost:3000/' : 'dummy'; // dummy 占位，todo，生产环境先不管
  mainWindow.loadURL(url);
});
