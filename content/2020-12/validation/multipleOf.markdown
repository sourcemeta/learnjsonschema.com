---
keyword: "multipleOf"
signature: "Number"
summary: "A numeric instance is valid only if division by this keyword's value results in an integer."
kind: [ "assertion" ]
instance: [ "number" ]
specification: "https://json-schema.org/draft/2020-12/json-schema-validation.html#section-6.2.1"
metaschema: "https://json-schema.org/draft/2020-12/meta/validation"
default:
  value: 1
tests:
  - draft2020-12/multipleOf.json
index: -999
introduced_in: draft4
related:
  - vocabulary: validation
    keyword: exclusiveMaximum
  - vocabulary: validation
    keyword: exclusiveMinimum
  - vocabulary: validation
    keyword: maximum
  - vocabulary: validation
    keyword: minimum
---

The `multipleOf` keyword is used to specify that an instance must be a multiple of a given number. The value of this keyword must be strictly greater than zero.
* Applicable only to `number` and `integer` type.
* Validates if an instance is divisible by the specified number.
* Setting `multipleOf` to 0 is not valid.

## Examples

{{<schema `Schema with 'multipleOf' set to an integer`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "multipleOf": 5
}
{{</schema>}}

{{<instance-pass `A numeric instance that is a multiple of 5 is valid`>}}
10
{{</instance-pass>}}

{{<instance-fail `A numeric instance that is not a multiple of 5 is invalid.`>}}
8
{{</instance-fail>}}

{{<instance-pass `-15 is a multiple of 5`>}}
-15
{{</instance-pass>}}

{{<instance-pass `An instance with a string value is valid`>}}
"foo"
{{</instance-pass>}}
- `multipleOf` only affects numeric instances and has no effect on other types of instances.

{{<schema `Schema with 'multipleOf' set to a real number`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "number",
  "multipleOf": 4.1
}
{{</schema>}}

{{<instance-pass `A numeric instance that is a multiple of 4.1 is valid`>}}
8.2
{{</instance-pass>}}

{{<instance-fail `2 is not a multiple of 4.1`>}}
2
{{</instance-fail>}}

{{<instance-pass `0 is a multiple of 4.1`>}}
0
{{</instance-pass>}}

{{<instance-fail `An instance with a string value is invalid`>}}
"foo"
{{</instance-fail>}}
- `multipleOf` only affects numeric instances and has no effect on other types of instances. However, the above instance failed due to the `type` constraint.
