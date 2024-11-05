---
keyword: "minItems"
signature: "Integer"
value: This keyword must be set to a zero or positive integer
summary: "An array instance is valid if its size is greater than, or equal to, the value of this keyword."
kind: [ "assertion" ]
instance: [ "array" ]
specification: "https://json-schema.org/draft-06/draft-wright-json-schema-validation-01#rfc.section.6.12"
metaschema: "http://json-schema.org/draft-06/schema#"
default:
  value: 0
tests:
  - draft6/minItems.json
introduced_in: draft1
index: -96
related:
  - vocabulary: validation
    keyword: items
  - vocabulary: validation
    keyword: additionalItems
  - vocabulary: validation
    keyword: maxItems
  - vocabulary: validation
    keyword: contains
---
