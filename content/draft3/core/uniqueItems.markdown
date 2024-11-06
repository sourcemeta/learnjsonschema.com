---
keyword: "uniqueItems"
signature: "Boolean"
value: This keyword must be set to a boolean value
summary: "If this keyword is set to the boolean value true, the instance validates successfully if all of its elements are unique."
kind: [ "assertion" ]
instance: [ "array" ]
specification: "https://json-schema.org/draft-03/draft-zyp-json-schema-03.pdf#5.15"
metaschema: "http://json-schema.org/draft-03/schema#"
default:
  value: false
tests:
  - draft3/uniqueItems.json
introduced_in: draft2
index: -99975
related:
  - vocabulary: core
    keyword: items
  - vocabulary: core
    keyword: additionalItems
---
