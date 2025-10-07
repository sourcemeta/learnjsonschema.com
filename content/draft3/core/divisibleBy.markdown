---
keyword: "divisibleBy"
signature: "Number"
value: This keyword must be set to a number that is not equal to zero
summary: "A numeric instance is valid only if division by this keyword's value results in an integer."
kind: [ "assertion" ]
instance: [ "number" ]
specification: "https://json-schema.org/draft-03/draft-zyp-json-schema-03.pdf#5.24"
metaschema: "http://json-schema.org/draft-03/schema#"
default:
  value: 1
tests:
  - draft3/divisibleBy.json
introduced_in: draft3
removed_in: draft4
changed_in:
  - draft4
index: -99945
related:
  - vocabulary: core
    keyword: exclusiveMaximum
  - vocabulary: core
    keyword: exclusiveMinimum
  - vocabulary: core
    keyword: maximum
  - vocabulary: core
    keyword: minimum
---

We are looking for contributors to help us fully expand the documentation to
cover this dialect. If that sounds like you, [send a pull
request on GitHub](https://github.com/sourcemeta/learnjsonschema.com/pulls)!
