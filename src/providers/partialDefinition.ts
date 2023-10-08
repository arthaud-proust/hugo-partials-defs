import * as fs from 'fs';
import { globSync } from 'glob';
import * as vscode from 'vscode';
import { message } from '../utils/message';
import { partialPathFromDocumentLine } from '../utils/partials';
import path = require('path');

const defsFolderSearch = ['**/layouts/partials/'];

function getRootFolder(): string | null {
	if (vscode.workspace.workspaceFolders === undefined) {
		vscode.window.showErrorMessage(
			message('Working folder not found, open a folder an try again')
		);
		return null;
	}
	return vscode.workspace.workspaceFolders[0].uri.path;
}

function getDefinitionsFolders(rootFolder: string, partialPath: string): Array<string> {
	const definitionsFolders = globSync(defsFolderSearch, {
		cwd: rootFolder,
	});

	const foundDefinitions: Array<string> = [];
	definitionsFolders.forEach((defFolder) => {
		const partialDefinitionPath = path.join(rootFolder, defFolder, partialPath);

		if (fs.existsSync(partialDefinitionPath)) {
			foundDefinitions.push(partialDefinitionPath);
		}
	});

	return foundDefinitions;
}

export const partialDefinitionProdiver = vscode.languages.registerDefinitionProvider(
	'html',
	{
		provideDefinition(document: vscode.TextDocument, position: vscode.Position) {
			const documentLine = document.lineAt(position).text;
			if (!documentLine) {
				return undefined;
			}

			const rootFolder = getRootFolder();
			if (!rootFolder) {
				return undefined;
			}

			const partialPath = partialPathFromDocumentLine(
				documentLine,
				position.character
			);
			if (!partialPath) {
				return undefined;
			}

			const foundDefinitions = getDefinitionsFolders(rootFolder, partialPath);
			if (!foundDefinitions.length) {
				return undefined;
			}

			return foundDefinitions.map(
				(definitionPath) =>
					new vscode.Location(
						vscode.Uri.parse(definitionPath),
						new vscode.Position(0, 0)
					)
			);
		},
	}
);
