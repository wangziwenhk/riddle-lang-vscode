import { 
    CompletionItemKind,
} from 'vscode-languageserver/node';
export const KeywordCompletionItems = [
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
    {
        label: 'while',
        kind: CompletionItemKind.Keyword,
        detail: '关键词 while'
    },
];