---
keyword: "definitions"
signature: "Object<String, Schema>"
value: This keyword must be set to an object where each value is a valid JSON Schema
summary: "This keyword reserves a location for schema authors to inline re-usable JSON Schemas into a more general schema."
kind: [ "location" ]
instance: [ "any" ]
specification: "https://json-schema.org/draft-04/draft-fge-json-schema-validation-00#rfc.section.5.5.7"
metaschema: "http://json-schema.org/draft-04/schema#"
default:
  value: "{}"
index: 999
tests:
  - draft4/definitions.json
introduced_in: draft4
related:
  - vocabulary: core
    keyword: $ref
---
