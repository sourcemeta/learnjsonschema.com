---
keyword: "maxItems"
signature: "Integer"
summary: "An array instance is valid if its size is less than, or equal to, the value of this keyword."
kind: [ "assertion" ]
instance: [ "array" ]
specification: "https://json-schema.org/draft/2020-12/json-schema-validation.html#section-6.4.1"
metaschema: "https://json-schema.org/draft/2020-12/meta/validation"
index: -9
introduced_in: draft1
related:
  - vocabulary: applicator
    keyword: prefixItems
  - vocabulary: applicator
    keyword: items
  - vocabulary: validation
    keyword: minItems
  - vocabulary: applicator
    keyword: contains
---

The `maxItems` keyword is used to specify the maximum number of items allowed in an array. It can be used to define constraints on the size of an array within an array instance.
* Applies to arrays only.
* Value must be a non-negative integer.
* An array is valid if it has less than or equal to the specified number of elements.
* Omitting `maxItems` means the array has no upper limit (unbounded).

## Examples

{{<schema `Schema with 'maxItems' keyword`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "array",
  "maxItems": 3
}
{{</schema>}}

{{<instance-pass `An array instance with 3 or less elements is valid`>}}
[ 1, true, "hello" ]
{{</instance-pass>}}

{{<instance-fail `An array instance with more than 3 elements is invalid`>}}
[ 1, 2, "apple", "banana", true ]
{{</instance-fail>}}

{{<schema `Schema with 'maxItems' keyword`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "array",
  "maxItems": -4
}
// Value of 'maxItems' cannot be negative.
{{</schema>}}