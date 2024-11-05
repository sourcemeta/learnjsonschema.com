---
keyword: "maxLength"
signature: "Integer"
value: This keyword must be set to a zero or positive integer
summary: "A string instance is valid against this keyword if its length is less than, or equal to, the value of this keyword."
kind: [ "assertion" ]
instance: [ "string" ]
specification: "https://json-schema.org/draft-06/draft-wright-json-schema-validation-01#rfc.section.6.6"
metaschema: "http://json-schema.org/draft-06/schema#"
tests:
  - draft6/maxLength.json
introduced_in: draft1
index: -999
related:
  - vocabulary: validation
    keyword: minLength
  - vocabulary: validation
    keyword: pattern
  - vocabulary: validation
    keyword: format
---
