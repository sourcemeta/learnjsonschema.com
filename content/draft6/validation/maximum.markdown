---
keyword: "maximum"
signature: "Number"
value: This keyword must be set to a number
summary: "Validation succeeds if the numeric instance is less than or equal to the given number."
kind: [ "assertion" ]
instance: [ "number" ]
specification: "https://json-schema.org/draft-06/draft-wright-json-schema-validation-01#rfc.section.6.2"
metaschema: "http://json-schema.org/draft-06/schema#"
tests:
  - draft6/maximum.json
introduced_in: draft1
index: -9998
related:
  - vocabulary: validation
    keyword: minimum
  - vocabulary: validation
    keyword: exclusiveMaximum
  - vocabulary: validation
    keyword: exclusiveMinimum
  - vocabulary: validation
    keyword: multipleOf
---
