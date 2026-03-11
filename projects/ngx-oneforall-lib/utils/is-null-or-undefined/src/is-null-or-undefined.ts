/**
 * Type guard that checks if a value is `null` or `undefined`.
 * Narrows the type to `null | undefined`.
 *
 * @param value - The value to check.
 * @returns `true` if value is `null` or `undefined`.
 *
 * @example
 * // Type narrowing
 * const value: string | null | undefined = getValue();
 * if (isNullOrUndefined(value)) {
 *   // TypeScript knows value is null | undefined here
 *   return defaultValue;
 * }
 * console.log(value.toUpperCase()); // TypeScript knows value is string
 *
 * @example
 * // Early return pattern
 * function process(input: string | null | undefined): string {
 *   if (isNullOrUndefined(input)) return '';
 *   return input.trim();
 * }
 *
 * @remarks
 * Uses loose equality (`== null`) which catches both `null` and `undefined`
 * in a single check. This is the inverse of `isPresent`.
 */
export function isNullOrUndefined<T>(
  value: T
): value is Extract<T, null | undefined> {
  return value == null;
}
