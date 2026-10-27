---
keyword: "xml"
signature: "Object"
value: This keyword must be set to an object that optionally declares the `nodeType`, `name`, `namespace`, `prefix`, `attribute`, and `wrapped` fields
summary: "Describes how the instance that this schema applies to is represented when the payload is serialized as XML."
kind: [ "other" ]
instance: [ "any" ]
specification: "https://spec.openapis.org/oas/v3.2.1.html#schema-xml"
metaschema: "https://spec.openapis.org/oas/3.2/meta/2026-02-26"
index: -999
introduced_in: openapi-3.1
changed_in:
  - openapi-3.1
interdependencies:
  - vocabulary: core
    keyword: $ref
  - vocabulary: core
    keyword: $dynamicRef
  - vocabulary: validation
    keyword: type
related:
  - vocabulary: openapi-3.1
    keyword: xml
  - vocabulary: validation
    keyword: type
  - vocabulary: applicator
    keyword: properties
  - vocabulary: applicator
    keyword: items
  - vocabulary: applicator
    keyword: prefixItems
  - vocabulary: content
    keyword: contentMediaType
---
