---
keyword: "$id"
signature: "URI Reference"
summary: 'The "$id" keyword declares an identifier for the schema and establishes the base URI for resolving other URI references within the schema. The "$id" keyword is resolved against the base URI of the overall object.'
kind: ["identifier"]
instance: ["any"]
specification: "https://json-schema.org/draft/2020-12/json-schema-core.html#section-8.2.1"
metaschema: "https://json-schema.org/draft/2020-12/meta/core"
index: -999
introduced_in: draft6
related:
  - vocabulary: core
    keyword: $schema
  - vocabulary: core
    keyword: $vocabulary
---

## Examples

{{<schema "Declaring an Identifier for the Schema">}}
{
  "$id": "http://example.com/schemas/address.json",
  "type": "object",
  "properties": {
    "street_address": { "type": "string" },
    "city": { "type": "string" }
  }
}
{{</schema>}}
-  _The __$id__ keyword declares the identifier "http://example.com/schemas/address.json" for the schema. This identifier can be used to reference the schema from other parts of the document or external documents._


{{<schema "Establishing Base URI for Resolving References">}}
{
  "$id": "https://example.com/main-schema",
  "type": "object",
  "properties": {
    "name": {
      "type": "string"
    },
    "address": {
      "$ref": "#/$defs/address"
    }
  },
  "$defs": {
    "address": {
      "type": "object",
      "properties": {
        "street": {
          "type": "string"
        },
        "city": {
          "type": "string"
        }
      },
      "required": ["street", "city"]
    }
  }
}
{{</schema>}}
-  _The __$ref__ keyword is used to reference the nested schema within __$defs__ ("#/$defs/address"). The base URI for resolving this reference is established by the __$id__ of the main schema ("https://example.com/main-schema"). The reference is resolved against the base URI, resulting in the fully resolved URI "https://example.com/main-schema#/$defs/address" for the referenced schema._