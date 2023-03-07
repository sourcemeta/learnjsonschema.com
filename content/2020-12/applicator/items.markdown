---
keyword: "items"
signature: "Schema"
summary: "Validation succeeds if each element of the instance not covered by `prefixItems` validates against this schema."
kind: [ "applicator", "annotation" ]
instance: [ "array" ]
specification: "https://json-schema.org/draft/2020-12/json-schema-core.html#section-10.3.1.2"
metaschema: "https://json-schema.org/draft/2020-12/meta/applicator"
interdependencies:
  - vocabulary: applicator
    keyword: prefixItems
  - vocabulary: validation
    keyword: minItems
  - vocabulary: validation
    keyword: maxItems
related:
  - vocabulary: applicator
    keyword: contains
  - vocabulary: validation
    keyword: minContains
  - vocabulary: validation
    keyword: maxContains
  - vocabulary: validation
    keyword: uniqueItems
  - vocabulary: unevaluated
    keyword: unevaluatedItems
---

Annotations
-----------

If this keyword is applied to any instance element, it produces an annotation
value of `true`.
