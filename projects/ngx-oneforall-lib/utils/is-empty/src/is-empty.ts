/**
 * Maps a type to its "empty" counterpart, distributed over union members.
 *
 * Each union member is mapped individually:
 *
 * | Member type            | Empty form                          |
 * |------------------------|-------------------------------------|
 * | `T[]`                  | `[] & T[]`  (empty tuple)           |
 * | `Record<K, V>` / `T`  | `Record<PropertyKey, never> & T`    |
 * | `string`               | `''`                                |
 * | `number`               | `number` (NaN has no literal type)  |
 * | `bigint`               | `0n`                                |
 * | `null`                 | `null`                              |
 * | `undefined`            | `undefined`                         |
 * | `unknown` / other      | `EmptyValue`                        |
 *
 * Because this is a distributive conditional type, unions are mapped member-by-member:
 * `EmptyForm<string[] | null>` → `([] & string[]) | null`
 */
// prettier-ignore
export type EmptyForm<T> =
  T extends unknown[]                    ? [] & T :
  T extends Record<PropertyKey, unknown> ? Record<PropertyKey, never> & T :
  T extends string                       ? '' :
  T extends number                       ? number :
  T extends bigint                       ? 0n :
  T extends null                         ? null :
  T extends undefined                    ? undefined :
  EmptyValue;

/**
 * Union of all "empty" value types expressible in the TypeScript type system.
 * Used as the fallback for `EmptyForm<unknown>` and as a convenience type.
 *
 * Note: `NaN` is excluded because TypeScript has no `NaN` literal type.
 */
export type EmptyValue = null | undefined | '' | 0n | [] | Record<PropertyKey, never>;

/**
 * Type guard that checks whether a value is "empty":
 * `null`, `undefined`, `NaN`, `''`, `[]`, or `{}`.
 *
 * The return type is `EmptyForm<T>`, a distributive conditional type that maps
 * each union member of `T` to its most precise empty form. Union input types
 * produce union narrowed types instead of widening to the full `EmptyValue`:
 *
 * ```ts
 * declare const val: string[] | null;
 * if (isEmpty(val)) { val } // val: ([] & string[]) | null
 * ```
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
 * // Union — each member mapped independently
 * declare const val: string[] | null | undefined;
 * if (isEmpty(val)) { val } // val: ([] & string[]) | null | undefined
 *
 * @example
 * // Array filter
 * const matrix: number[][] = [[], [1], [], [2, 3]];
 * const empty = matrix.filter(isEmpty); // ([] & number[])[]
 */
export function isEmpty<T>(value: T): value is EmptyForm<T>;
export function isEmpty(value: unknown): boolean {
  if (value == null) return true;
  if (typeof value === 'number') return Number.isNaN(value);
  if (typeof value === 'bigint') return value === 0n;
  if (typeof value === 'string') return value === '';
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === 'object') return Object.keys(value as object).length === 0;
  return false;
}
