---
keyword: "$ref"
signature: "URI Reference"
value: This keyword must be set to an absolute URI or a relative reference as defined by [RFC 3986](https://www.rfc-editor.org/info/rfc3986), where its fragment (if any) can consist of a JSON Pointer as defined by [RFC 6901](https://datatracker.ietf.org/doc/html/rfc6901)
summary: "This keyword is used to reference a statically identified schema."
kind: [ "applicator" ]
instance: [ "any" ]
specification: "https://json-schema.org/draft-04/draft-zyp-json-schema-04#rfc.section.7"
metaschema: "http://json-schema.org/draft-04/schema#"
tests:
  - draft4/ref.json
  - draft4/refRemote.json
  - draft4/infinite-loop-detection.json
index: -99
introduced_in: draft3
interdependencies:
  - vocabulary: core
    keyword: id
related:
  - vocabulary: validation
    keyword: definitions
---
