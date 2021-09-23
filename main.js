// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')
const path = require('path')
//const { app } = require('electron')

function createWindow () {
  let s = './clientTestuser.p12';
  let options = {certificate:s, password:'changeit'}
  let ops = app.importCertificate.options
 // ops.certificate = s
  //ops.password = 'changeit'
  app.importCertificate(options, (result) => {
    if (result === 0) {
        console.log('ok')
    }else {
      console.log('err')
    }
  }); 
    
  s = './clientBob.p12'
  options = {certificate:s, password:'changeit'}
  
 // ops.certificate = s
  //ops.password = 'changeit'
  app.importCertificate(options, (result) => {
    if (result === 0) {
        console.log('ok')
    }else {
      console.log('err')
    }
  }); 
    
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })
let url = 'https://localhost:8443/user';
/*
  BrowserWindow.webContents.on('select-client-certificate', (event, webContents, url, list, callback) => {
    event.preventDefault()
    callback(list[0])
  })

*/
mainWindow.title = "Electron PKI-Auth Demo for P093"
  // and load the index.html of the app.
 //  mainWindow.loadFile('index.html')
 mainWindow.loadURL('https://localhost:8443/user')
 
//mainWindow.importCertificate()
  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
