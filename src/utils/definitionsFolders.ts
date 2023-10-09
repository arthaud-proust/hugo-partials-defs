import { globSync } from 'glob';
import * as vscode from 'vscode';
import { message } from './message';
import { getRootFolder } from './rootFolder';

function getFolderDefinitionsSearchPaths(): Array<string> {
	const folderDefsSearch = vscode.workspace
		.getConfiguration()
		.get('hugoPartialsDefs.partialsFolder');

	if (!folderDefsSearch || !Array.isArray(folderDefsSearch)) {
		const msg = message(
			'Invalid hugoPartialsDefs.partialsFolder config value. Please fix the extension settings.'
		);
		vscode.window.showErrorMessage(msg);
		throw new Error(msg);
	}

	return folderDefsSearch;
}

export function getDefinitionsFolders(): Array<string> {
	const rootFolder = getRootFolder();
	if (!rootFolder) {
		return [];
	}

	try {
		const defsFolderSearch = getFolderDefinitionsSearchPaths();

		return globSync(defsFolderSearch, {
			cwd: rootFolder,
		});
	} catch (e) {
		const msg = message(
			'Unable to find partials folders. Please check hugoPartialsDefs.partialsFolder config value in extension settings.'
		);
		vscode.window.showErrorMessage(msg);
		throw new Error(msg);
	}
}
