---
keyword: "enum"
signature: "Array<Any>"
value: This keyword must be set to a *non-empty* array of unique JSON values
summary: "Validation succeeds if the instance is equal to one of the elements in this keyword's array value."
kind: [ "assertion" ]
instance: [ "any" ]
specification: "https://json-schema.org/draft-03/draft-zyp-json-schema-03.pdf#5.19"
metaschema: "http://json-schema.org/draft-03/schema#"
tests:
  - draft3/enum.json
introduced_in: draft1
index: -99950
related:
  - vocabulary: core
    keyword: type
  - vocabulary: core
    keyword: extends
---
