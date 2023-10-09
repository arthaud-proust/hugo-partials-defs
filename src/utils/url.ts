export function urlSegmentUntilPosition(url?: string, position?: number): string | null {
	if (url === undefined || position === undefined || url.length < position) {
		return null;
	}

	let output = '';

	for (let i = 0, iMax = url.length; i < iMax; i++) {
		output += url[i];

		if (url[i] === '/' && position - 1 < i) {
			break;
		}
	}

	return output;
}
