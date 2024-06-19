---
keyword: "minLength"
signature: "Integer"
value: This keyword must be set to a zero or positive integer
summary: "A string instance is valid against this keyword if its length is greater than, or equal to, the value of this keyword."
kind: [ "assertion" ]
instance: [ "string" ]
specification: "https://json-schema.org/draft/2019-09/draft-handrews-json-schema-validation-02#rfc.section.6.3.2"
metaschema: "https://json-schema.org/draft/2019-09/meta/validation"
default:
  value: 0
tests:
  - draft2019-09/minLength.json
index: -9999
introduced_in: draft1
related:
  - vocabulary: validation
    keyword: maxLength
  - vocabulary: validation
    keyword: pattern
  - vocabulary: format
    keyword: format
---
