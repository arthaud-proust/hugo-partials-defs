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

	test('should return first segment with trailing slash when position at 0', () => {
		const forOneSegment = urlSegmentUntilPosition('foo', 0);
		assert.strictEqual(forOneSegment, 'foo');

		const forTwoSegments = urlSegmentUntilPosition('foo/bar', 0);
		assert.strictEqual(forTwoSegments, 'foo/');

		const forOneSegmentTrailing = urlSegmentUntilPosition('foo/', 0);
		assert.strictEqual(forOneSegmentTrailing, 'foo/');

		const forThreeSegments = urlSegmentUntilPosition('foo/bar/buzz', 0);
		assert.strictEqual(forThreeSegments, 'foo/');
	});

	test('should return first segment with trailing slash when position at end of first segment', () => {
		const forOneSegment = urlSegmentUntilPosition('foo', 3);
		assert.strictEqual(forOneSegment, 'foo');

		const forTwoSegments = urlSegmentUntilPosition('foo/bar', 3);
		assert.strictEqual(forTwoSegments, 'foo/');

		const forOneSegmentTrailing = urlSegmentUntilPosition('foo/', 3);
		assert.strictEqual(forOneSegmentTrailing, 'foo/');

		const forThreeSegments = urlSegmentUntilPosition('foo/bar/buzz', 3);
		assert.strictEqual(forThreeSegments, 'foo/');
	});

	test('should return first and second segment with trailing slash when position at start of second segment', () => {
		const forTwoSegments = urlSegmentUntilPosition('foo/bar', 4);
		assert.strictEqual(forTwoSegments, 'foo/bar');

		const forTwoSegmentsTrailing = urlSegmentUntilPosition('foo/bar/', 4);
		assert.strictEqual(forTwoSegmentsTrailing, 'foo/bar/');

		const forThreeSegments = urlSegmentUntilPosition('foo/bar/buzz', 4);
		assert.strictEqual(forThreeSegments, 'foo/bar/');
	});
});
