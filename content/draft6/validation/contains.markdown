---
keyword: "contains"
signature: "Schema"
value: This keyword must be set to a valid JSON Schema
summary: "Validation succeeds if the instance contains an element that validates against this schema."
kind: [ "applicator" ]
instance: [ "array" ]
specification: "https://json-schema.org/draft-06/draft-wright-json-schema-validation-01#rfc.section.6.14"
metaschema: "http://json-schema.org/draft-06/schema#"
tests:
  - draft6/contains.json
default:
  value: "{}"
introduced_in: draft6
index: -94
related:
  - vocabulary: validation
    keyword: items
  - vocabulary: validation
    keyword: additionalItems
  - vocabulary: validation
    keyword: minItems
  - vocabulary: validation
    keyword: maxItems
  - vocabulary: validation
    keyword: uniqueItems
---
