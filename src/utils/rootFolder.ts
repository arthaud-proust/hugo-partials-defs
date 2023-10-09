import * as vscode from 'vscode';
import { message } from './message';

export function getRootFolder(): string | null {
	if (vscode.workspace.workspaceFolders === undefined) {
		const msg = message('Working folder not found, open a folder an try again');
		vscode.window.showErrorMessage(msg);
		throw new Error(msg);
	}
	return vscode.workspace.workspaceFolders[0].uri.path;
}
