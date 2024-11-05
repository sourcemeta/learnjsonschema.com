---
keyword: "enum"
signature: "Array<Any>"
value: This keyword must be set to a *non-empty* array of unique JSON values
summary: "Validation succeeds if the instance is equal to one of the elements in this keyword's array value."
kind: [ "assertion" ]
instance: [ "any" ]
specification: "https://json-schema.org/draft-04/draft-fge-json-schema-validation-00#rfc.section.5.5.1"
metaschema: "http://json-schema.org/draft-04/schema#"
tests:
  - draft4/enum.json
introduced_in: draft1
index: -99998
related:
  - vocabulary: validation
    keyword: type
  - vocabulary: validation
    keyword: anyOf
  - vocabulary: validation
    keyword: oneOf
---
