---
keyword: "enum"
signature: "Array<Any>"
value: This keyword must be set to a *non-empty* array of unique JSON values
summary: "Validation succeeds if the instance is equal to one of the elements in this keyword's array value."
kind: [ "assertion" ]
instance: [ "any" ]
specification: "https://json-schema.org/draft-06/draft-wright-json-schema-validation-01#rfc.section.6.23"
metaschema: "http://json-schema.org/draft-06/schema#"
tests:
  - draft6/enum.json
introduced_in: draft1
index: -99998
related:
  - vocabulary: validation
    keyword: const
  - vocabulary: validation
    keyword: type
  - vocabulary: validation
    keyword: anyOf
  - vocabulary: validation
    keyword: oneOf
---
