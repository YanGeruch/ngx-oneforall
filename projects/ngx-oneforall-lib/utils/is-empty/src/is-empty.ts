/**
 * Union of all "empty" value types that can be expressed in the TypeScript type system.
 *
 * Covers: `null`, `undefined`, empty string `''`, empty tuple `[]`,
 * and an empty record `Record<PropertyKey, never>`.
 *
 * Note: `NaN` is intentionally excluded because TypeScript has no `NaN` literal type;
 * the runtime check is performed but the type system cannot narrow to it.
 */
export type EmptyValue = null | undefined | '' | [] | Record<PropertyKey, never>;

/**
 * Type guard that checks whether a value is "empty":
 * `null`, `undefined`, `NaN`, `''`, `[]`, or `{}`.
 *
 * Overloads narrow the result type to the most precise empty form
 * that still satisfies the original type constraint:
 *
 * | Input type             | Narrowed type                       |
 * |------------------------|-------------------------------------|
 * | `T[]`                  | `[] & T[]`  (empty tuple)           |
 * | `Record<K, V>` / `T`  | `Record<PropertyKey, never> & T`    |
 * | `string`               | `''`                                |
 * | `number`               | `number` (NaN has no literal type)  |
 * | `unknown`              | `EmptyValue`                        |
 *
 * @example
 * // Array
 * const arr: string[] = [];
 * if (isEmpty(arr)) { arr } // arr: [] & string[]
 *
 * @example
 * // Object
 * const obj: { a?: string } = {};
 * if (isEmpty(obj)) { obj } // obj: Record<PropertyKey, never> & { a?: string }
 *
 * @example
 * // String
 * const s: string = '';
 * if (isEmpty(s)) { s } // s: ''
 *
 * @example
 * // Falsy number (NaN)
 * if (isEmpty(NaN)) { ... } // true at runtime
 *
 * @example
 * // Unknown / combined guard
 * declare const val: unknown;
 * if (isEmpty(val)) { val } // val: EmptyValue
 *
 * @example
 * // Array filter
 * const matrix: number[][] = [[], [1], [], [2, 3]];
 * const empty = matrix.filter(isEmpty); // ([] & number[])[]
 */
export function isEmpty<T>(value: T[]): value is [] & T[];
export function isEmpty<T extends Record<PropertyKey, unknown>>(
  value: T,
): value is Record<PropertyKey, never> & T;
export function isEmpty(value: string): value is '';
export function isEmpty(value: number): value is number;
export function isEmpty(value: unknown): value is EmptyValue;
export function isEmpty(value: unknown): boolean {
  if (value == null) return true;
  if (typeof value === 'number') return Number.isNaN(value);
  if (typeof value === 'string') return value === '';
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === 'object') return Object.keys(value as object).length === 0;
  return false;
}
