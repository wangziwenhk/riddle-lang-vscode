const vscode = require('vscode');
const { LanguageClient, TransportKind } = require('vscode-languageclient/node');

function activate(context) {
    const serverOptions = {
        run: {
            command: 'node',
            args: [context.asAbsolutePath('./src/server.js')],
            transport: TransportKind.stdio
        },
        debug: {
            command: 'node',
            args: ['--inspect=6009', context.asAbsolutePath('./src/server.js')],
            transport: TransportKind.stdio
        }
    };

    const clientOptions = {
        documentSelector: [{ scheme: 'file', language: 'riddle' }],
    };

    const client = new LanguageClient(
        'riddleServer',
        'Riddle Language Server',
        serverOptions,
        clientOptions
    );

    client.start();

    vscode.workspace.onDidChangeTextDocument(event => {
        const { document, contentChanges } = event;
        if (document.languageId === 'riddle') {
            // 实现防抖动，防止频繁触发补全
            if (debounceTimer) {
                clearTimeout(debounceTimer);
            }
            debounceTimer = setTimeout(() => {
                vscode.commands.executeCommand('editor.action.triggerSuggest');
            }, 200); // 200 毫秒防抖动
        }
    });
}

function deactivate() {
    if (client) {
        return client.stop();
    }
    return undefined;
}

module.exports = {
    activate,
    deactivate
};
