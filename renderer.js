// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
// const {BrowserWindow} = require('electron').remote

const {ipcRenderer} = require('electron')

const bodyContent = document.getElementById('body-content')

const closeWindow = document.getElementById('close-window')

const pinWindow = document.getElementById('pin-window')

let flag = false


closeWindow.addEventListener('click', () => {
  ipcRenderer.send('close-window')
})

pinWindow.addEventListener('click', () => {
  ipcRenderer.send('pin-window')
})

// bodyContent.addEventListener('mouseover', () => {
//   flag = false
//   ipcRenderer.send('show-window')
// })
//
// bodyContent.addEventListener('mouseout', () => {
//   setTimeout(function () {
//     if (!flag) {
//       ipcRenderer.send('hide-window')
//       flag = true
//     }
//   }, 300)
// })
