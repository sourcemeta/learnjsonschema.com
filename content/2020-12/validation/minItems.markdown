---
keyword: "minItems"
signature: "Integer"
summary: "An array instance is valid if its size is greater than, or equal to, the value of this keyword."
kind: [ "assertion" ]
instance: [ "array" ]
specification: "https://json-schema.org/draft/2020-12/json-schema-validation.html#section-6.4.2"
metaschema: "https://json-schema.org/draft/2020-12/meta/validation"
index: -9
introduced_in: draft1
related:
  - vocabulary: applicator
    keyword: prefixItems
  - vocabulary: applicator
    keyword: items
  - vocabulary: validation
    keyword: maxItems
  - vocabulary: applicator
    keyword: contains
---

The `minItems` keyword specifies the minimum number of items that must be present in an array. It can be used to define constraints on the size of an array, ensuring that it contains at least a certain number of elements.
* Applies to arrays only.
* Value must be a non-negative integer.
* An array is valid if it has at least the specified number of elements.
* Omitting `minItems` keyword has the same behavior as a value of 0.

## Examples

{{<schema `Schema with 'minItems' keyword`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "array",
  "minItems": 3
}
{{</schema>}}

{{<instance-pass `An array instance with 3 or more elements is valid`>}}
[ 1, true, "hello" ]
{{</instance-pass>}}

{{<instance-fail `An array instance with less than 3 elements is invalid`>}}
[ 1, "apple" ]
{{</instance-fail>}}

{{<schema `Schema with 'minItems' keyword`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "array",
  "minItems": -2
}
// Value of 'minItems' cannot be negative.
{{</schema>}}