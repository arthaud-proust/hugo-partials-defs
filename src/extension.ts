import * as vscode from 'vscode';
import { partialDefinitionProdiver } from './providers/partialDefinition';

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(partialDefinitionProdiver);
}
