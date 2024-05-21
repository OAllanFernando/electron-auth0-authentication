// main/auth-process.js

const { BrowserWindow } = require('electron');
const authService = require('../services/auth-service');
const createAppWindow = require('../main/app-process');

let win = null;

async function createAuthWindow() {
  destroyAuthWin();

  win = new BrowserWindow({
    width: 1000,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      enableRemoteModule: false
    }
  });

  win.loadURL(authService.getAuthenticationURL());

  const { session: { webRequest } } = win.webContents;

  const filter = {
    urls: [
      'http://localhost/callback*'
    ]
  };

  webRequest.onBeforeRequest(filter, ({ url }) => {
    try {
      authService.loadTokens(url);
      createAppWindow();
      return destroyAuthWin();
    } catch (error) {
      console.error(error);
    }
  });

  win.on('authenticated', () => {
    destroyAuthWin();
  });

  win.on('closed', () => {
    win = null;
  });
}

function destroyAuthWin() {
  if (!win) return;
  win.close();
  win = null;
}

function createLogoutWindow() {
  const logoutWindow = new BrowserWindow({
    show: false,
  });

  logoutWindow.loadURL(authService.getLogOutUrl());

  logoutWindow.on('ready-to-show', async () => {
    await authService.logout();
    logoutWindow.close();
  });
}

module.exports = {
  createAuthWindow,
  createLogoutWindow,
};