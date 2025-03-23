---
keyword: "dependentRequired"
signature: "Object<String, Array<String>>"
value: This keyword must be set to an object where each value is an array of unique strings
summary: "Validation succeeds if, for each name that appears in both the instance and as a name within this keyword's value, every item in the corresponding array is also the name of a property in the instance."
kind: [ "assertion" ]
instance: [ "object" ]
specification: "https://json-schema.org/draft/2019-09/draft-handrews-json-schema-validation-02#rfc.section.6.5.4"
metaschema: "https://json-schema.org/draft/2019-09/meta/validation"
default:
  value: "{}"
tests:
  - draft2019-09/dependentRequired.json
index: -99
introduced_in: 2019-09
related:
  - vocabulary: validation
    keyword: required
  - vocabulary: applicator
    keyword: dependentSchemas
  - vocabulary: applicator
    keyword: if
  - vocabulary: applicator
    keyword: then
  - vocabulary: applicator
    keyword: else
---
