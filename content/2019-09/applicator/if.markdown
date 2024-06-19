---
keyword: "if"
signature: "Schema"
value: This keyword must be set to a valid JSON Schema
summary: "This keyword declares a condition based on the validation result of the given schema."
kind: [ "applicator" ]
instance: [ "any" ]
specification: "https://json-schema.org/draft/2019-09/draft-handrews-json-schema-02#rfc.section.9.2.2.1"
metaschema: "https://json-schema.org/draft/2019-09/meta/applicator"
tests:
  - draft2019-09/if-then-else.json
index: -9999
introduced_in: draft7
affects:
  - vocabulary: applicator
    keyword: then
  - vocabulary: applicator
    keyword: else
related:
  - vocabulary: applicator
    keyword: allOf
  - vocabulary: applicator
    keyword: anyOf
  - vocabulary: applicator
    keyword: oneOf
  - vocabulary: applicator
    keyword: not
---
