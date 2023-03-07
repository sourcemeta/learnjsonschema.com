---
keyword: "unevaluatedProperties"
signature: "Schema"
summary: "Validates object properties that did not successfully validate against other standard object applicators."
kind: [ "applicator", "annotation" ]
instance: [ "object" ]
specification: "https://json-schema.org/draft/2020-12/json-schema-core.html#section-11.3"
metaschema: "https://json-schema.org/draft/2020-12/meta/unevaluated"
interdependencies:
  - vocabulary: applicator
    keyword: properties
  - vocabulary: applicator
    keyword: patternProperties
  - vocabulary: applicator
    keyword: additionalProperties
  - vocabulary: validation
    keyword: minProperties
  - vocabulary: validation
    keyword: maxProperties
related:
  - vocabulary: unevaluated
    keyword: unevaluatedItems
---

Annotations
-----------

If this keyword is applied to any instance element, it produces an annotation
value of `true`.
