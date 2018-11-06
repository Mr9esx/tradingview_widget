// Modules to control application life and create native browser window
const electron = require('electron')
const {app, BrowserWindow} = require('electron')
const {ipcMain} = require('electron')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow
let yLock = false
let xLock = false
let showing = false

function createWindow () {
  const {width, height} = electron.screen.getPrimaryDisplay().workAreaSize
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 376, height: 293, minWidth: 376, minHeight: 293, transparent: true, frame: false, minimizable: false, maximizable: false, fullscreen: false, resizable: false})

  // mainWindow.webContents.openDevTools()

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })

  // mainWindow.on('move', function() {
  //   let position = mainWindow.getPosition()
  //
  //   if (position[1] >= 10 && yLock) {
  //     yLock = false
  //   }
  //   if (position[1] < 10 && !yLock) {
  //     mainWindow.setPosition(position[0], 0)
  //     mainWindow.setSize(376, 293)
  //     yLock = true
  //   }
  // });

  // mainWindow.on('blur', hideWindow);
  //
  // mainWindow.on('focus', showWindow);

  mainWindow.on('resize', function() {
    if (yLock) {
      mainWindow.setSize(376, 293)
    }
  });
}

// function showWindow() {
//   let position = mainWindow.getPosition()
//   if (position[1] < 0 && yLock) {
//     for (let i = position[1]; i <= 0; i++) {
//       mainWindow.setPosition(position[0], i)
//     }
//   }
// }
//
// function hideWindow() {
//   let position = mainWindow.getPosition()
//   if (position[1] === 0 && yLock) {
//     for (let i = 0; i > -273; i--) {
//       mainWindow.setPosition(position[0], i)
//     }
//   }
// }

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

ipcMain.on('close-window', (event, arg) => {
  mainWindow.close();
})

ipcMain.on('pin-window', (event, arg) => {
  if (mainWindow.isAlwaysOnTop()) {
    mainWindow.setAlwaysOnTop(false)
  } else {
    mainWindow.setAlwaysOnTop(true)
  }
})

// ipcMain.on('show-window', (event, arg) => {
//   if (yLock) {
//     showWindow()
//   }
// })
//
// ipcMain.on('hide-window', (event, arg) => {
//   if (yLock) {
//     hideWindow()
//   }
// })

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
