// eslint-disable-next-line import/no-extraneous-dependencies
const isDev = require('electron-is-dev');
const { app, BrowserWindow } = require('electron');
const path = require('path');

app.on('ready', () => {
  const mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: {
      // webSecurity: false,
      nodeIntegration: true,
      // ontextBridge API can only be used when contextIsolation is enabled
      // contextIsolation: false,
      contextIsolation: true, // actually, it's a default value,but here i type it clearly
      enableRemoteModule: true, // 使用remote模块，这一行实际上貌似可以胜利
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // eslint-disable-next-line global-require
  require('@electron/remote/main').initialize();
  // eslint-disable-next-line global-require
  require('@electron/remote/main').enable(mainWindow.webContents);

  mainWindow.webContents.openDevTools();

  const url = isDev ? 'http://localhost:3000/' : 'dummy'; // dummy 占位，todo，生产环境先不管
  mainWindow.loadURL(url);
});
