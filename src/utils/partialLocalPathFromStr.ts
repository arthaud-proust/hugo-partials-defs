import config from '../extension.config';
import { urlSegmentUntilPosition } from './url';

export function getPartialLocalPathFromStr(str?: string, position?: number): string | null {
	if (!str || !position) {
		return null;
	}

	const partialPrefix = `(partial ")`;
	const partialPath = `((?:\\w|\\/|-)+)`;
	const partialSuffix = `((?:\\${config.partialFileExt})?")`;
	const partialRegexp = RegExp(partialPrefix + partialPath + partialSuffix, 'g');

	let match: string | null = null;
	let matches: RegExpExecArray | null = null;

	while ((matches = partialRegexp.exec(str)) !== null && match === null) {
		if (!matches.length || !matches[0]) {
			continue;
		}

		const all = matches[0];
		const prefix = matches[1];
		const path = matches[2];
		const suffix = matches[3];

		const pathStartPosition = matches.index + prefix.length;
		const pathEndPosition = matches.index + all.length - suffix.length;

		// cursor position is out of partial path so there's no result
		if (position < pathStartPosition || pathEndPosition < position) {
			continue;
		}

		const localPosition = position - pathStartPosition;
		const selectedPath = urlSegmentUntilPosition(path, localPosition);

		if (!selectedPath || selectedPath.endsWith('/')) {
			continue;
		}

		match = selectedPath;
	}

	return match;
}
