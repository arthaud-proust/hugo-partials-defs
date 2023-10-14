import * as vscode from 'vscode';
import { message } from './message';

export function getRootFolders(): Array<string> {
	const wsFolders = vscode.workspace.workspaceFolders;

	if (wsFolders === undefined || wsFolders.length === 0) {
		const msg = message('Working folder not found, open a folder an try again');
		vscode.window.showErrorMessage(msg);
		throw new Error(msg);
	}

	return wsFolders.map((folder) => folder.uri.path);
}
