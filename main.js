const electron = require('electron')
const {app, BrowserWindow} = require('electron')
const {ipcMain} = require('electron')
const {Tray} = require('electron');
const {Menu} = require('electron');
const path = require('path');

let mainWindow
let contextMenu
let appTray = null
let trayMenuTemplate = null

function createWindow() {
    const {width, height} = electron.screen.getPrimaryDisplay().workAreaSize

    mainWindow = new BrowserWindow({
        width: 376,
        height: 293,
        minWidth: 376,
        minHeight: 293,
        transparent: true,
        frame: false,
        minimizable: false,
        maximizable: false,
        fullscreen: false,
        resizable: false,
        show: false,
        skipTaskbar: true
    })

    mainWindow.loadFile('index.html')

    // mainWindow.webContents.openDevTools()

    trayMenuTemplate = [
        {
            label: '关闭',
            click: function () {
                quitApp()
            }
        }
    ];

    appTray = new Tray(path.join(path.join(__dirname, 'res'), 'logo.png'));

    contextMenu = Menu.buildFromTemplate(trayMenuTemplate);

    appTray.setToolTip('TradingView Widget');

    appTray.setContextMenu(contextMenu);

    appTray.on('double-click', (event, arg) => {
        mainWindow.setAlwaysOnTop(true)
        mainWindow.setAlwaysOnTop(false)
    })
}


function quitApp() {
    appTray.destroy()
    app.quit()
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        quitApp()
    }
})

app.on('activate', function () {
    if (mainWindow === null) {
        createWindow()
    }
})

ipcMain.on('close-window', (event, arg) => {
    mainWindow.close();
})
