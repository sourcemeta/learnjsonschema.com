---
keyword: "const"
signature: "Any"
value: This keyword must be set to a JSON value
summary: "Validation succeeds if the instance is equal to this keyword's value."
kind: [ "assertion" ]
instance: [ "any" ]
specification: "https://json-schema.org/draft/2020-12/json-schema-validation.html#section-6.1.3"
metaschema: "https://json-schema.org/draft/2020-12/meta/validation"
tests:
  - draft2020-12/const.json
index: -99997
introduced_in: draft6
related:
  - vocabulary: validation
    keyword: enum
  - vocabulary: validation
    keyword: type
---

The `const` keyword restricts an instance to a specific value. Its usage is functionally similar to an `enum` with a single value. Instances validate successfully only if their property value deeply matches the specified constant.

* Applies to various JSON data types, including numbers, strings, booleans, objects, and arrays.
* Takes precedence over other validation keywords like `type` and `enum`.

{{<best-practice>}}
It is best practice to avoid using the `type` keyword or any other validation keyword with `const`, as `const` takes precedence over them. Therefore, it is better not to use them together.
{{</best-practice>}}

## Examples

{{<schema `Schema with a specific string value`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "const": "hello"
}
{{</schema>}}

{{<instance-pass `An instance matching the const value is valid`>}}
"hello"
{{</instance-pass>}}

{{<instance-fail `An instance not matching the const value is invalid.`>}}
"world"
{{</instance-fail>}}

{{<schema `Schema with a specific number value`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "const": 3.14159
}
{{</schema>}}

{{<instance-pass `An instance matching the const value is valid`>}}
3.14159
{{</instance-pass>}}

{{<instance-fail `An instance not matching the const value is invalid.`>}}
"pi"
{{</instance-fail>}}

{{<schema `Schema with a fixed object structure`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "const": { "name": "John Doe", "age": 30 }
}
{{</schema>}}

{{<instance-fail `An empty object is invalid`>}}
{}
{{</instance-fail>}}

{{<instance-pass `An instance matching the exact object structure is valid`>}}
 { "name": "John Doe", "age": 30 }
{{</instance-pass>}}

{{<instance-fail `An instance not matching the exact object structure is invalid`>}}
 { "name": "Robert", "age": 30 }
{{</instance-fail>}}
