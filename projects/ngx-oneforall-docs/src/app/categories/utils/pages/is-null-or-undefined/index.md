![Bundle Size](https://deno.bundlejs.com/badge?q=ngx-oneforall/utils/is-null-or-undefined&treeshake=[*]&config={"esbuild":{"external":["rxjs","@angular/core","@angular/common","@angular/forms","@angular/router"]}})

Type guard utility that checks if a value is `null` or `undefined`. Narrows the type to `null | undefined`. This is the inverse of `isPresent`.

## Usage

```typescript
import { isNullOrUndefined } from 'ngx-oneforall/utils/is-null-or-undefined';
```

## API

`isNullOrUndefined<T>(value: T): value is Extract<T, null | undefined>`

Returns `true` if value is `null` or `undefined`.

| Input | Result |
|-------|--------|
| `null` | ✅ `true` |
| `undefined` | ✅ `true` |
| `'hello'` | ❌ `false` |
| `0` | ❌ `false` |
| `false` | ❌ `false` |
| `''` | ❌ `false` |

> **Note**
> Falsy values like `0`, `false`, and `''` are NOT considered nullish — only `null` and `undefined` are.

## Example: Early Return Pattern

```typescript
function process(input: string | null | undefined): string {
  if (isNullOrUndefined(input)) return '';
  return input.trim(); // TypeScript knows input is string here
}
```

## Example: Type Narrowing

```typescript
const value: string | null | undefined = getValue();

if (isNullOrUndefined(value)) {
  // TypeScript knows value is null | undefined
  console.log('No value provided');
} else {
  console.log(value.toUpperCase()); // TypeScript knows value is string
}
```

## Example: Conditional Assignment

```typescript
const items: (string | null | undefined)[] = ['a', null, 'b', undefined, 'c'];
const nullishCount = items.filter(isNullOrUndefined).length; // 2
```

## Also available via find-type

`isNullOrUndefined` is also re-exported from `find-type` for convenience:

```typescript
import { isNullOrUndefined } from 'ngx-oneforall/utils/find-type';
```

## Use Cases

- **Early returns**: Guard against nullish values at function boundaries
- **Type narrowing**: Let TypeScript know a value is null or undefined
- **Conditional logic**: Branch on the absence of a value
- **Inverse of `isPresent`**: Use when you want to handle the nullish case explicitly
