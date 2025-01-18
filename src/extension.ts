import * as vscode from 'vscode';
import { LanguageClient, LanguageClientOptions, ServerOptions, TransportKind } from 'vscode-languageclient/node';

// 定义一个变量以存储 LanguageClient 实例
let client: LanguageClient;

export function activate(context: vscode.ExtensionContext) {
    // 配置服务器选项
    const serverOptions: ServerOptions = {
        run: {
            command: 'node',
            args: [context.asAbsolutePath('./out/server.js')],
            transport: TransportKind.stdio
        },
        debug: {
            command: 'node',
            args: ['--inspect=6009', context.asAbsolutePath('./out/server.js')],
            transport: TransportKind.stdio
        }
    };

    // 配置客户端选项
    const clientOptions: LanguageClientOptions = {
        documentSelector: [{ scheme: 'file', language: 'riddle' }],
        synchronize: {
            // 监听文件变化，以便同步
            fileEvents: vscode.workspace.createFileSystemWatcher('**/*.red')
        }
    };

    // 创建并启动 LanguageClient
    client = new LanguageClient(
        'riddleServer',
        'Riddle Language Server',
        serverOptions,
        clientOptions
    );

    // 启动客户端
    client.start();

    // 将客户端添加到订阅中，以便在扩展停用时自动关闭
    context.subscriptions.push(client);
}

export function deactivate(): Thenable<void> | undefined {
    if (!client) {
        return undefined;
    }
    return client.stop();
}
