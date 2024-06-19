---
keyword: "maxContains"
signature: "Integer"
value: This keyword must be set to a zero or positive integer
summary: "The number of times that the [`contains`](/2019-09/applicator/contains) keyword (if set) successfully validates against the instance must be less than or equal to the given integer."
kind: [ "assertion" ]
instance: [ "array" ]
specification: "https://json-schema.org/draft/2019-09/draft-handrews-json-schema-validation-02#rfc.section.6.4.4"
metaschema: "https://json-schema.org/draft/2019-09/meta/validation"
tests:
  - draft2019-09/maxContains.json
introduced_in: 2019-09
affects:
  - vocabulary: applicator
    keyword: contains
related:
  - vocabulary: validation
    keyword: minContains
  - vocabulary: applicator
    keyword: items
  - vocabulary: applicator
    keyword: additionalItems
---
