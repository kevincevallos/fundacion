//handle setupevents as quickly as possible
const setupEvents = require('./setupEvents')
if (setupEvents.handleSquirrelEvent()) {
  // squirrel event handled and app will exit in 1000ms, so don't do anything else
  return;
}

const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const isDevMode = require('electron-is-dev');
const { CapacitorSplashScreen, configCapacitor } = require('@capacitor/electron');
let miVentana = null
const path = require('path');

// Place holders for our windows so they don't get garbage collected.
let mainWindow = null;

// Placeholder for SplashScreen ref
let splashScreen = null;

//Change this if you do not wish to have a splash screen
let useSplashScreen = false;

// Create simple menu for easy devtools access, and for demo
const menuTemplateDev = [
  {
    label: 'Options',
    submenu: [
      {
        label: 'Open Dev Tools',
        click() {
          mainWindow.openDevTools();
        },
      },
    ],
  },
];

async function createWindow() {
  // Define our main window size
  mainWindow = new BrowserWindow({
    height: 920,
    width: 1600,
    show: false,
    icon: path.join(__dirname, 'src/assets/icon.ico'),
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, 'node_modules', '@capacitor', 'electron', 'dist', 'electron-bridge.js')
    }
  });

  splashScreen = new BrowserWindow({
    minWidth: 400,
    minHeight: 280,
    width: 500,
    height: 280,
    center: true,
    backgroundColor: '#e0eff8',
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false
    },
    frame: false,
    skipTaskbar: true,
    resizable: false,
    alwaysOnTop: true,
  });
  splashScreen.loadURL(`file://${__dirname}/app/splashscreen.html`);
  /* mainWindow.once('ready-to-show', () => {
    //mainWindow.show();FundacionNuestrosJovenes\src\splashscreen.html
  }); */
  mainWindow.loadURL(`file://${__dirname}/app/index.html`);
  mainWindow.webContents.on('dom-ready', () => {
    splashScreen.destroy();
  });
  mainWindow.show();
  configCapacitor(mainWindow);

  if (isDevMode) {
    // Set our above template to the Menu Object if we are in development mode, dont want users having the devtools.
    Menu.setApplicationMenu(Menu.buildFromTemplate(menuTemplateDev));
    // If we are developers we might as well open the devtools by default.
    mainWindow.webContents.openDevTools();
  }

  if (useSplashScreen) {
    splashScreen = new CapacitorSplashScreen(mainWindow);
    splashScreen.init();
  } else {
    mainWindow.loadURL(`file://${__dirname}/app/index.html`);
    mainWindow.webContents.on('dom-ready', () => {
      mainWindow.show();
    });
  }

}


const obtenerBloqueo = app.requestSingleInstanceLock()

if (!obtenerBloqueo) {
  app.quit()
} else {
  app.on('second-instance', (event, commandLine, workingDirectory) => {
    // Si alguien intentó ejecutar un segunda instancia, debemos
    //enfocarnos en nuestra ventana principal.
    if (miVentana) {
      if (miVentana.isMinimized()) miVentana.restore()
      miVentana.focus()
    }
  })

  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some Electron APIs can only be used after this event occurs.
  app.on('ready', createWindow);
}
// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// Define any IPC or other custom functionality below here
/* ipcMain.on('showMainWindow', () => {
  splashScreen.destroy();
  mainWindow.maximize();
}); */