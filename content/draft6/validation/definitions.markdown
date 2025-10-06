---
keyword: "definitions"
signature: "Object<String, Schema>"
value: This keyword must be set to an object where each value is a valid JSON Schema
summary: "This keyword reserves a location for schema authors to inline reusable JSON Schemas into a more general schema."
kind: [ "location" ]
instance: [ "any" ]
specification: "https://json-schema.org/draft-06/draft-wright-json-schema-validation-01#rfc.section.7.1"
metaschema: "http://json-schema.org/draft-06/schema#"
default:
  value: "{}"
index: 999
tests:
  - draft6/definitions.json
introduced_in: draft4
related:
  - vocabulary: core
    keyword: $ref
---
