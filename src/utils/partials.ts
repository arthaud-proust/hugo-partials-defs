import { urlSegmentUntilPosition } from './url';

export function partialPathFromDocumentLine(
	documentLine?: string,
	position?: number
): string | null {
	if (!documentLine || !position) {
		return null;
	}

	const PARTIAL_FILEEXT = '.html';

	const partialPrefix = `(partial ")`;
	const partialPath = `((?:\\w|\\/)+)`;
	const partialSuffix = `((?:\\${PARTIAL_FILEEXT})?")`;
	const partialRegexp = RegExp(partialPrefix + partialPath + partialSuffix, 'g');

	let match: string | null = null;
	let matches: RegExpExecArray | null = null;

	while ((matches = partialRegexp.exec(documentLine)) !== null && match === null) {
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

		if (path.endsWith('/')) {
			continue;
		}

		const pathWithExtension = path + PARTIAL_FILEEXT;
		const localPosition = position - pathStartPosition;
		const selectedPath = urlSegmentUntilPosition(pathWithExtension, localPosition);

		if (selectedPath?.endsWith(PARTIAL_FILEEXT)) {
			match = selectedPath;
		}
	}

	return match;
}
