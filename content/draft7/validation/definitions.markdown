---
keyword: "definitions"
signature: "Object<String, Schema>"
value: This keyword must be set to an object where each value is a valid JSON Schema
summary: "This keyword reserves a location for schema authors to inline re-usable JSON Schemas into a more general schema."
kind: [ "location" ]
instance: [ "any" ]
specification: "https://json-schema.org/draft-07/draft-handrews-json-schema-validation-01#rfc.section.9"
metaschema: "http://json-schema.org/draft-07/schema#"
default:
  value: "{}"
index: 999
tests:
  - draft7/definitions.json
introduced_in: draft4
changed_in:
  - 2019-09
related:
  - vocabulary: core
    keyword: $ref
---
