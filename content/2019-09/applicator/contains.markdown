---
keyword: "contains"
signature: "Schema"
summary: "Validation succeeds if the instance contains an element that validates against this schema."
kind: [ "applicator", "annotation" ]
instance: [ "array" ]
specification: "https://json-schema.org/draft/2020-12/json-schema-core.html#section-10.3.1.3"
metaschema: "https://json-schema.org/draft/2020-12/meta/applicator"
introduced_in: draft6
interdependencies:
  - vocabulary: validation
    keyword: minContains
  - vocabulary: validation
    keyword: maxContains
related:
  - vocabulary: applicator
    keyword: prefixItems
  - vocabulary: applicator
    keyword: items
  - vocabulary: validation
    keyword: minItems
  - vocabulary: validation
    keyword: maxItems
  - vocabulary: validation
    keyword: uniqueItems
  - vocabulary: unevaluated
    keyword: unevaluatedItems
---

Annotations
-----------

This keyword produces an annotation value which is an array of the indexes to
which this keyword validates successfully when applying its subschema, in
ascending order. The value is the empty array if the instance is empty. The
value MAY be a boolean "true" if the subschema validates successfully when
applied to every index of the instance.
