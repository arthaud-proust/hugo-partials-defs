import config from '../extension.config.js';

export function message(content: string): string {
	return `${config.name}: ${content}`;
}
