---
keyword: "not"
signature: "Schema"
value: This keyword must be set to a valid JSON Schema
summary: "An instance is valid against this keyword if it fails to validate successfully against the schema defined by this keyword."
kind: [ "applicator" ]
instance: [ "any" ]
specification: "https://json-schema.org/draft/2019-09/draft-handrews-json-schema-02#rfc.section.9.2.1.4"
metaschema: "https://json-schema.org/draft/2019-09/meta/applicator"
default:
  value: "false"
tests:
  - draft2019-09/not.json
index: -9997
introduced_in: draft4
related:
  - vocabulary: applicator
    keyword: allOf
  - vocabulary: applicator
    keyword: anyOf
  - vocabulary: applicator
    keyword: oneOf
  - vocabulary: applicator
    keyword: if
  - vocabulary: applicator
    keyword: then
  - vocabulary: applicator
    keyword: else
---
