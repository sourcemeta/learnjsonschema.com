---
keyword: "dependencies"
signature: "Object<String, Array<String> | Schema>"
value: This keyword must be set to an object where each value is either an array of unique strings or a valid JSON Schema
summary: "Validation succeeds if, for each name that appears in both the instance and as a name within this keyword's value, either every item in the corresponding array is also the name of a property in the instance or the corresponding subschema successfully evaluates against the instance."
kind: [ "assertion" ]
instance: [ "object" ]
specification: "https://json-schema.org/draft-03/draft-zyp-json-schema-03.pdf#5.8"
metaschema: "http://json-schema.org/draft-03/schema#"
default:
  value: "{}"
index: -99955
tests:
  - draft3/dependencies.json
introduced_in: draft3
changed_in:
  - 2019-09
related:
  - vocabulary: core
    keyword: required
---

We are looking for contributors to help us fully expand the documentation to
cover this dialect. If that sounds like you, [send a pull
request on GitHub](https://github.com/sourcemeta/learnjsonschema.com/pulls)!
