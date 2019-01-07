const path = require('path');
const isDev = require('electron-is-dev');
const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let mainWindow;

function createWindow() {
  if (isDev) {
    const {
      default: installExtension,
      REACT_DEVELOPER_TOOLS,
      REDUX_DEVTOOLS,
    } = require('electron-devtools-installer');
    [REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS].forEach(extension => {
      installExtension(extension)
        .then(name => console.log(`Added Extension: ${name}`))
        .catch(err => console.log('An error occurred: ', err));
    });
  }
  mainWindow = new BrowserWindow({
    height: 680,
    webPreferences: {
      nodeIntegration: true,
    },
    width: 900,
  });

  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`
  );
  mainWindow.on('closed', () => (mainWindow = null));
  if (isDev) {
    mainWindow.openDevTools();
  }
}

app
  .on('ready', createWindow)
  .on('browser-window-created', (e, window) => {
    window.setMenu(null);
  })
  .on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  })
  .on('activate', () => {
    if (mainWindow === null) {
      createWindow();
    }
  });
