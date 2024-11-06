---
keyword: "minLength"
signature: "Integer"
value: This keyword must be set to a zero or positive integer
summary: "A string instance is valid against this keyword if its length is greater than, or equal to, the value of this keyword."
kind: [ "assertion" ]
instance: [ "string" ]
specification: "https://json-schema.org/draft-03/draft-zyp-json-schema-03.pdf#5.17"
metaschema: "http://json-schema.org/draft-03/schema#"
default:
  value: 0
tests:
  - draft3/minLength.json
introduced_in: draft1
index: -99948
related:
  - vocabulary: core
    keyword: maxLength
  - vocabulary: core
    keyword: pattern
  - vocabulary: core
    keyword: format
---
