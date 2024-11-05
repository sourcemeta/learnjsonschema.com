---
keyword: "required"
signature: "Array<String>"
value: This keyword must be set to an array of unique strings
summary: "An object instance is valid against this keyword if every item in the array is the name of a property in the instance."
kind: [ "assertion" ]
instance: [ "object" ]
specification: "https://json-schema.org/draft-04/draft-fge-json-schema-validation-00#rfc.section.5.4.3"
metaschema: "http://json-schema.org/draft-04/schema#"
default:
  value: "[]"
tests:
  - draft4/required.json
introduced_in: draft3
index: -7
related:
  - vocabulary: validation
    keyword: dependencies
  - vocabulary: validation
    keyword: maxProperties
  - vocabulary: validation
    keyword: minProperties
---
