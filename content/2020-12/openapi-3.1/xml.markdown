---
keyword: "xml"
signature: "Object"
value: This keyword must be set to an object that optionally declares the `name`, `namespace`, `prefix`, `attribute`, and `wrapped` fields
summary: "Describes how the instance that this schema applies to is represented when the payload is serialized as XML."
kind: [ "other" ]
instance: [ "any" ]
specification: "https://spec.openapis.org/oas/v3.1.2.html#schema-xml"
metaschema: "https://spec.openapis.org/oas/3.1/meta/base"
index: -999
introduced_in: openapi-3.1
changed_in:
  - openapi-3.2
interdependencies:
  - vocabulary: validation
    keyword: type
  - vocabulary: applicator
    keyword: items
related:
  - vocabulary: openapi-3.2
    keyword: xml
  - vocabulary: validation
    keyword: type
  - vocabulary: applicator
    keyword: properties
  - vocabulary: applicator
    keyword: items
  - vocabulary: content
    keyword: contentMediaType
---
