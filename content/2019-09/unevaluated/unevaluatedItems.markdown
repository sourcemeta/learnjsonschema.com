---
keyword: "unevaluatedItems"
signature: "Schema"
summary: "Validates array elements that did not successfully validate against other standard array applicators."
kind: [ "applicator", "annotation" ]
instance: [ "array" ]
specification: "https://json-schema.org/draft/2020-12/json-schema-core.html#section-11.2"
metaschema: "https://json-schema.org/draft/2020-12/meta/unevaluated"
introduced_in: 2019-09
interdependencies:
  - vocabulary: applicator
    keyword: prefixItems
  - vocabulary: applicator
    keyword: items
  - vocabulary: validation
    keyword: minItems
  - vocabulary: validation
    keyword: maxItems
  - vocabulary: applicator
    keyword: contains
  - vocabulary: validation
    keyword: minContains
  - vocabulary: validation
    keyword: maxContains
related:
  - vocabulary: unevaluated
    keyword: unevaluatedProperties
---

Annotations
-----------

If this keyword is applied to any instance element, it produces an annotation
value of `true`.
