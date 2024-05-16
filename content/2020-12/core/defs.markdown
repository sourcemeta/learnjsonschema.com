---
keyword: "$defs"
signature: "Object<String, Schema>"
value: This keyword must be set to an object where each value is a valid JSON Schema
summary: "This keyword is used in meta-schemas to identify the required and optional vocabularies available for use in schemas described by that meta-schema."
kind: [ "location" ]
instance: [ "any" ]
specification: "https://json-schema.org/draft/2020-12/json-schema-core.html#section-8.2.4"
metaschema: "https://json-schema.org/draft/2020-12/meta/core"
default:
  value: "{}"
tests:
  - draft2020-12/defs.json
index: -9
introduced_in: 2019-09
related:
  - vocabulary: core
    keyword: $ref
  - vocabulary: core
    keyword: $dynamicRef
target_version: "mvp"
---

The `$defs` keyword provides a standardized way to define reusable subschemas within a single schema document, promoting modularity, reducing code duplication, and improving schema organization. Each subschema within `$defs` has a unique name, acting as a location for referencing, without directly affecting validation.

## Examples

{{<schema `Schema that describes the age of a person`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "object",
  "properties": {
    "age": {
      "$ref": "#/$defs/positiveInteger"
    }
  },
  "$defs": {
    "positiveInteger": {
      "type": "integer",
      "minimum": 0
    }
  }
}
{{</schema>}}

{{<instance-pass `The instance has a valid "age" property that meets the requirement specified in the "/$defs/positiveInteger" subschema`>}}
{ "age": 25 }
{{</instance-pass>}}

{{<instance-fail `A string is not an integer`>}}
{ "age": "some_string" }
{{</instance-fail>}}

{{<schema `Schema for product data`>}}
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

{{<instance-pass `The instance has a valid array of objects with product data as described in the "/$defs/product" subschema`>}}
[
  { "name": "T-shirt", "price": 19.99 },
  { "name": "Mug", "price": 8.50 }
]

{{</instance-pass>}}

{{<instance-fail `The array is empty, violating the "minItems" constraint requiring at least one product`>}}
[]
{{</instance-fail>}}

{{<schema `Schema for book details`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://example.com/books",
  "type": "object",
  "properties": {
    "title": { "type": "string" },
    "author": { "$ref": "#author" }
  },
  "required": [ "title", "author" ],
  "$defs": {
    "author": {
      "$anchor": "author",
      "type": "object",
      "properties": {
        "name": { "type": "string" },
        "age": { "type": "integer" }
      }
    }
  }
}
{{</schema>}}

{{<instance-pass `Instance with the required properties is valid`>}}
{
  "title": "Fundamental Physics",
  "author": {
    "name": "John Doe",
    "age": 55
  }
}
{{</instance-pass>}}

{{<instance-fail `'author' proeprty is required`>}}
{
  "title": "Fundamental Chemistry"
}
{{</instance-fail>}}

- _**Note**: JSON Pointer isn't the only way of accessing a subschema. You can also use the `$anchor` keyword to reference a subschema within `$defs`._
