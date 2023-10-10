import * as vscode from 'vscode';
import { partialsFoldersCommand } from './commands/partialsFolders';
import { partialDefinitionProdiver } from './definitionProviders/partialDefinition';

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(partialDefinitionProdiver);
	context.subscriptions.push(partialsFoldersCommand);
}

export function deactivate() {}