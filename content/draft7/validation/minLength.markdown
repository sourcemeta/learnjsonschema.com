---
keyword: "minLength"
signature: "Integer"
value: This keyword must be set to a zero or positive integer
summary: "A string instance is valid against this keyword if its length is greater than, or equal to, the value of this keyword."
kind: [ "assertion" ]
instance: [ "string" ]
specification: "https://json-schema.org/draft-07/draft-handrews-json-schema-validation-01#rfc.section.6.3.2"
metaschema: "http://json-schema.org/draft-07/schema#"
default:
  value: 0
tests:
  - draft7/minLength.json
introduced_in: draft1
index: -998
related:
  - vocabulary: validation
    keyword: maxLength
  - vocabulary: validation
    keyword: pattern
  - vocabulary: validation
    keyword: format
---
