import * as assert from 'assert';
import { getPartialLocalPathFromStr } from '../../../utils/partialLocalPathFromStr';

suite('getPartialNameFromStr', () => {
	test('should return null when no string given', () => {
		const output = getPartialLocalPathFromStr();

		assert.strictEqual(output, null);
	});

	test('should return null when no position given', () => {
		const output = getPartialLocalPathFromStr('bob');

		assert.strictEqual(output, null);
	});

	test('should return null when no partial whatever position', () => {
		const output = getPartialLocalPathFromStr(`<h1>test</h1>`, 4);

		assert.strictEqual(output, null);
	});

	test('should return null when valid partial but position is not on partial', () => {
		const output = getPartialLocalPathFromStr(`{{ partial "item.html" }}`, 11);

		assert.strictEqual(output, null);
	});

	test('should return a result when basic partial and position is on the partial', () => {
		const output = getPartialLocalPathFromStr(`{{ partial "item.html" }}`, 12);

		assert.strictEqual(output, 'item');
	});

	test('should return a result when partial with dash and position is on the partial', () => {
		const output = getPartialLocalPathFromStr(`{{ partial "item-dash.html" }}`, 12);

		assert.strictEqual(output, 'item-dash');
	});

	test('should return null when trailing slash whatever position', () => {
		const output = getPartialLocalPathFromStr(`{{ partial "test/" }}`, 12);

		assert.strictEqual(output, null);
	});

	test('should return null when partial in folder and position is on folder', () => {
		const output = getPartialLocalPathFromStr(`{{ partial "func/getPerson" }}`, 12);

		assert.strictEqual(output, null);
	});

	test('should return a result when partial in folder and position is on the partial', () => {
		const output = getPartialLocalPathFromStr(`{{ partial "func/getPerson" }}`, 17);

		assert.strictEqual(output, 'func/getPerson');
	});

	test('should return a result when partial without extension and position is on the partial', () => {
		const output = getPartialLocalPathFromStr(`{{ partial "item" }}`, 12);

		assert.strictEqual(output, 'item');
	});

	test('should return a result when partial with context and position is on the partial`', () => {
		const output = getPartialLocalPathFromStr(`{{ partial "item.html" . }}`, 12);

		assert.strictEqual(output, 'item');
	});

	test('should return a result when partial and dict and position is on the partial', () => {
		const output = getPartialLocalPathFromStr(
			`{{ partial "item.html" (dict "e" "a") }}`,
			12
		);

		assert.strictEqual(output, 'item');
	});

	test('should return a result when text around partial and position is on the partial', () => {
		const output = getPartialLocalPathFromStr(`   <h1>{{ partial "item.html" }}`, 19);

		assert.strictEqual(output, 'item');
	});

	test('should return the partial where the position is when multiple partial in same line', () => {
		const output = getPartialLocalPathFromStr(
			`	<h1>{{ partial "person.html" }} {{ partial "item.html" }}</h1>`,
			47
		);

		assert.strictEqual(output, 'item');
	});
});
