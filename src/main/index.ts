import {app, BrowserWindow} from 'electron';

const electronDebug = require('electron-debug');
electronDebug();

console.log('main process', __dirname);

app.on('ready', () => {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true
    },
  });
  const rendererUrl = 'file://' + __dirname + '/renderer/index.html';
  console.log('rendererUrl', rendererUrl);
  mainWindow.loadURL(rendererUrl);
});
