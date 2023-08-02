---
keyword: "readOnly"
signature: "Boolean"
summary: "This keyword indicates that the value of the instance is managed exclusively by the owning authority, and attempts by an application to modify the value of this property are expected to be ignored or rejected by that owning authority."
kind: [ "annotation" ]
instance: [ "any" ]
specification: "https://json-schema.org/draft/2020-12/json-schema-validation.html#section-9.4"
metaschema: "https://json-schema.org/draft/2020-12/meta/meta-data"
introduced_in: draft7
related:
  - vocabulary: meta-data
    keyword: writeOnly
  - vocabulary: meta-data
    keyword: title
  - vocabulary: meta-data
    keyword: description
  - vocabulary: meta-data
    keyword: examples
  - vocabulary: meta-data
    keyword: default
  - vocabulary: meta-data
    keyword: deprecated
---

Annotations
-----------

This keyword produces the annotation value `true` if the keyword is set to
`true`, or `false` otherwise.
