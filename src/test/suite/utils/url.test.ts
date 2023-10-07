import * as assert from 'assert';
import { urlSegmentUntilPosition } from '../../../utils/url';

suite('urlSegmentUntilPosition', () => {
	test('should return null if null', () => {
		const output = urlSegmentUntilPosition();

		assert.strictEqual(output, null);
	});

	test('should return null if position is null', () => {
		const output = urlSegmentUntilPosition('foo/bar/buzz');

		assert.strictEqual(output, null);
	});

	test('should return null if position out of range', () => {
		const output = urlSegmentUntilPosition('foo', 4);

		assert.strictEqual(output, null);
	});

	test('should return foo', () => {
		const output = urlSegmentUntilPosition('foo', 0);

		assert.strictEqual(output, 'foo');
	});

	test('should return foo', () => {
		const output = urlSegmentUntilPosition('foo', 3);

		assert.strictEqual(output, 'foo');
	});

	test('should return foo', () => {
		const output = urlSegmentUntilPosition('foo/bar', 3);

		assert.strictEqual(output, 'foo');
	});

	test('should return foo/bar', () => {
		const output = urlSegmentUntilPosition('foo/bar', 4);

		assert.strictEqual(output, 'foo/bar');
	});

	test('should return foo/bar', () => {
		const output = urlSegmentUntilPosition('foo/bar/buzz', 4);

		assert.strictEqual(output, 'foo/bar');
	});

	test('should return foo/bar/buzz', () => {
		const output = urlSegmentUntilPosition('foo/bar/buzz', 8);

		assert.strictEqual(output, 'foo/bar/buzz');
	});
});
