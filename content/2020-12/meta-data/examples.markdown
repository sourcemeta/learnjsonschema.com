---
keyword: "examples"
signature: "Array<Any>"
summary: "This keyword is used to provide sample JSON values associated with a particular schema, for the purpose of illustrating usage."
kind: [ "annotation" ]
instance: [ "any" ]
specification: "https://json-schema.org/draft/2020-12/json-schema-validation.html#section-9.5"
metaschema: "https://json-schema.org/draft/2020-12/meta/meta-data"
introduced_in: draft6
related:
  - vocabulary: meta-data
    keyword: title
  - vocabulary: meta-data
    keyword: description
  - vocabulary: meta-data
    keyword: default
  - vocabulary: meta-data
    keyword: readOnly
  - vocabulary: meta-data
    keyword: writeOnly
  - vocabulary: meta-data
    keyword: deprecated
---

Annotations
-----------

This keyword produces the list of examples as the annotation value.

## Explanation

The `examples` keyword is used to provide an array of example instances associated with a particular schema that should ideally validate against the schema. These examples serve to illustrate the intended structure and constraints defined by the schema. While these examples are not used for validation purposes, they are helpful for explaining the schema's effect and purpose to readers or users.



* The value of this keyword must be an array.
* `examples` does not affect data validation but serves as an informative annotation.
