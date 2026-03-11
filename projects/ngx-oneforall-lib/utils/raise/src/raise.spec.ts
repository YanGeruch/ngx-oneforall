import { raise } from './raise';

describe('raise', () => {
  it('should throw an Error when given a string', () => {
    expect(() => raise('something went wrong')).toThrow('something went wrong');
  });

  it('should throw an Error instance when given a string', () => {
    expect(() => raise('oops')).toThrow(Error);
  });

  it('should wrap the string as the error message', () => {
    let caught: unknown;
    try {
      raise('test message');
    } catch (err) {
      caught = err;
    }
    expect(caught).toBeInstanceOf(Error);
    expect((caught as Error).message).toBe('test message');
  });

  it('should throw the same Error instance when given an Error', () => {
    const err = new Error('original error');
    let caught: unknown;
    try {
      raise(err);
    } catch (e) {
      caught = e;
    }
    expect(caught).toBe(err);
  });

  it('should preserve the message of a passed Error', () => {
    const err = new Error('preserved message');
    let caught: unknown;
    try {
      raise(err);
    } catch (e) {
      caught = e;
    }
    expect((caught as Error).message).toBe('preserved message');
  });

  it('should preserve subclass Error instances', () => {
    const err = new TypeError('type error');
    let caught: unknown;
    try {
      raise(err);
    } catch (e) {
      caught = e;
    }
    expect(caught).toBeInstanceOf(TypeError);
    expect(caught).toBe(err);
  });
});
