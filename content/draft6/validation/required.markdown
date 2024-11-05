---
keyword: "required"
signature: "Array<String>"
value: This keyword must be set to an array of unique strings
summary: "An object instance is valid against this keyword if every item in the array is the name of a property in the instance."
kind: [ "assertion" ]
instance: [ "object" ]
specification: "https://json-schema.org/draft-06/draft-wright-json-schema-validation-01#rfc.section.6.17"
metaschema: "http://json-schema.org/draft-06/schema#"
default:
  value: "[]"
tests:
  - draft6/required.json
introduced_in: draft3
index: -7
changed_in:
  - draft4
related:
  - vocabulary: validation
    keyword: dependencies
  - vocabulary: validation
    keyword: maxProperties
  - vocabulary: validation
    keyword: minProperties
---
