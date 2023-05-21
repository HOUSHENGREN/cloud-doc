// Preload (Isolated World)
const { contextBridge, ipcRenderer } = require('electron');
const remote = require('@electron/remote');
const fs = require('fs');
const path = require('path');

//  新版本api更改了： exposeInIsolatedWorld => exposeInMainWorld
contextBridge.exposeInMainWorld('electron', {
  doThing: () => ipcRenderer.send('do-a-thing'), // demo
  fs,
  path,
  ipcRenderer,
  remote,
});
