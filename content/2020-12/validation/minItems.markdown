---
keyword: "minItems"
signature: "Integer"
value: This keyword must be set to a zero or positive integer
summary: "An array instance is valid if its size is greater than, or equal to, the value of this keyword."
kind: [ "assertion" ]
instance: [ "array" ]
specification: "https://json-schema.org/draft/2020-12/json-schema-validation.html#section-6.4.2"
metaschema: "https://json-schema.org/draft/2020-12/meta/validation"
default:
  value: 0
tests:
  - draft2020-12/minItems.json
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
target_version: "mvp"
---

The `minItems` keyword specifies the minimum number of items that must be present in an array. It can be used to define constraints on the size of an array, ensuring that it contains at least a certain number of elements.
* An array is valid if it has at least the specified number of elements.

{{<alert>}}
_**Note:** `items`, `prefixItems`, and `contains` do not affect `minItems`. The instance independently evaluated against `minItems` (if present)._
{{</alert>}}

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

{{<schema `Schema with the 'minItems' and 'items' keywords`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "array",
  "items": { "type": "boolean" },
  "minItems": 2
}
{{</schema>}}

{{<instance-pass `An array instance containing 2 or more items, which conform to the 'items' subschema, is valid`>}}
[ false, false, true ]
{{</instance-pass>}}

{{<instance-fail `An array instance with less than 2 elements is invalid`>}}
[ false ]
{{</instance-fail>}}

{{<schema `Schema with the 'minItems', 'prefixItems' and 'contains' keywords`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "array",
  "prefixItems": [
    { "type": "number" },
    { "type": "string" }
  ],
  "contains": { "type": "boolean" },
  "minItems": 3
}
{{</schema>}}

{{<instance-pass `An array instance containing 3 or more items, which successfully validates against 'prefixItems' and 'contains', is valid`>}}
[ 1, "John", false ]
{{</instance-pass>}}

{{<instance-fail `An array instance with less than 3 elements is invalid`>}}
[ 1, "John" ]
{{</instance-fail>}}

{{<instance-fail `First and second items should be number and string respectively`>}}
[ "John", 1, false ]
{{</instance-fail>}}
