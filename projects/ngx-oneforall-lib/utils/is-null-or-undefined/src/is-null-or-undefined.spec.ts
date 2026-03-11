import { isNullOrUndefined } from './is-null-or-undefined';

describe('isNullOrUndefined', () => {
  it('should return true for null', () => {
    expect(isNullOrUndefined(null)).toBe(true);
  });

  it('should return true for undefined', () => {
    expect(isNullOrUndefined(undefined)).toBe(true);
  });

  it('should return false for defined values', () => {
    expect(isNullOrUndefined(1)).toBe(false);
    expect(isNullOrUndefined('str')).toBe(false);
    expect(isNullOrUndefined({})).toBe(false);
    expect(isNullOrUndefined([])).toBe(false);
    expect(isNullOrUndefined(0)).toBe(false);
    expect(isNullOrUndefined(false)).toBe(false);
    expect(isNullOrUndefined('')).toBe(false);
  });
});
