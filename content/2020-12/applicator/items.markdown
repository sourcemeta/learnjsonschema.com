---
keyword: "items"
signature: "Schema"
value: This keyword must be set to a valid JSON Schema
summary: "Validation succeeds if each element of the instance not covered by [`prefixItems`](/2020-12/applicator/prefixItems) validates against this schema."
kind: [ "applicator", "annotation" ]
instance: [ "array" ]
specification: "https://json-schema.org/draft/2020-12/json-schema-core.html#section-10.3.1.2"
metaschema: "https://json-schema.org/draft/2020-12/meta/applicator"
default:
  value: "{}"
tests:
  - draft2020-12/items.json
introduced_in: draft1
annotation:
   description: A boolean true if it applied to any item of the instance
   kind: [ "boolean" ]
interdependencies:
  - vocabulary: applicator
    keyword: prefixItems
  - vocabulary: validation
    keyword: minItems
  - vocabulary: validation
    keyword: maxItems
affects:
  - vocabulary: unevaluated
    keyword: unevaluatedItems
related:
  - vocabulary: applicator
    keyword: contains
  - vocabulary: validation
    keyword: minContains
  - vocabulary: validation
    keyword: maxContains
  - vocabulary: validation
    keyword: uniqueItems
  - vocabulary: unevaluated
    keyword: unevaluatedItems
target_version: "mvp"
---

## Explanation

The `items` keyword is used to validate arrays of arbitrary length where each item in the array matches the same schema. It applies its subschema to all instance items at indexes greater than the length of the `prefixItems` array in the same schema, or to all instance array elements if `prefixItems` is not present. This means that the subschema specified under `items` will be used to validate every item in the array that isn't covered by `prefixItems`.

If the `items` subschema is applied to any positions within the instance array, it produces an annotation result of boolean *true*, indicating that all remaining array elements have been evaluated against this keyword's subschema. This annotation affects the behavior of `unevaluatedItems` in the *Unevaluated* vocabulary.

* `prefixItems` allows defining a fixed-length sequence of schemas for an array's initial items.
* `items` applies its sub-schema to all elements after the `prefixItems` sequence (if present).
* Analogous to `additionalProperties` for objects, `items` specifies a schema that each item in the array must adhere to. If an array has additional items beyond what's defined in `prefixItems`, they must conform to the schema specified under `items`.

## Examples

{{<schema `Schema with 'items' keyword`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "array",
  "items": { "type": "number" }
}
{{</schema>}}

{{<instance-pass `An array instance with all items as numeric values is valid`>}}
[ 2, 3, 44, -5 ]
{{</instance-pass>}}

{{<instance-annotation>}}
[
  // ...
  {
    "valid": true,
    "keywordLocation": "/items",
    "instanceLocation": "",
    "annotation": true
  },
  // ...
]
{{</instance-annotation>}}

{{<instance-fail `An array instance containing a string value is invalid`>}}
[ 2, 3, "44", -5 ]
{{</instance-fail>}}

{{<schema `Schema with 'items' set to boolean true`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "array",
  "items": true
}
{{</schema>}}

{{<instance-pass `An array instance with all items as numeric values is valid`>}}
[ 2, 3, 44, -5 ]
{{</instance-pass>}}

{{<instance-pass `An array instance containing a string value is also valid`>}}
[ 2, 3, "44", -5 ]
{{</instance-pass>}}

{{<instance-annotation>}}
[
  // ...
  {
    "valid": true,
    "keywordLocation": "/items",
    "instanceLocation": "",
    "annotation": true
  },
  // ...
]
{{</instance-annotation>}}
* _Similarly, if the `items` is set to false, all the array instances will fail validation._

{{<schema `Schema with 'items' and 'prefixItems' keyword`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "array",
  "prefixItems": [
    { "type": "boolean" },
    { "type": "string" }
  ],
  "items": { "type": "number" }
}
{{</schema>}}

{{<instance-pass `An array instance adhering to the schema is valid`>}}
[ false, "44", -5 ]
{{</instance-pass>}}

{{<instance-annotation>}}
[
  // ...
  {
    "valid": true,
    "keywordLocation": "/prefixItems",
    "instanceLocation": "",
    "annotation": 1
  },
  {
    "valid": true,
    "keywordLocation": "/items",
    "instanceLocation": "",
    "annotation": true
  },
  // ...
]
{{</instance-annotation>}}

{{<instance-fail `The prefix items of the array instance must adhere to the subschemas in 'prefixItems' at their respective indexes`>}}
[ 2, 3, "44", -5 ]
{{</instance-fail>}}
