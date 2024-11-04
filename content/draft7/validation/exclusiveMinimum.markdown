---
keyword: "exclusiveMinimum"
signature: "Number"
value: This keyword must be set to a number
summary: "Validation succeeds if the numeric instance is greater than the given number."
kind: [ "assertion" ]
instance: [ "number" ]
specification: "https://json-schema.org/draft-07/draft-handrews-json-schema-validation-01#rfc.section.6.2.5"
metaschema: "http://json-schema.org/draft-07/schema#"
tests:
  - draft7/exclusiveMinimum.json
introduced_in: draft3
changed_in:
  - draft6
index: -9995
related:
  - vocabulary: validation
    keyword: exclusiveMaximum
  - vocabulary: validation
    keyword: maximum
  - vocabulary: validation
    keyword: minimum
  - vocabulary: validation
    keyword: multipleOf
---
