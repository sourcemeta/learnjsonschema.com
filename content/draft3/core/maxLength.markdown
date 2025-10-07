---
keyword: "maxLength"
signature: "Integer"
value: This keyword must be set to a zero or positive integer
summary: "A string instance is valid against this keyword if its length is less than, or equal to, the value of this keyword."
kind: [ "assertion" ]
instance: [ "string" ]
specification: "https://json-schema.org/draft-03/draft-zyp-json-schema-03.pdf#5.18"
metaschema: "http://json-schema.org/draft-03/schema#"
tests:
  - draft3/maxLength.json
introduced_in: draft1
index: -99947
related:
  - vocabulary: core
    keyword: minLength
  - vocabulary: core
    keyword: pattern
  - vocabulary: core
    keyword: format
---

We are looking for contributors to help us fully expand the documentation to
cover this dialect. If that sounds like you, [send a pull
request on GitHub](https://github.com/sourcemeta/learnjsonschema.com/pulls)!
