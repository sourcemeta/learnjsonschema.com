---
keyword: "minContains"
signature: "Integer"
summary: "The number of times that the `contains` keyword (if set) successfully validates against the instance must be greater than or equal to the given integer."
kind: [ "assertion" ]
instance: [ "array" ]
specification: "https://json-schema.org/draft/2020-12/json-schema-validation.html#section-6.4.5"
metaschema: "https://json-schema.org/draft/2020-12/meta/validation"
introduced_in: 2019-09
interdependencies:
  - vocabulary: applicator
    keyword: contains
related:
  - vocabulary: validation
    keyword: maxContains
  - vocabulary: applicator
    keyword: prefixItems
  - vocabulary: applicator
    keyword: items
---
