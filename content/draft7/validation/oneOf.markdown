---
keyword: "oneOf"
signature: "Array<Schema>"
value: This keyword must be set to a *non-empty* array, where each item is a valid JSON Schema
summary: "An instance validates successfully against this keyword if it validates successfully against exactly one schema defined by this keyword's value."
kind: [ "applicator" ]
instance: [ "any" ]
specification: "https://json-schema.org/draft-07/draft-handrews-json-schema-validation-01#rfc.section.6.7.3"
metaschema: "http://json-schema.org/draft-07/schema#"
tests:
  - draft7/oneOf.json
index: 8
introduced_in: draft4
related:
  - vocabulary: validation
    keyword: allOf
  - vocabulary: validation
    keyword: anyOf
  - vocabulary: validation
    keyword: if
  - vocabulary: validation
    keyword: then
  - vocabulary: validation
    keyword: else
  - vocabulary: validation
    keyword: not
---
