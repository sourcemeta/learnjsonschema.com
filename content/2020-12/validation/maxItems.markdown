---
keyword: "maxItems"
signature: "Integer"
value: This keyword must be set to a zero or positive integer
summary: "An array instance is valid if its size is less than, or equal to, the value of this keyword."
kind: [ "assertion" ]
instance: [ "array" ]
specification: "https://json-schema.org/draft/2020-12/json-schema-validation.html#section-6.4.1"
metaschema: "https://json-schema.org/draft/2020-12/meta/validation"
tests:
  - draft2020-12/maxItems.json
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
target_version: "mvp"
---

The `maxItems` keyword is used to specify the maximum number of items allowed in an array. It can be used to define constraints on the size of an array within an array instance.
* An array is valid if it has less than or equal to the specified number of elements.
* Omitting `maxItems` means the array has no upper limit (unbounded).

{{<alert>}}
_**Note:** `items`, `prefixItems`, and `contains` do not affect `minItems`. The instance independently evaluated against `minItems` (if present)._
{{</alert>}}

## Examples

{{<schema `Schema with 'maxItems' keyword`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "array",
  "maxItems": 3
}
{{</schema>}}

{{<instance-pass `An array instance with 3 or less items is valid`>}}
[ 1, true, "hello" ]
{{</instance-pass>}}

{{<instance-fail `An array instance with more than 3 items is invalid`>}}
[ 1, 2, "apple", "banana", true ]
{{</instance-fail>}}

{{<schema `Schema with the 'maxItems' and 'items' keywords`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "array",
  "items": { "type": "boolean" },
  "maxItems": 2
}
{{</schema>}}

{{<instance-pass `An array instance containing 2 or less items, which conform to the 'items' subschema, is valid`>}}
[ false ]
{{</instance-pass>}}

{{<instance-fail `An array instance with more than 2 elements is invalid`>}}
[ false, false, true ]
{{</instance-fail>}}

{{<schema `Schema with the 'maxItems', 'prefixItems' and 'contains' keywords`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "array",
  "prefixItems": [
    { "type": "number" },
    { "type": "string" }
  ],
  "contains": { "type": "boolean" },
  "maxItems": 3
}
{{</schema>}}

{{<instance-pass `An array instance containing 3 or less items, which successfully validates against 'prefixItems' and 'contains', is valid`>}}
[ 1, "John", false ]
{{</instance-pass>}}

{{<instance-fail `An array instance with more than 3 elements is invalid`>}}
[ 1, "John", "Doe", false ]
{{</instance-fail>}}

{{<instance-fail `First and second items should be number and string respectively`>}}
[ "John", 1, false ]
{{</instance-fail>}}
