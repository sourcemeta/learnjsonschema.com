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

If this keyword is applied to any instance element, it produces an annotation value of `true`.

## Explanation

First, let's understand what evaluation means. `unevaluatedItems` considers annotations from `prefixItems`, `items`, and `contains`, both as adjacent keywords and in subschemas of adjacent keywords. Additionally, `unevaluatedItems` is affected by other `unevaluatedItems` in nested schemas (if present). Each of these keywords will produce an annotation of the locations that they've evaluated in the array.
- For `items`, it's boolean true.
- For `prefixItems`, it is the largest index to which this keyword applied a subschema (the value may be a boolean true if a subschema was applied to every index of the instance).
- For `contains`, it is an array of the indexes to which this keyword validates successfully when applying its subschema, in ascending order (the value may be a boolean true if the subschema validates successfully when applied to every index of the instance).

If any of these are in subschemas of adjacent keywords, and those subschemas fail validation, those annotations are dropped in that case. The effect is that those properties are not considered evaluated.