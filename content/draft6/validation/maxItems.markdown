---
keyword: "maxItems"
signature: "Integer"
value: This keyword must be set to a zero or positive integer
summary: "An array instance is valid if its size is less than, or equal to, the value of this keyword."
kind: [ "assertion" ]
instance: [ "array" ]
specification: "https://json-schema.org/draft-06/draft-wright-json-schema-validation-01#rfc.section.6.11"
metaschema: "http://json-schema.org/draft-06/schema#"
tests:
  - draft6/maxItems.json
introduced_in: draft1
index: -97
related:
  - vocabulary: validation
    keyword: items
  - vocabulary: validation
    keyword: additionalItems
  - vocabulary: validation
    keyword: minItems
  - vocabulary: validation
    keyword: contains
---
