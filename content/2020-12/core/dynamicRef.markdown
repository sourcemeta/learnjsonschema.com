---
keyword: "$dynamicRef"
signature: "URI Reference"
value: This keyword must be set to an absolute URI or a relative reference as defined by [RFC3986](https://www.rfc-editor.org/info/rfc3986), where its fragment (if any) can consist of a JSON Pointer as defined by [RFC6901](https://datatracker.ietf.org/doc/html/rfc6901)
summary: "This keyword is used to reference an identified schema, deferring the full resolution until runtime, at which point it is resolved each time it is encountered while evaluating an instance."
kind: [ "applicator" ]
instance: [ "any" ]
specification: "https://json-schema.org/draft/2020-12/json-schema-core.html#section-8.2.3.1"
metaschema: "https://json-schema.org/draft/2020-12/meta/core"
tests:
  - draft2020-12/dynamicRef.json
introduced_in: 2020-12
interdependencies:
  - vocabulary: core
    keyword: $id
  - vocabulary: core
    keyword: $dynamicAnchor
  - vocabulary: core
    keyword: $anchor
related:
  - vocabulary: core
    keyword: $ref
  - vocabulary: core
    keyword: $defs
---
