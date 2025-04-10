---
keyword: "multipleOf"
signature: "Number"
value: This keyword must be set to a number that is greater than zero
summary: "A numeric instance is valid only if division by this keyword's value results in an integer."
kind: [ "assertion" ]
instance: [ "number" ]
specification: "https://json-schema.org/draft-07/draft-handrews-json-schema-validation-01#rfc.section.6.2.1"
metaschema: "http://json-schema.org/draft-07/schema#"
default:
  value: 1
tests:
  - draft7/multipleOf.json
introduced_in: draft4
index: -9999
related:
  - vocabulary: validation
    keyword: exclusiveMaximum
  - vocabulary: validation
    keyword: exclusiveMinimum
  - vocabulary: validation
    keyword: maximum
  - vocabulary: validation
    keyword: minimum
---
