/**
 * Throws an `Error`. If the input is already an `Error` instance it is thrown
 * as-is; if it is a string it is wrapped in a new `Error` with that string as
 * the message.
 *
 * The function is declared with a `never` return type so TypeScript understands
 * that control-flow never continues past a call site, enabling narrowing in
 * branches like `value ?? raise('value is required')`.
 *
 * @param input - A string message or an existing `Error` to throw.
 * @returns Never – the function always throws.
 *
 * @example
 * // Throw with a plain message
 * raise('something went wrong');
 *
 * @example
 * // Re-throw an existing error
 * try {
 *   riskyOperation();
 * } catch (err) {
 *   raise(err as Error);
 * }
 *
 * @example
 * // Use as an expression in a nullish-coalescing chain
 * const port = process.env['PORT'] ?? raise('PORT env variable is not set');
 *
 * @example
 * // Guard inside a function
 * function getUser(id: string): User {
 *   return userMap.get(id) ?? raise(`No user found for id "${id}"`);
 * }
 */
export const raise = (input: string | Error): never => {
  throw input instanceof Error ? input : new Error(input);
};
