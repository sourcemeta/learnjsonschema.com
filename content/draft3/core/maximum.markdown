---
keyword: "maximum"
signature: "Number"
value: This keyword must be set to a number
summary: "Validation succeeds if the numeric instance is less than, or equal to, the given number, depending on the value of [`exclusiveMaximum`](/draft3/core/exclusiveMaximum), if any."
kind: [ "assertion" ]
instance: [ "number" ]
specification: "https://json-schema.org/draft-03/draft-zyp-json-schema-03.pdf#5.10"
metaschema: "http://json-schema.org/draft-03/schema#"
tests:
  - draft3/maximum.json
  - draft3/optional/bignum.json
introduced_in: draft1
index: -99936
interdependencies:
  - vocabulary: core
    keyword: exclusiveMaximum
related:
  - vocabulary: core
    keyword: minimum
  - vocabulary: core
    keyword: exclusiveMaximum
  - vocabulary: core
    keyword: exclusiveMinimum
  - vocabulary: core
    keyword: divisibleBy
---
