---
keyword: "$ref"
signature: "URI Reference"
value: This keyword must be set to an absolute URI or a relative reference as defined by [RFC 3986](https://www.rfc-editor.org/info/rfc3986), where its fragment (if any) can consist of a JSON Pointer as defined by [RFC 6901](https://datatracker.ietf.org/doc/html/rfc6901)
summary: "This keyword is used to reference a statically identified schema."
kind: [ "applicator" ]
instance: [ "any" ]
specification: "https://json-schema.org/draft-07/draft-handrews-json-schema-01#rfc.section.8.3"
metaschema: "http://json-schema.org/draft-07/schema#"
tests:
  - draft7/ref.json
  - draft7/refRemote.json
  - draft7/infinite-loop-detection.json
  - draft7/optional/unknownKeyword.json
  - draft7/optional/cross-draft.json
index: -99
introduced_in: draft3
changed_in:
  - draft6
interdependencies:
  - vocabulary: core
    keyword: $id
related:
  - vocabulary: validation
    keyword: definitions
---
