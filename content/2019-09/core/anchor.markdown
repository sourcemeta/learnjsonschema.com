---
keyword: "$anchor"
signature: "String"
value: This keyword must be set to a string starting with a letter and containing letters, digits, hyphens, underscores, colons, or periods
summary: "This keyword is used to create plain name fragments that are not tied to any particular structural location for referencing purposes, which are taken into consideration for static referencing."
kind: [ "identifier" ]
instance: [ "any" ]
specification: "https://json-schema.org/draft/2019-09/draft-handrews-json-schema-02#rfc.section.8.2.3"
metaschema: "https://json-schema.org/draft/2019-09/meta/core"
tests:
  - draft2019-09/anchor.json
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
    keyword: $recursiveAnchor
---
