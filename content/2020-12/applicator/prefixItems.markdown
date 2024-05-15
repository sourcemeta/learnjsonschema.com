---
keyword: "prefixItems"
signature: "Array<Schema>"
value: This keyword must be set to a *non-empty* array, where each item is a valid JSON Schema
summary: "Validation succeeds if each element of the instance validates against the schema at the same position, if any."
kind: [ "applicator", "annotation" ]
instance: [ "array" ]
specification: "https://json-schema.org/draft/2020-12/json-schema-core.html#section-10.3.1.1"
metaschema: "https://json-schema.org/draft/2020-12/meta/applicator"
default:
  logical_value: "[]"
tests:
  - draft2020-12/prefixItems.json
introduced_in: 2020-12
annotation:
   description: The largest index to which this keyword applied its subschema, or a boolean true if it was applied to every item of the instance
   kind: [ "number", "boolean" ]
affects:
  - vocabulary: applicator
    keyword: items
related:
  - vocabulary: applicator
    keyword: items
  - vocabulary: validation
    keyword: minItems
  - vocabulary: validation
    keyword: maxItems
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
---

## Explanation

The `prefixItems` keyword is used to validate arrays by applying a schema to each corresponding index of the array. It differs from the `items` keyword in that it validates only a prefix of the array, up to the length of the `prefixItems` array. Each schema specified in `prefixItems` corresponds to an index in the input array.

* The annotation produced by this keyword affects the behavior of `items` and `unevaluatedItems`.
* `items` is used to validate all items in an array that are not covered by `prefixItems`, while `prefixItems` validates only a prefix of the array.
* `prefixItems` keyword does not constrain the length of the array. If the array is longer than this keyword's value, this keyword validates only the prefix of matching length.

{{<schema `Schema with 'prefixItems' keyword`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "array",
  "prefixItems": [ { "type": "number" } ]
}
{{</schema>}}

{{<instance-pass `An array instance with first item as numeric values is valid`>}}
[ 2, false ]
{{</instance-pass>}}

{{<instance-annotation>}}
[
  // ...
  {
    "valid": true,
    "keywordLocation": "/prefixItems",
    "instanceLocation": "",
    "annotation": 0
  },
  // ...
]
{{</instance-annotation>}}

{{<instance-fail `An array instance containing a string value is invalid`>}}
[ "2", 3 ]
{{</instance-fail>}}

{{<schema `Schema with 'prefixItems' keyword`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "array",
  "prefixItems": [
    { "type": "boolean" },
    { "type": "number" }
  ]
}
{{</schema>}}

{{<instance-pass `Items of the array instance adhering to the corresponding subschema in 'prefixItems' is valid`>}}
[ false, 35, [ "foo" ] ]
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
  // ...
]
{{</instance-annotation>}}

{{<schema `Schema with 'prefixItems' and 'items' keyword`>}}
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

{{<instance-fail `The prefix items of the array instance not adhering to the corresponding subschema in 'prefixItems' is invalid`>}}
[ 2, 3, "44", -5 ]
{{</instance-fail>}}
