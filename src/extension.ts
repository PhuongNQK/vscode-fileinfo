// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode'

const COMMAND_SHOW = 'vscode-fileinfo.show'

let statusBarItem: vscode.StatusBarItem

// This method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
    const { subscriptions } = context

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
    const command = vscode.commands.registerCommand(COMMAND_SHOW, () => {
        // TODO The code you place here will be executed every time your command is executed
    })
    subscriptions.push(command)

    statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100)
    statusBarItem.command = COMMAND_SHOW
    subscriptions.push(statusBarItem)

    // Register disposable listeners that make sure the status bar
    // item always up-to-date and that get disposed when deactivating
    const onSave = vscode.workspace.onDidSaveTextDocument(updateStatusBarItem)
    subscriptions.push(onSave)

    const onActiveEditorChanged = vscode.window.onDidChangeActiveTextEditor(updateStatusBarItem)
    subscriptions.push(onActiveEditorChanged)

    // update status bar item once at start
    updateStatusBarItem()
}

const updateStatusBarItem = () => {
    const fileInfo = getFileInfo()
    if (fileInfo) {
        statusBarItem.text = `${fileInfo.displaySize}`
        statusBarItem.show()
    } else {
        statusBarItem.text = ''
        statusBarItem.hide()
    }
}

const getFileInfo = () => {
    return { size: 1, displaySize: '' }
}

// this method is called when your extension is deactivated
export function deactivate() {
    if (statusBarItem) {
        statusBarItem.hide()
        statusBarItem.dispose()
        statusBarItem = null
    }
}
