---
keyword: "$ref"
signature: "URI Reference"
value: This keyword may be set to an absolute URI or a relative reference
summary: "This keyword is used to reference a statically identified schema."
kind: [ "applicator" ]
instance: [ "any" ]
specification: "https://json-schema.org/draft-03/draft-zyp-json-schema-03.pdf#5.28"
metaschema: "http://json-schema.org/draft-03/schema#"
tests:
  - draft3/ref.json
  - draft3/refRemote.json
  - draft3/infinite-loop-detection.json
index: -99997
introduced_in: draft3
interdependencies:
  - vocabulary: core
    keyword: id
related:
---
