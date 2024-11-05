---
keyword: "maxProperties"
signature: "Integer"
value: This keyword must be set to a zero or positive integer
summary: "An object instance is valid if its number of properties is less than, or equal to, the value of this keyword."
kind: [ "assertion" ]
instance: [ "object" ]
specification: "https://json-schema.org/draft-06/draft-wright-json-schema-validation-01#rfc.section.6.15"
metaschema: "http://json-schema.org/draft-06/schema#"
tests:
  - draft6/maxProperties.json
introduced_in: draft4
index: -9
related:
  - vocabulary: validation
    keyword: minProperties
  - vocabulary: validation
    keyword: properties
  - vocabulary: validation
    keyword: patternProperties
  - vocabulary: validation
    keyword: additionalProperties
---
