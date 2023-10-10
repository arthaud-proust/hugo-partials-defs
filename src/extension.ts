import * as vscode from 'vscode';
import { partialsFoldersCommand } from './commands/partialsFolders';
import { partialDefinitionProdiver } from './definitionProviders/partialDefinition';
import { message } from './utils/message';

export function activate(context: vscode.ExtensionContext) {
	vscode.window.showInformationMessage(message('loaded'));

	context.subscriptions.push(partialDefinitionProdiver);
	context.subscriptions.push(partialsFoldersCommand);
}
