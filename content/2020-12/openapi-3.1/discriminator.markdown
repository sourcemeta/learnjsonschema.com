---
keyword: "discriminator"
signature: "Object"
value: This keyword must be set to an object that declares a `propertyName` string and optionally a `mapping` object of string values
summary: "Hints at which of the schemas of an adjacent [`oneOf`](/2020-12/applicator/oneof), [`anyOf`](/2020-12/applicator/anyof), or [`allOf`](/2020-12/applicator/allof) an object instance is expected to satisfy, without affecting the validation outcome."
kind: [ "other" ]
instance: [ "object" ]
specification: "https://spec.openapis.org/oas/v3.1.2.html#schema-discriminator"
metaschema: "https://spec.openapis.org/oas/3.1/meta/base"
index: -9999
introduced_in: openapi-3.1
changed_in:
  - openapi-3.2
interdependencies:
  - vocabulary: applicator
    keyword: oneOf
  - vocabulary: applicator
    keyword: anyOf
  - vocabulary: applicator
    keyword: allOf
related:
  - vocabulary: openapi-3.2
    keyword: discriminator
  - vocabulary: applicator
    keyword: oneOf
  - vocabulary: applicator
    keyword: anyOf
  - vocabulary: applicator
    keyword: allOf
  - vocabulary: validation
    keyword: required
  - vocabulary: validation
    keyword: const
  - vocabulary: validation
    keyword: enum
---
