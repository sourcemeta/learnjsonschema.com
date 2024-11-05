---
keyword: "not"
signature: "Schema"
value: This keyword must be set to a valid JSON Schema
summary: "An instance is valid against this keyword if it fails to validate successfully against the schema defined by this keyword."
kind: [ "applicator" ]
instance: [ "any" ]
specification: "https://json-schema.org/draft-06/draft-wright-json-schema-validation-01#rfc.section.6.29"
metaschema: "http://json-schema.org/draft-06/schema#"
default:
  value: "false"
tests:
  - draft6/not.json
index: 9
introduced_in: draft4
related:
  - vocabulary: validation
    keyword: allOf
  - vocabulary: validation
    keyword: anyOf
  - vocabulary: validation
    keyword: oneOf
---
