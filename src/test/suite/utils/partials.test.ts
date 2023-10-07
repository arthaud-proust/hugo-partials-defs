import * as assert from 'assert';
import { partialPathFromDocumentLine } from '../../../utils/partials';

suite('partialPathFromDocumentLine', () => {
	test('should return null when null', () => {
		const output = partialPathFromDocumentLine();

		assert.strictEqual(output, null);
	});

	test('should return null when position', () => {
		const output = partialPathFromDocumentLine('bob');

		assert.strictEqual(output, null);
	});

	test('should return null from `{{ partial "item.html" }}` when position at 11', () => {
		const output = partialPathFromDocumentLine(`{{ partial "item.html" }}`, 11);

		assert.strictEqual(output, null);
	});

	test('should return "item.html" from `{{ partial "item.html" }}` when position at 12', () => {
		const output = partialPathFromDocumentLine(`{{ partial "item.html" }}`, 12);

		assert.strictEqual(output, 'item.html');
	});

	test('should return null from `{{ partial "test/" }}` when position at 12', () => {
		const output = partialPathFromDocumentLine(`{{ partial "test/" }}`, 12);

		assert.strictEqual(output, null);
	});

	test('should return null from `{{ partial "func/getPerson" }}` when position at 12', () => {
		const output = partialPathFromDocumentLine(`{{ partial "func/getPerson" }}`, 12);

		assert.strictEqual(output, null);
	});

	test('should return "func/getPerson.html" from `{{ partial "func/getPerson" }}` when position at 17', () => {
		const output = partialPathFromDocumentLine(`{{ partial "func/getPerson" }}`, 17);

		assert.strictEqual(output, 'func/getPerson.html');
	});

	test('should return "item.html" from `{{ partial "item" }}` when position at 12', () => {
		const output = partialPathFromDocumentLine(`{{ partial "item" }}`, 12);

		assert.strictEqual(output, 'item.html');
	});

	test('should return "item.html" from `{{ partial "item.html" . }} when position at 12`', () => {
		const output = partialPathFromDocumentLine(`{{ partial "item.html" . }}`, 12);

		assert.strictEqual(output, 'item.html');
	});

	test('should return "item.html" from `{{ partial "item.html" (dict "e" "a") }}` when position at 12', () => {
		const output = partialPathFromDocumentLine(
			`{{ partial "item.html" (dict "e" "a") }}`,
			12
		);

		assert.strictEqual(output, 'item.html');
	});

	test('should return "item.html" from `   <h1>{{ partial "item.html" }}` when position at 19', () => {
		const output = partialPathFromDocumentLine(`   <h1>{{ partial "item.html" }}`, 19);

		assert.strictEqual(output, 'item.html');
	});

	test('should return "item.html" from `	<h1>{{ partial "person.html" }} {{ partial "item.html" }}</h1>` when position at 47', () => {
		const output = partialPathFromDocumentLine(
			`	<h1>{{ partial "person.html" }} {{ partial "item.html" }}</h1>`,
			47
		);

		assert.strictEqual(output, 'item.html');
	});

	test('should return null from `<h1>test</h1>` when position at 4', () => {
		const output = partialPathFromDocumentLine(`<h1>test</h1>`, 4);

		assert.strictEqual(output, null);
	});
});
