---
keyword: "dependentRequired"
signature: "Object<String, Array<String>>"
summary: "Validation succeeds if, for each name that appears in both the instance and as a name within this keyword's value, every item in the corresponding array is also the name of a property in the instance."
kind: [ "assertion" ]
instance: [ "object" ]
specification: "https://json-schema.org/draft/2020-12/json-schema-validation.html#section-6.5.4"
metaschema: "https://json-schema.org/draft/2020-12/meta/validation"
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
