---
keyword: "exclusiveMaximum"
signature: "Number"
value: This keyword must be set to a number
summary: "Validation succeeds if the numeric instance is less than the given number."
kind: [ "assertion" ]
instance: [ "number" ]
specification: "https://json-schema.org/draft-07/draft-handrews-json-schema-validation-01#rfc.section.6.2.3"
metaschema: "http://json-schema.org/draft-07/schema#"
tests:
  - draft7/exclusiveMaximum.json
introduced_in: draft3
changed_in:
  - draft6
index: -9997
related:
  - vocabulary: validation
    keyword: exclusiveMinimum
  - vocabulary: validation
    keyword: maximum
  - vocabulary: validation
    keyword: minimum
  - vocabulary: validation
    keyword: multipleOf
---
