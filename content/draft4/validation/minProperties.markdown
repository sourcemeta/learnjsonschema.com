---
keyword: "minProperties"
signature: "Integer"
value: This keyword must be set to a zero or positive integer
summary: "An object instance is valid if its number of properties is greater than, or equal to, the value of this keyword."
kind: [ "assertion" ]
instance: [ "object" ]
specification: "https://json-schema.org/draft-04/draft-fge-json-schema-validation-00#rfc.section.5.4.2"
metaschema: "http://json-schema.org/draft-04/schema#"
default:
  value: 0
tests:
  - draft4/minProperties.json
introduced_in: draft4
index: -8
related:
  - vocabulary: validation
    keyword: maxProperties
  - vocabulary: validation
    keyword: properties
  - vocabulary: validation
    keyword: patternProperties
  - vocabulary: validation
    keyword: additionalProperties
---
