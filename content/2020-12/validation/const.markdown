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

The `const` keyword (short for "constant") restricts instances to a single
specific JSON value of any type.

{{<best-practice>}} Constraining instances to a constant value by definition
implies the given JSON type. Therefore, combining this keyword with the
[`type`](../type) keyword is redundant, and considered an
anti-pattern.{{</best-practice>}}

## Examples

{{<schema `A schema that constrains instances to a string constant value`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "const": "Hello"
}
{{</schema>}}

{{<instance-pass `The desired string value is valid`>}}
"Hello"
{{</instance-pass>}}

{{<instance-fail `Any other string value is invalid`>}}
"World"
{{</instance-fail>}}

{{<instance-fail `Any other non-string value is invalid`>}}
1234
{{</instance-fail>}}

{{<schema `A schema that constrains instances to a complex object value`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "const": { "name": "John Doe", "age": 30 }
}
{{</schema>}}

{{<instance-pass `The object instance that equals the desired value is valid`>}}
{ "name": "John Doe", "age": 30 }
{{</instance-pass>}}

{{<instance-fail `Any other object value is invalid`>}}
{ "name": "Jane Doe", "age": 30 }
{{</instance-fail>}}

{{<instance-fail `Any other non-object value is invalid`>}}
30
{{</instance-fail>}}
