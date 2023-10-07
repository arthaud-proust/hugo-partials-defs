import * as vscode from 'vscode';
import { message } from '../utils/message';
import { partialPathFromDocumentLine } from '../utils/partials';
import path = require('path');

export const partialDefinitionProdiver = vscode.languages.registerDefinitionProvider(
	'html',
	{
		provideDefinition(document: vscode.TextDocument, position: vscode.Position) {
			if (vscode.workspace.workspaceFolders === undefined) {
				vscode.window.showErrorMessage(
					message('Working folder not found, open a folder an try again')
				);
				return undefined;
			}
			const rootFolder = vscode.workspace.workspaceFolders[0].uri.path;
			const partialsFolder = path.join(rootFolder, 'layouts', 'partials');

			const documentLine = document.lineAt(position).text;

			if (!documentLine) {
				return undefined;
			}

			const partialPath = partialPathFromDocumentLine(
				documentLine,
				position.character
			);
			console.log(partialPath);

			if (!partialPath) {
				return undefined;
			}

			return new vscode.Location(
				vscode.Uri.parse(path.join(partialsFolder, partialPath)),
				new vscode.Position(0, 0)
			);
		},
	}
);
