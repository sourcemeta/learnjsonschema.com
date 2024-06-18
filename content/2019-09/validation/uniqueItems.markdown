---
keyword: "uniqueItems"
signature: "Boolean"
value: This keyword must be set to a boolean value
summary: "If this keyword is set to the boolean value true, the instance validates successfully if all of its elements are unique."
kind: [ "assertion" ]
instance: [ "array" ]
specification: "https://json-schema.org/draft/2019-09/draft-handrews-json-schema-validation-02#rfc.section.6.4.3"
metaschema: "https://json-schema.org/draft/2019-09/meta/validation"
default:
  value: false
tests:
  - draft2019-09/uniqueItems.json
introduced_in: draft2
related:
  - vocabulary: applicator
    keyword: items
  - vocabulary: applicator
    keyword: additionalItems
  - vocabulary: applicator
    keyword: contains
---
