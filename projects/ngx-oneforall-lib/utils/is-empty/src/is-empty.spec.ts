import { isEmpty } from './is-empty';

describe('isEmpty', () => {
  describe('null / undefined', () => {
    it('should return true for null', () => expect(isEmpty(null)).toBe(true));
    it('should return true for undefined', () => expect(isEmpty(undefined)).toBe(true));
  });

  describe('number', () => {
    it('should return true for NaN', () => expect(isEmpty(NaN)).toBe(true));
    it('should return false for 0', () => expect(isEmpty(0)).toBe(false));
    it('should return false for positive numbers', () => expect(isEmpty(42)).toBe(false));
    it('should return false for negative numbers', () => expect(isEmpty(-1)).toBe(false));
  });

  describe('string', () => {
    it('should return true for empty string', () => expect(isEmpty('')).toBe(true));
    it('should return false for non-empty string', () => expect(isEmpty('hello')).toBe(false));
    it('should return false for whitespace string', () => expect(isEmpty(' ')).toBe(false));
  });

  describe('array', () => {
    it('should return true for empty array', () => expect(isEmpty([])).toBe(true));
    it('should return false for non-empty array', () => expect(isEmpty([1, 2, 3])).toBe(false));
    it('should return false for array with falsy values', () =>
      expect(isEmpty([null, undefined, 0])).toBe(false));
  });

  describe('object', () => {
    it('should return true for empty object', () => expect(isEmpty({})).toBe(true));
    it('should return false for non-empty object', () => expect(isEmpty({ a: 1 })).toBe(false));
    it('should return false for object with undefined values', () =>
      expect(isEmpty({ a: undefined })).toBe(false));
  });

  describe('type narrowing', () => {
    it('narrows array to empty tuple', () => {
      const arr: string[] = [];
      if (isEmpty(arr)) {
        const _check: [] & string[] = arr;
        expect(_check).toEqual([]);
      }
    });

    it('narrows object to empty record', () => {
      const obj: Record<string, number> = {};
      if (isEmpty(obj)) {
        const _check: Record<PropertyKey, never> & Record<string, number> = obj;
        expect(_check).toEqual({});
      }
    });

    it('narrows string to empty string literal', () => {
      const s: string = '';
      if (isEmpty(s)) {
        const _check: '' = s;
        expect(_check).toBe('');
      }
    });

    it('narrows unknown to EmptyValue union', () => {
      const val: unknown = null;
      if (isEmpty(val)) {
        // val: EmptyValue (null | undefined | '' | [] | Record<PropertyKey, never>)
        expect(val).toBeNull();
      }
    });
  });

  describe('array filter usage', () => {
    it('filters empty arrays from a matrix', () => {
      const matrix: number[][] = [[], [1], [], [2, 3]];
      expect(matrix.filter(isEmpty)).toEqual([[], []]);
    });
  });
});
