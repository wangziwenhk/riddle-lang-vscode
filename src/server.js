const { createConnection, 
    TextDocuments, 
    ProposedFeatures,
    CompletionItem,
    CompletionItemKind 
} = require('vscode-languageserver/node');
const { TextDocument } = require('vscode-languageserver-textdocument');

// 创建连接
const connection = createConnection(ProposedFeatures.all);

// 创建文档管理器
const documents = new TextDocuments(TextDocument);

// 监听文档变化
documents.onDidChangeContent((change) => {
    const text = change.document.getText();
    connection.console.log(`Document changed: ${text}`);
});

// 监听初始化请求
connection.onInitialize(() => {
    return {
        capabilities: {
            textDocumentSync: 1, // 同步文档内容
            completionProvider: {
                resolveProvider: true,
            }, // 支持代码补全
            hoverProvider: true, // 支持悬停提示
        },
    };
});

connection.onCompletion((textDocumentPosition)=>{
    let document = documents.get(textDocumentPosition.textDocument.uri)
    let postion = textDocumentPosition.position
    let text = document.getText()

    const completionItems = [
        {
            label: 'func',
            kind: CompletionItemKind.Keyword,
            detail: '关键字 func'
        },
        {
            label: 'var',
            kind: CompletionItemKind.Keyword,
            detail: '关键字 var'
        },
        {
            label: 'val',
            kind: CompletionItemKind.Keyword,
            detail: '关键词 val'
        },
        {
            label: 'return',
            kind: CompletionItemKind.Keyword,
            detail: '关键词 return'
        },
        {
            label: 'for',
            kind: CompletionItemKind.Keyword,
            detail: '关键词 for'
        },
    ];

    return completionItems;
})

connection.onCompletionResolve((item) => {
    // 为特定的补全项添加更多细节
    if (item.label === 'func') {
        item.detail = 'func 关键字，用于定义函数';
        item.documentation = '在 Riddle 中使用 func 定义一个函数。';
    }
    return item;
});

// 启动服务器
documents.listen(connection);
connection.listen();
