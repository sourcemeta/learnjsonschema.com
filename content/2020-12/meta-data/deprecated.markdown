---
keyword: "deprecated"
signature: "Boolean"
summary: "This keyword indicates that applications should refrain from using the declared property."
kind: [ "annotation" ]
instance: [ "any" ]
specification: "https://json-schema.org/draft/2020-12/json-schema-validation.html#section-9.3"
metaschema: "https://json-schema.org/draft/2020-12/meta/meta-data"
introduced_in: 2019-09
related:
  - vocabulary: meta-data
    keyword: title
  - vocabulary: meta-data
    keyword: description
  - vocabulary: meta-data
    keyword: examples
  - vocabulary: meta-data
    keyword: default
  - vocabulary: meta-data
    keyword: readOnly
  - vocabulary: meta-data
    keyword: writeOnly
---

Annotations
-----------

This keyword produces the annotation value `true` if the keyword is set to `true`, or `false` otherwise.

## Explanation

The `deprecated` keyword is used to indicate that a particular property should not be used and may be removed in the future. It provides a warning to users or applications that certain parts of the schema or are no longer recommended for use.

* The value of this keyword must be a boolean.
* * Omitting these keywords has the same behavior as values of false.