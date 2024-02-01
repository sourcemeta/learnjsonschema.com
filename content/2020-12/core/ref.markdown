---
keyword: "$ref"
signature: "URI Reference"
summary: "The `$ref` keyword is used to reference a statically identified schema. This is useful for avoiding code duplication and promoting modularity when describing complex data structures. The value of `$ref` can be either:  ___Relative___, i.e., using JSON pointers starting with ___\"#/\"___ to reference other components within the same schema document, or ___Absolute___, i.e., a full URI pointing to an external schema definition."
kind: [ "applicator" ]
instance: [ "any" ]
specification: "https://json-schema.org/draft/2020-12/json-schema-core.html#section-8.2.3.1"
metaschema: "https://json-schema.org/draft/2020-12/meta/core"
index: -99
introduced_in: draft3
interdependencies:
  - vocabulary: core
    keyword: $dynamicAnchor
  - vocabulary: core
    keyword: $anchor
related:
  - vocabulary: core
    keyword: $id
  - vocabulary: core
    keyword: $dynamicRef
  - vocabulary: core
    keyword: $defs
---

## Examples

{{<schema `Using a relative reference:` >}}
{
  "$id": "http://example.com/schemas/product.json",
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "required": [
    "productId",
    "name"
  ],
  "properties": {
    "productId": {
      "type": "integer"
    },
    "name": {
      "$ref": "#/$defs/string"
    }
  },
  "$defs": {
    "string": {
      "type": "string"
    }
  }
}
{{</schema>}}

{{<instance-pass `Instance including all the required properties is valid` >}}
{
  "productId": 123,
  "name": "Widget"
}
{{</instance-pass>}}

{{<instance-fail `Instance missing the required properties is invalid` >}}
{
  "name": "Gadget"
}
{{</instance-fail>}}


{{<schema `Using an absolute referece:` >}}
{
  "$id": "http://example.com/schemas/order.json",
  "type": "object",
  "properties": {
    "items": {
      "type": "array",
      "items": { "$ref": "http://example.com/schemas/product.json" }
    }
  }
}
{{</schema>}}

{{<instance-pass `Each item in the "items" array includes both the "productId" and "name" properties required by the referenced product schema` >}}
{
  "items": [
    { "productId": 123, "name": "Widget" },
    { "productId": 456, "name": "Gadget" }
  ]
}
// Assuming http://example.com/schemas/product.json defines the product schema

{{</instance-pass>}}

{{<instance-fail `The first item is missing the "productId" property and the second item is missing the "name" property required by the product schema.` >}}
{
  "items": [
    { "name": "Widget" },
    { "productId": 456 }
  ]
}

{{</instance-fail>}}
