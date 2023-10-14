import * as fs from 'fs';
import * as path from 'path';
import config from '../extension.config';
import { getDefinitionsFolders } from './definitionsFolders';

export function getDefinitionsPaths(partialLocalPath: string): Array<string> {
	const definitionsFolders = getDefinitionsFolders();

	const foundDefinitions: Array<string> = [];
	definitionsFolders.forEach((defFolder) => {
		const funcDefinitionPath = path.join(defFolder, partialLocalPath);

		if (fs.existsSync(funcDefinitionPath)) {
			foundDefinitions.push(funcDefinitionPath);
		}

		const partialFilename = partialLocalPath + config.partialFileExt;

		const partialDefinitionPath = path.join(defFolder, partialFilename);
		if (fs.existsSync(partialDefinitionPath)) {
			foundDefinitions.push(partialDefinitionPath);
		}
	});
	return foundDefinitions;
}
