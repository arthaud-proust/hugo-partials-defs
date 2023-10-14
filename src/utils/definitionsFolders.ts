import { globSync } from 'glob';
import * as vscode from 'vscode';
import { message } from './message';
import { getRootFolders } from './rootFolders';
import path = require('path');

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
	const rootFolders = getRootFolders();
	if (!rootFolders) {
		return [];
	}

	return rootFolders.flatMap((rootFolder) => {
		try {
			const defsFolderSearch = getFolderDefinitionsSearchPaths();

			return globSync(defsFolderSearch, {
				cwd: rootFolder,
			}).map((partialFolder) => path.join(rootFolder, partialFolder));
		} catch (e) {
			const msg = message(
				'Unable to find partials folders. Please check hugoPartialsDefs.partialsFolder config value in extension settings.'
			);
			vscode.window.showErrorMessage(msg);
			throw new Error(msg);
		}
	});
}
