---
keyword: "$defs"
signature: "Object<String, Schema>"
value: This keyword must be set to an object where each value is a valid JSON Schema
summary: "This keyword reserves a location for schema authors to inline re-usable JSON Schemas into a more general schema."
kind: [ "location" ]
instance: [ "any" ]
specification: "https://json-schema.org/draft/2019-09/draft-handrews-json-schema-02#rfc.section.8.2.5"
metaschema: "https://json-schema.org/draft/2019-09/meta/core"
default:
  value: "{}"
tests:
  - draft2019-09/defs.json
index: -9
introduced_in: 2019-09
related:
  - vocabulary: core
    keyword: $ref
  - vocabulary: core
    keyword: $recursiveRef
---
