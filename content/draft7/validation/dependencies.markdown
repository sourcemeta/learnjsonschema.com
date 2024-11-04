---
keyword: "dependencies"
signature: "Object<String, Array<String> | Schema>"
value: This keyword must be set to an object where each value is either an array of unique strings or a valid JSON Schema
summary: "Validation succeeds if, for each name that appears in both the instance and as a name within this keyword's value, either every item in the corresponding array is also the name of a property in the instance or the corresponding subschema successfully evaluates against the instance."
kind: [ "assertion" ]
instance: [ "object" ]
specification: "https://json-schema.org/draft-07/draft-handrews-json-schema-validation-01#rfc.section.6.5.7"
metaschema: "http://json-schema.org/draft-07/schema#"
default:
  value: "{}"
index: -3
tests:
  - draft7/dependencies.json
introduced_in: 2019-09
related:
  - vocabulary: validation
    keyword: required
  - vocabulary: validation
    keyword: if
  - vocabulary: validation
    keyword: then
  - vocabulary: validation
    keyword: else
---
