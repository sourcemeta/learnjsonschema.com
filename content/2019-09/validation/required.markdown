---
keyword: "required"
signature: "Array<String>"
value: This keyword must be set to a *non-empty* array of unique strings
summary: "An object instance is valid against this keyword if every item in the array is the name of a property in the instance."
kind: [ "assertion" ]
instance: [ "object" ]
specification: "https://json-schema.org/draft/2019-09/draft-handrews-json-schema-validation-02#rfc.section.6.5.3"
metaschema: "https://json-schema.org/draft/2019-09/meta/validation"
default:
  value: "[]"
tests:
  - draft2019-09/required.json
index: -99
introduced_in: draft3
changed_in:
  - draft4
related:
  - vocabulary: validation
    keyword: dependentRequired
  - vocabulary: validation
    keyword: maxProperties
  - vocabulary: validation
    keyword: minProperties
---
