// Preload (Isolated World)
const { contextBridge, ipcRenderer } = require('electron');
const remote = require('@electron/remote');
const fs = require('fs');
const path = require('path');

// const ElectronStore = require('electron-store');

// console.log('4543645', new ElectronStore());
// ElectronStore.initRenderer();

//  新版本api更改了： exposeInIsolatedWorld => exposeInMainWorld
contextBridge.exposeInMainWorld('electron', {
  doThing: () => ipcRenderer.send('do-a-thing'), // demo
  fs,
  path,
  ipcRenderer,
  remote,
  aa: {},
  store: {
    get(key) {
      return ipcRenderer.sendSync('electron-store-get', key);
    },
    set(property, val) {
      ipcRenderer.send('electron-store-set', property, val);
    },
    // Other method you want to add like has(), reset(), etc.
  },
  // store: new ElectronStore(),
});
