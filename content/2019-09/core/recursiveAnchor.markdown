---
keyword: "$recursiveAnchor"
signature: "Boolean"
value: This keyword must be set to a boolean that determines whether the reference destination is must be determined by examining the dynamic scope or not
summary: "This keyword is used to dynamically identify a base URI at runtime by marking where such a calculation can start, and where it stops."
kind: [ "identifier" ]
instance: [ "any" ]
specification: "https://json-schema.org/draft/2019-09/draft-handrews-json-schema-02#rfc.section.8.2.4.2.2"
metaschema: "https://json-schema.org/draft/2019-09/meta/core"
default:
  value: "false"
tests:
  - draft2019-09/recursiveRef.json
introduced_in: 2019-09
affects:
  - vocabulary: core
    keyword: $ref
  - vocabulary: core
    keyword: $recursiveRef
related:
  - vocabulary: core
    keyword: $id
  - vocabulary: core
    keyword: $anchor
---
