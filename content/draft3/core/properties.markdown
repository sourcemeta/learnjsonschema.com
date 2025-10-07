---
keyword: "properties"
signature: "Object<String, Schema>"
value: This keyword must be set to an object where each value is a valid JSON Schema
summary: "Validation succeeds if, for each name that appears in both the instance and as a name within this keyword's value, the child instance for that name successfully validates against the corresponding schema."
kind: [ "applicator" ]
instance: [ "object" ]
specification: "https://json-schema.org/draft-03/draft-zyp-json-schema-03.pdf#5.2"
metaschema: "http://json-schema.org/draft-03/schema#"
default:
  value: "{}"
tests:
  - draft3/properties.json
introduced_in: draft1
index: -99989
affects:
  - vocabulary: core
    keyword: additionalProperties
related:
  - vocabulary: core
    keyword: patternProperties
  - vocabulary: core
    keyword: dependencies
  - vocabulary: core
    keyword: required
---

We are looking for contributors to help us fully expand the documentation to
cover this dialect. If that sounds like you, [send a pull
request on GitHub](https://github.com/sourcemeta/learnjsonschema.com/pulls)!
