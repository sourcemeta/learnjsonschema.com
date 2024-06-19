---
keyword: "$ref"
signature: "URI Reference"
value: This keyword must be set to an absolute URI or a relative reference as defined by [RFC 3986](https://www.rfc-editor.org/info/rfc3986), where its fragment (if any) can consist of a JSON Pointer as defined by [RFC 6901](https://datatracker.ietf.org/doc/html/rfc6901)
summary: "This keyword is used to reference a statically identified schema."
kind: [ "applicator" ]
instance: [ "any" ]
specification: "https://json-schema.org/draft/2019-09/draft-handrews-json-schema-02#rfc.section.8.2.4.1"
metaschema: "https://json-schema.org/draft/2019-09/meta/core"
tests:
  - draft2019-09/ref.json
  - draft2019-09/refRemote.json
  - draft2019-09/infinite-loop-detection.json
  - draft2019-09/optional/refOfUnknownKeyword.json
  - draft2019-09/optional/cross-draft.json
index: -99
introduced_in: draft3
changed_in:
  - draft6
interdependencies:
  - vocabulary: core
    keyword: $id
  - vocabulary: core
    keyword: $recursiveAnchor
  - vocabulary: core
    keyword: $anchor
related:
  - vocabulary: core
    keyword: $recursiveRef
  - vocabulary: core
    keyword: $defs
---
