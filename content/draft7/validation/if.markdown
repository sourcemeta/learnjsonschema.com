---
keyword: "if"
signature: "Schema"
value: This keyword must be set to a valid JSON Schema
summary: "This keyword declares a condition based on the validation result of the given schema."
kind: [ "applicator" ]
instance: [ "any" ]
specification: "https://json-schema.org/draft-07/draft-handrews-json-schema-validation-01#rfc.section.6.6.1"
metaschema: "http://json-schema.org/draft-07/schema#"
tests:
  - draft7/if-then-else.json
introduced_in: draft7
index: -1
affects:
  - vocabulary: validation
    keyword: then
  - vocabulary: validation
    keyword: else
related:
  - vocabulary: validation
    keyword: allOf
  - vocabulary: validation
    keyword: anyOf
  - vocabulary: validation
    keyword: oneOf
  - vocabulary: validation
    keyword: not
---
