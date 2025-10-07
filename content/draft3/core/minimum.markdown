---
keyword: "minimum"
signature: "Number"
value: This keyword must be set to a number
summary: "Validation succeeds if the numeric instance is greater than, or equal to, the given number, depending on the value of [`exclusiveMinimum`](/draft3/core/exclusiveMinimum), if any."
kind: [ "assertion" ]
instance: [ "number" ]
specification: "https://json-schema.org/draft-03/draft-zyp-json-schema-03.pdf#5.9"
metaschema: "http://json-schema.org/draft-03/schema#"
tests:
  - draft3/minimum.json
  - draft3/optional/bignum.json
introduced_in: draft1
index: -99938
interdependencies:
  - vocabulary: core
    keyword: exclusiveMinimum
related:
  - vocabulary: core
    keyword: maximum
  - vocabulary: core
    keyword: exclusiveMaximum
  - vocabulary: core
    keyword: exclusiveMinimum
  - vocabulary: core
    keyword: divisibleBy
---

We are looking for contributors to help us fully expand the documentation to
cover this dialect. If that sounds like you, [send a pull
request on GitHub](https://github.com/sourcemeta/learnjsonschema.com/pulls)!
