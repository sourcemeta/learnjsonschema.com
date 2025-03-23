---
keyword: "$id"
signature: "URI Reference"
value: This keyword must be set to an absolute URI or a relative reference as defined by [RFC 3986](https://www.rfc-editor.org/info/rfc3986) without a fragment
summary: "This keyword declares an identifier for the schema resource."
kind: [ "identifier" ]
instance: [ "any" ]
specification: "https://json-schema.org/draft/2019-09/draft-handrews-json-schema-02#rfc.section.8.2.2"
metaschema: "https://json-schema.org/draft/2019-09/meta/core"
tests:
  - draft2019-09/optional/id.json
index: -999
introduced_in: draft6
affects:
  - vocabulary: core
    keyword: $ref
  - vocabulary: core
    keyword: $recursiveRef
  - vocabulary: core
    keyword: $anchor
  - vocabulary: core
    keyword: $recursiveAnchor
related:
  - vocabulary: core
    keyword: $schema
  - vocabulary: core
    keyword: $vocabulary
---
