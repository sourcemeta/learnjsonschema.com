---
keyword: "minProperties"
signature: "Integer"
value: This keyword must be set to a zero or positive integer
summary: "An object instance is valid if its number of properties is greater than, or equal to, the value of this keyword."
kind: [ "assertion" ]
instance: [ "object" ]
specification: "https://json-schema.org/draft/2019-09/draft-handrews-json-schema-validation-02#rfc.section.6.5.2"
metaschema: "https://json-schema.org/draft/2019-09/meta/validation"
default:
  value: 0
tests:
  - draft2019-09/minProperties.json
index: -99
introduced_in: draft4
related:
  - vocabulary: validation
    keyword: maxProperties
  - vocabulary: applicator
    keyword: properties
  - vocabulary: applicator
    keyword: patternProperties
  - vocabulary: applicator
    keyword: additionalProperties
---
