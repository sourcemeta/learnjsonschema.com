---
keyword: "maxContains"
signature: "Integer"
summary: "The number of times that the `contains` keyword (if set) successfully validates against the instance must be less than or equal to given integer."
kind: [ "assertion" ]
instance: [ "array" ]
specification: "https://json-schema.org/draft/2020-12/json-schema-validation.html#section-6.4.4"
metaschema: "https://json-schema.org/draft/2020-12/meta/validation"
interdependencies:
  - vocabulary: applicator
    keyword: contains
related:
  - vocabulary: validation
    keyword: minContains
  - vocabulary: applicator
    keyword: prefixItems
  - vocabulary: applicator
    keyword: items
---
