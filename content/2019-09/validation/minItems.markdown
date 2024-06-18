---
keyword: "minItems"
signature: "Integer"
value: This keyword must be set to a zero or positive integer
summary: "An array instance is valid if its size is greater than, or equal to, the value of this keyword."
kind: [ "assertion" ]
instance: [ "array" ]
specification: "https://json-schema.org/draft/2019-09/draft-handrews-json-schema-validation-02#rfc.section.6.4.2"
metaschema: "https://json-schema.org/draft/2019-09/meta/validation"
default:
  value: 0
tests:
  - draft2019-09/minItems.json
index: -9
introduced_in: draft1
related:
  - vocabulary: applicator
    keyword: items
  - vocabulary: applicator
    keyword: additionalItems
  - vocabulary: validation
    keyword: maxItems
  - vocabulary: applicator
    keyword: contains
---
