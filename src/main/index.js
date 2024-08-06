import { app, BrowserWindow, ipcMain, protocol } from 'electron'
import { join, resolve } from 'path'
import { is } from '@electron-toolkit/utils'
import fs from 'fs'
import PouchDB from 'pouchdb'
import pouchdbFind from 'pouchdb-find'
import ipcHandlers from './ipcHandler'
import path from 'path'

PouchDB.plugin(pouchdbFind)

// Ensure the database and Clients directory exist relative to the start directory
const basePath = resolve(process.cwd(), 'out')
const databasePath = resolve(basePath, 'database')
const clientsPath = resolve(basePath, 'Clients')

// Create directories if they don't exist
if (!fs.existsSync(databasePath)) {
  fs.mkdirSync(databasePath, { recursive: true })
}

if (!fs.existsSync(clientsPath)) {
  fs.mkdirSync(clientsPath, { recursive: true })
}

// Initialize the PouchDB database
const db = new PouchDB(join(databasePath, 'my_database'))

// Set up a custom protocol to handle local files securely
app.whenReady().then(() => {
  protocol.registerFileProtocol('safe-file', (request, callback) => {
    const url = request.url.substr(11) // Remove 'safe-file://' prefix
    const decodedPath = decodeURIComponent(url)
    const filePath = path.normalize(`${__dirname}/${decodedPath}`)
    callback({ path: filePath })
  })

  // Create the main application window
  createWindow()

  // Re-open a window if all windows are closed (macOS behavior)
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Function to create the main window
function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      webSecurity: false // Disable web security to allow loading local resources
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  if (is.dev && process.env.ELECTRON_RENDERER_URL) {
    mainWindow.loadURL(process.env.ELECTRON_RENDERER_URL)
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// Initialize the IPC handlers with the database and file paths
ipcHandlers(ipcMain, db, clientsPath)

// Quit the application when all windows are closed, except on macOS
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
