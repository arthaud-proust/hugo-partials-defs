import * as vscode from 'vscode';
import { getDefinitionsPaths } from '../utils/definitionsPaths';
import { getPartialLocalPathFromStr } from '../utils/partialLocalPathFromStr';

export const partialDefinitionProdiver = vscode.languages.registerDefinitionProvider(
	[{ language: 'html' }, { language: 'plaintext' }],
	{
		provideDefinition(document: vscode.TextDocument, position: vscode.Position) {
			const documentLine = document.lineAt(position).text;
			if (!documentLine) {
				return undefined;
			}

			const partialLocalPath = getPartialLocalPathFromStr(
				documentLine,
				position.character
			);

			if (!partialLocalPath) {
				return undefined;
			}

			const foundDefinitions = getDefinitionsPaths(partialLocalPath);
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
