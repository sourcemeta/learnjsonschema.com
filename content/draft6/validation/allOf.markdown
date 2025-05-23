---
keyword: "allOf"
signature: "Array<Schema>"
value: This keyword must be set to a *non-empty* array, where each item is a valid JSON Schema
summary: "An instance validates successfully against this keyword if it validates successfully against all schemas defined by this keyword's value."
kind: [ "applicator" ]
instance: [ "any" ]
specification: "https://json-schema.org/draft-06/draft-wright-json-schema-validation-01#rfc.section.6.26"
metaschema: "http://json-schema.org/draft-06/schema#"
default:
  logical_value: "[]"
tests:
  - draft6/allOf.json
index: 6
introduced_in: draft4
related:
  - vocabulary: validation
    keyword: anyOf
  - vocabulary: validation
    keyword: oneOf
  - vocabulary: validation
    keyword: not
---
