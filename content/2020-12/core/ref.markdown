---
keyword: "$ref"
signature: "URI Reference"
value: This keyword must be set to an absolute URI or a relative reference as defined by [RFC 3986](https://www.rfc-editor.org/info/rfc3986), where its fragment (if any) can consist of a JSON Pointer as defined by [RFC 6901](https://datatracker.ietf.org/doc/html/rfc6901)
summary: "This keyword is used to reference a statically identified schema."
kind: [ "applicator" ]
instance: [ "any" ]
specification: "https://json-schema.org/draft/2020-12/json-schema-core.html#section-8.2.3.1"
metaschema: "https://json-schema.org/draft/2020-12/meta/core"
tests:
  - draft2020-12/ref.json
  - draft2020-12/refRemote.json
  - draft2020-12/infinite-loop-detection.json
  - draft2020-12/optional/refOfUnknownKeyword.json
  - draft2020-12/optional/cross-draft.json
index: -99
introduced_in: draft3
changed_in:
  - draft6
  - 2019-09
interdependencies:
  - vocabulary: core
    keyword: $id
  - vocabulary: core
    keyword: $dynamicAnchor
  - vocabulary: core
    keyword: $anchor
related:
  - vocabulary: core
    keyword: $dynamicRef
  - vocabulary: core
    keyword: $defs
---

The `$ref` keyword is used to statically reference a schema. This is useful for avoiding code duplication and promoting modularity when describing complex data structures.

{{<common-pitfall>}} Because of how URI resolution works, a reference to an
absolute URI does not necessarily mean the reference points to a remote
resource. Conversely, a reference to a relative URI does not necessarily mean
the reference points to the current schema resource.

When encountering a reference, a JSON Schema implementation will first resolve
it into an absolute URI given the base URI of the schema. If the resulting
destination is present in the schema, it will be a local reference. Otherwise,
a remote reference.
{{</common-pitfall>}}

{{<learning-more>}} URIs play a central role in JSON Schema. Going through the
URI [RFC 3986](https://datatracker.ietf.org/doc/html/rfc3986) specification is a
must for gaining a deeper understanding of references, identifiers, and
anchors. More specifically, we recommend carefully studying [URI
resolution](https://datatracker.ietf.org/doc/html/rfc3986#section-5), URLs vs
URNs, and the difference between a URI and a URI Reference.

Additionally, a JSON Schema reference URI may contain a JSON Pointer. For this
reason, we recommend reading the JSON Pointer
[RFC 6901](https://www.rfc-editor.org/rfc/rfc6901) specification, primarily its
proposed [URI fragment identifier
representation](https://www.rfc-editor.org/rfc/rfc6901#section-6).
{{</learning-more>}}

## Examples

{{<schema `Schema with a relative reference` >}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://example.com/schemas/product.json",
  "type": "object",
  "properties": {
    "productId": { "type": "integer" },
    "name": { "$ref": "string" }
  },
  "required": [ "productId", "name" ],
  "$defs": {
    "string": {
      "$id": "string",
      "type": "string"
    }
  }
}
{{</schema>}}

{{<instance-pass `An instance including all the required properties is valid` >}}
{
  "productId": 123,
  "name": "Widget"
}
{{</instance-pass>}}

{{<instance-fail `An object instance with name property not set to string is invalid` >}}
{
  "productId": 217,
  "name": 999
}
{{</instance-fail>}}

{{<schema `Schema with an absolute reference to the previous schema` >}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://example.com/schemas/order.json",
  "type": "object",
  "properties": {
    "items": {
      "type": "array",
      "items": { "$ref": "schemas/product.json" }
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

{{<schema `Schema having an absolute reference with a JSON Pointer`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://example.com/schemas/product.json",
  "$ref": "https://example.com/schemas/product.json#/$defs/string",
  "$defs": {
    "string": { "type": "string" }
  }
}
{{</schema>}}

{{<instance-pass `An instance with a string value is valid`>}}
"John Doe"
{{</instance-pass>}}

{{<instance-fail `An instance with a boolean value is invalid`>}}
true
{{</instance-fail>}}

{{<schema `Schema having absolute reference with an anchor`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://example.com/schemas/product.json",
  "$ref": "https://example.com/schemas/product.json#string",
  "$defs": {
    "string": { "$anchor": "string", "type": "boolean" }
  }
}
{{</schema>}}

{{<instance-pass `An instance with a boolean value is valid`>}}
false
{{</instance-pass>}}

{{<instance-fail `An instance with a numeric value is invalid`>}}
99
{{</instance-fail>}}

{{<schema `Schema with a JSON Pointer`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://example.com",
  "type": "object",
  "properties": {
    "name": { "$ref": "#/$defs/string" }
  },
  "required": [ "name" ],
  "$defs": {
    "string": { "type": "string" }
  }
}
{{</schema>}}

{{<instance-pass `Instance including all the required properties is valid` >}}
{
  "name": "John Doe"
}
{{</instance-pass>}}

{{<instance-fail `Instance with name property set to boolean is invalid` >}}
{
  "name": true
}
{{</instance-fail>}}

{{<schema `Schema with an anchor`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://example.com",
  "type": "object",
  "properties": {
    "counter": { "$ref": "#counter" }
  },
  "required": [ "counter" ],
  "$defs": {
    "string": { "$anchor": "counter", "type": "number" }
  }
}
{{</schema>}}

{{<instance-pass `Instance including all the required properties is valid` >}}
{
  "counter": 51
}
{{</instance-pass>}}

{{<instance-fail `Instance with counter property set to string is invalid` >}}
{
  "counter": "59"
}
{{</instance-fail>}}

{{<schema `Schema with '$id' set to URN`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "urn:example:vehicle",
  "$ref": "urn:example:phone",
  "$defs": {
    "phone": {
      "$id": "urn:example:phone",
      "type": "number"
    }
  }
}
{{</schema>}}

{{<instance-pass `An instance with a numeric value is valid` >}}
7843559621
{{</instance-pass>}}

{{<instance-fail `An instance with a value other than a number is invalid` >}}
{
  "phone": 9866548907
}
{{</instance-fail>}}

