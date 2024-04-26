---
keyword: "prefixItems"
signature: "Array<Schema>"
summary: "Validation succeeds if each element of the instance validates against the schema at the same position, if any."
kind: [ "applicator", "annotation" ]
instance: [ "array" ]
specification: "https://json-schema.org/draft/2020-12/json-schema-core.html#section-10.3.1.1"
metaschema: "https://json-schema.org/draft/2020-12/meta/applicator"
introduced_in: 2020-12
related:
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
  - vocabulary: validation
    keyword: uniqueItems
  - vocabulary: unevaluated
    keyword: unevaluatedItems
---

Annotations
-----------

This keyword produces an annotation value which is the largest index to which
this keyword applied a subschema. The value MAY be a boolean true if a
subschema was applied to every index of the instance.
