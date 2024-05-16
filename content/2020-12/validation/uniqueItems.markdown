---
keyword: "uniqueItems"
signature: "Boolean"
value: This keyword must be set to a boolean value
summary: "If this keyword is set to the boolean value true, the instance validates successfully if all of its elements are unique."
kind: [ "assertion" ]
instance: [ "array" ]
specification: "https://json-schema.org/draft/2020-12/json-schema-validation.html#section-6.4.3"
metaschema: "https://json-schema.org/draft/2020-12/meta/validation"
default:
  value: false
tests:
  - draft2020-12/uniqueItems.json
introduced_in: draft2
related:
  - vocabulary: applicator
    keyword: prefixItems
  - vocabulary: applicator
    keyword: items
  - vocabulary: applicator
    keyword: contains
target_version: "mvp"
---

The `uniqueItems` keyword is used to ensure that all the items in an array are unique. This keyword is particularly useful when you need to enforce that an array contains no duplicate elements.
* This keyword, when set to true, specifies that all elements in an array must be unique.

## Examples

{{<schema `Schema with 'uniqueItems' property set to true`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "array",
  "uniqueItems": true
}
{{</schema>}}

{{<instance-pass `An array instance with unique elements is valid`>}}
[ 1, "hello", true ]
{{</instance-pass>}}

{{<instance-fail `An instance with duplicate elements is invalid`>}}
[ false, "world", 2, 2 ]
{{</instance-fail>}}

{{<instance-fail `An instance with duplicate complex structures (objects) is invalid`>}}
[ { "name": "John" }, false, "world", 2, { "name": "John" } ]
{{</instance-fail>}}
* Element uniqueness also deeply applies for complex structures like objects.

{{<schema `Schema without the 'uniqueItems' property or with 'uniqueItems' property set to false`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "array"
}
  // or
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "array",
  "uniqueItems": false
}
{{</schema>}}

{{<instance-pass `An array instance with unique elements is valid`>}}
[ 1, "hello", true ]
{{</instance-pass>}}

{{<instance-pass `An array instance with duplicate elements is also valid`>}}
[ false, "world", 2, 2 ]
{{</instance-pass>}}

* _`uniqueItems` can be used with other array keywords like `items` and `prefixItems` to add more constraints to the instance. See the example below._

{{<schema `Schema with 'uniqueItems' and 'items' keyword`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "array",
  "items": {
    "type": "object",
    "properties": {
      "id": { "type": "integer" },
      "name": { "type": "string" }
    },
    "required": [ "id", "name" ]
  },
  "uniqueItems": true
}
{{</schema>}}

{{<instance-pass `An array instance with unique objects is valid`>}}
[
  { "id": 1, "name": "John" },
  { "id": 2, "name": "Doe" }
]
{{</instance-pass>}}

{{<instance-fail `An instance with duplicate objects is invalid`>}}
[
  { "id": 1, "name": "Jane" },
  { "id": 1, "name": "Jane" }
]
{{</instance-fail>}}
