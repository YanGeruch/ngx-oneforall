![Bundle Size](https://deno.bundlejs.com/badge?q=ngx-oneforall/utils/is-empty&treeshake=[*]&config={"esbuild":{"external":["rxjs","@angular/core","@angular/common","@angular/forms","@angular/router"]}})

Type guard utility that checks if a value is "empty": `null`, `undefined`, `NaN`, an empty string, an empty array, or an object with no keys. When it returns `true`, TypeScript narrows the type to the appropriate empty form.

## Usage

```typescript
import { isEmpty } from 'ngx-oneforall/utils/is-empty';
```

## API

`isEmpty<T>(value: T): value is EmptyForm<T>`

Returns `true` if the value is empty. TypeScript narrows the type based on what was passed in.

| Input | Result | Narrowed type |
|-------|--------|---------------|
| `null` | ✅ `true` | `null` |
| `undefined` | ✅ `true` | `undefined` |
| `NaN` | ✅ `true` | `number` (no literal for NaN) |
| `''` | ✅ `true` | `''` |
| `[]` | ✅ `true` | `[]` |
| `{}` | ✅ `true` | `{}` |
| `'hello'` | ❌ `false` | — |
| `[1, 2]` | ❌ `false` | — |
| `{ a: 1 }` | ❌ `false` | — |
| `0` | ❌ `false` | — |
| `false` | ❌ `false` | — |

> **Note**
> Falsy values like `0` and `false` are **not** considered empty — only values that carry no meaningful content are.

## Example: Type Narrowing

```typescript
const value: string | null | undefined = getValue();

if (isEmpty(value)) {
  // TypeScript knows value is '' | null | undefined here
} else {
  console.log(value.toUpperCase()); // TypeScript knows value is a non-empty string
}
```

## Example: Array Filtering

```typescript
const matrix: string[][] = [['a'], [], ['b', 'c'], []];
const empties = matrix.filter(isEmpty);
// empties: [][]  — only the empty arrays
```

## Example: Union Types

```typescript
declare const val: string[] | null | undefined;

if (isEmpty(val)) {
  val; // [] | null | undefined
} else {
  val; // string[] (non-empty)
}
```

## Example: Object Check

```typescript
const config: Record<string, string> = {};

if (isEmpty(config)) {
  console.log('No configuration provided');
}
```

## Use Cases

- **Guard clauses**: Skip processing when a value carries no content
- **Array cleanup**: Filter out empty arrays from a collection
- **Form validation**: Detect fields that have been cleared
- **API responses**: Handle empty objects or arrays returned from a server
