import * as fs from 'fs';
import * as path from 'path';
import config from '../extension.config';
import { getDefinitionsFolders } from './definitionsFolders';
import { getRootFolder } from './rootFolder';

export function getDefinitionsPaths(partialLocalPath: string): Array<string> {
	const rootFolder = getRootFolder();
	if (!rootFolder) {
		return [];
	}

	const definitionsFolders = getDefinitionsFolders();

	const foundDefinitions: Array<string> = [];
	definitionsFolders.forEach((defFolder) => {
		const funcDefinitionPath = path.join(rootFolder, defFolder, partialLocalPath);
		console.log(funcDefinitionPath);

		if (fs.existsSync(funcDefinitionPath)) {
			foundDefinitions.push(funcDefinitionPath);
		}

		const partialFilename = partialLocalPath + config.partialFileExt;

		const partialDefinitionPath = path.join(rootFolder, defFolder, partialFilename);
		if (fs.existsSync(partialDefinitionPath)) {
			foundDefinitions.push(partialDefinitionPath);
		}
	});
	return foundDefinitions;
}
