import * as vscode from 'vscode';
import { getDefinitionsFolders } from '../utils/definitionsFolders';
import { message } from '../utils/message';

export const partialsFoldersCommand = vscode.commands.registerCommand(
	'hugoPartialsDefs.partialsFolders',
	() => {
		vscode.window.showInformationMessage(
			message('partials folders found: ' + getDefinitionsFolders().join(', \n'))
		);
	}
);
