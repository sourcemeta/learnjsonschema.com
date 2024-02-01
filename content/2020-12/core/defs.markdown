---
keyword: "$defs"
signature: "Object<String, Schema>"
summary: "`$defs` in JSON Schema provides a standardized way to define reusable subschemas within a single schema document, promoting modularity, reducing code duplication, and improving schema organization. Each subschema within `$defs` has a unique name, acting as a pointer for referencing, without directly affecting validation; its value must be a valid JSON Schema."
kind: [ "location" ]
instance: [ "any" ]
specification: "https://json-schema.org/draft/2020-12/json-schema-core.html#section-8.2.4"
metaschema: "https://json-schema.org/draft/2020-12/meta/core"
index: -9
introduced_in: 2019-09
related:
  - vocabulary: core
    keyword: $ref
  - vocabulary: core
    keyword: $dynamicRef
---

## Examples

{{<schema `Schema that describes the age of a person`>}}
{
  "type": "object",
  "properties": {
    "age": {
      "$ref": "#/$defs/positiveInteger"
    }
  },
  "$defs": {
    "positiveInteger": {
      "type": "integer",
      "minimum": 1
    }
  }
}
{{</schema>}}

{{<instance-pass `The instance has a valid "name" property that meets the requirement specified in the "$def" subschema`>}}
{ "age": 25 }
{{</instance-pass>}}

{{<instance-fail `The value "0" is an integer, but it's not greater than or equal to 1, violating the "minimum" constraint of the "positiveInteger" subschema`>}}
{ "age": 0 }

{{</instance-fail>}}

{{<schema `Schema for Product Data`>}}
{
  "type": "array",
  "minItems": 1,
  "items": { "$ref": "#/$defs/product" },
    "$defs": {
    "product": {
      "type": "object",
      "properties": {
        "name": { "type": "string" },
        "price": { "type": "number", "minimum": 0 }
      }
    }
  }
}
{{</schema>}}

{{<instance-pass `The instance has a valid array of objects with product data as described in the "$def" subschema`>}}
[
  { "name": "T-shirt", "price": 19.99 },
  { "name": "Mug", "price": 8.50 }
]

{{</instance-pass>}}

{{<instance-fail `The array is empty, violating the "minItems" constraint requiring at least one product`>}}
[]
{{</instance-fail>}}