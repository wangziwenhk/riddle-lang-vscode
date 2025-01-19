import { 
    createConnection, 
    TextDocuments, 
    ProposedFeatures, 
    CompletionItem, 
    CompletionItemKind,
    InitializeParams,
    InitializeResult,
    CompletionParams,
    CompletionItem as LSCompletionItem
} from 'vscode-languageserver/node';
import { TextDocument } from 'vscode-languageserver-textdocument';
import { KeywordCompletionItems } from './keywords'

// 创建连接
const connection = createConnection(ProposedFeatures.all);

// 创建文档管理器
const documents: TextDocuments<TextDocument> = new TextDocuments(TextDocument);

// 监听初始化请求
connection.onInitialize((_params: InitializeParams): InitializeResult => {
    return {
        capabilities: {
            textDocumentSync: 1, // 同步文档内容（1 表示 Full 文档同步）
            completionProvider: {
                resolveProvider: true,
            },
            hoverProvider: true
        }
    };
});

// 处理补全请求
connection.onCompletion((params: CompletionParams): LSCompletionItem[] => {
    const document = documents.get(params.textDocument.uri);
    if (!document) {
        return [];
    }
    // 可根据 document 内容或光标位置进一步处理
    const completionItems: LSCompletionItem[] = [
        ...KeywordCompletionItems
    ];

    return completionItems;
});

// 处理补全项解析，为补全项添加更多信息
connection.onCompletionResolve((item: LSCompletionItem): LSCompletionItem => {
    if (item.label === 'func') {
        item.documentation = '在 Riddle 中使用 fun 定义一个函数。';
    }
    return item;
});

// 启动服务器：监听文档和连接
documents.listen(connection);
connection.listen();
