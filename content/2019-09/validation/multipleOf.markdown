---
keyword: "multipleOf"
signature: "Number"
value: This keyword must be set to a number that is not equal to zero
summary: "A numeric instance is valid only if division by this keyword's value results in an integer."
kind: [ "assertion" ]
instance: [ "number" ]
specification: "https://json-schema.org/draft/2019-09/draft-handrews-json-schema-validation-02#rfc.section.6.2.1"
metaschema: "https://json-schema.org/draft/2019-09/meta/validation"
default:
  value: 1
tests:
  - draft2019-09/multipleOf.json
index: -999
introduced_in: draft4
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
