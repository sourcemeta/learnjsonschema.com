---
keyword: "enum"
signature: "Array<Any>"
value: This keyword must be set to an array of unique JSON values
summary: "Validation succeeds if the instance is equal to one of the elements in this keyword's array value."
kind: [ "assertion" ]
instance: [ "any" ]
specification: "https://json-schema.org/draft/2019-09/draft-handrews-json-schema-validation-02#rfc.section.6.1.2"
metaschema: "https://json-schema.org/draft/2019-09/meta/validation"
tests:
  - draft2019-09/enum.json
index: -99998
introduced_in: draft1
related:
  - vocabulary: validation
    keyword: const
  - vocabulary: validation
    keyword: type
  - vocabulary: applicator
    keyword: anyOf
  - vocabulary: applicator
    keyword: oneOf
---
