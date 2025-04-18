---
keyword: "anyOf"
signature: "Array<Schema>"
value: This keyword must be set to a *non-empty* array, where each item is a valid JSON Schema
summary: "An instance validates successfully against this keyword if it validates successfully against at least one schema defined by this keyword's value."
kind: [ "applicator" ]
instance: [ "any" ]
specification: "https://json-schema.org/draft-06/draft-wright-json-schema-validation-01#rfc.section.6.27"
metaschema: "http://json-schema.org/draft-06/schema#"
tests:
  - draft6/anyOf.json
index: 7
introduced_in: draft4
related:
  - vocabulary: validation
    keyword: allOf
  - vocabulary: validation
    keyword: oneOf
  - vocabulary: validation
    keyword: not
---
