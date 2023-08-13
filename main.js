const path = require('path');
const { app, BrowserWindow, Menu } = require('electron');

function createMainWindow() {
    const mainWindow = new BrowserWindow({
        title: "Chat",
        width: 1000,
        height: 600
    });

    if (process.env.NODE_ENV !== 'development') {
        mainWindow.webContents.openDevTools();
    }

    mainWindow.loadFile(path.join(__dirname, './app/index.html'));
}

function createConnectWindow() {
    const connectWindow = new BrowserWindow({
        title: "Connect",
        width: 200,
        height: 300
    });

    connectWindow.loadFile(path.join(__dirname, './app/connect.html'));
}

// App is ready
app.whenReady().then(() => {
    createMainWindow();
    
    // menu
    const mainMenu = Menu.buildFromTemplate(menu);
    Menu.setApplicationMenu(mainMenu);
});

const menu = [
    {
        label: 'File',
        submenu: [
            {
                label: 'Connect',
                click: () => createConnectWindow,
            },
            {
                label: 'Quit',
                click: () => app.quit(),
            }
        ]
    }
];

app.on('window-all-closed', () => {
    app.quit()
});