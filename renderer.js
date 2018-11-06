// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
// const {BrowserWindow} = require('electron').remote

const {ipcRenderer} = require('electron')
const closeWindowBtn = document.getElementById('close-window')
const pinWindowBtn = document.getElementById('pin-window')
const reloadWindowBtn = document.getElementById('reload-window')
const windowTitle = document.getElementsByClassName('tradingview-widget-copyright')[0]
const {remote} = require('electron')
const app = remote.app
require('./res/tv.js')

let mainWindow = remote.getCurrentWindow()
let yLock = false
let flag = false

mainWindow.once('ready-to-show', () => {
    mainWindow.show()
    loadChart()
})

mainWindow.on('closed', function () {
    mainWindow = null
})

// mainWindow.on('move', function () {
//     let position = mainWindow.getPosition()
//     if (position[1] > 0) {
//         yLock = false
//     }
//     if (position[1] === 0) {
//         yLock = true
//     }
// })

mainWindow.on('blur', () => {
    windowTitle.style.background = "#262626";
})

mainWindow.on('focus', () => {
    windowTitle.style.background = "#131722";
})

// mainWindow.on('resize', function () {
//     if (yLock) {
//         mainWindow.setSize(376, 293)
//     }
// })

closeWindowBtn.addEventListener('click', () => {
    ipcRenderer.send('close-window')
})

pinWindowBtn.addEventListener('click', () => {
    if (pinWindow()) {
        pinWindowBtn.setAttribute("class", "utils_btn utils_btn_select")
    } else {
        pinWindowBtn.setAttribute("class", "utils_btn")
    }
})

reloadWindowBtn.addEventListener('click', () => {
    loadChart()
})

function pinWindow() {
    if (mainWindow.isAlwaysOnTop()) {
        mainWindow.setAlwaysOnTop(false)
    } else {
        mainWindow.setAlwaysOnTop(true)
    }
    return mainWindow.isAlwaysOnTop()
}

function loadChart() {
    new TradingView.widget({
        "width": 380,
        "height": 290,
        "symbol": "XAUUSD",
        "interval": "15",
        "timezone": "Etc/UTC",
        "theme": "Dark",
        "style": "1",
        "locale": app.getLocale().replace('-', '_'),
        "toolbar_bg": "#f1f3f6",
        "enable_publishing": true,
        "hide_side_toolbar": false,
        "allow_symbol_change": true,
        "studies": [
            "MACD@tv-basicstudies"
        ],
        "container_id": "tradingview_44e89"
    })
}

// function showWindow() {
//     let position = mainWindow.getPosition()
//     if (position[1] < 0 && flag) {
//         contentWindow.removeEventListener('mouseleave', hideWindow(), false)
//         for (let i = position[1]; i <= 0; i = i + 2) {
//             mainWindow.setBounds({
//                 width: 376, height: 293, x: position[0], y: i
//             })
//         }
//         flag = false
//         setTimeout(function () {
//             contentWindow.addEventListener('mouseleave', hideWindow())
//         }, 500)
//     }
//
// }
//
// function hideWindow() {
//     let position = mainWindow.getPosition()
//     if (position[1] === 0 && !flag) {
//         for (let i = 0; i > -273; i = i - 2) {
//             mainWindow.setBounds({
//                 width: 376, height: 293, x: position[0], y: i
//             })
//         }
//         flag = true
//     }
// }
//
// contentWindow.addEventListener('mouseover', () => {
//     showWindow()
// })
