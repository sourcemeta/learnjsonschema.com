---
keyword: "discriminator"
signature: "Object"
value: This keyword must be set to an object that declares a `propertyName` string and optionally a `mapping` object of string values and a `defaultMapping` string
summary: "Hints at which of the schemas of an adjacent [`oneOf`](/2020-12/applicator/oneof), [`anyOf`](/2020-12/applicator/anyof), or [`allOf`](/2020-12/applicator/allof) an object instance is expected to satisfy, without affecting the validation outcome."
kind: [ "other" ]
instance: [ "object" ]
specification: "https://spec.openapis.org/oas/v3.2.1.html#schema-discriminator"
metaschema: "https://spec.openapis.org/oas/3.2/meta/2026-02-26"
index: -9999
introduced_in: openapi-3.1
interdependencies:
  - vocabulary: applicator
    keyword: oneOf
  - vocabulary: applicator
    keyword: anyOf
  - vocabulary: applicator
    keyword: allOf
  - vocabulary: validation
    keyword: required
related:
  - vocabulary: openapi-3.1
    keyword: discriminator
  - vocabulary: applicator
    keyword: oneOf
  - vocabulary: applicator
    keyword: anyOf
  - vocabulary: applicator
    keyword: allOf
  - vocabulary: validation
    keyword: enum
---
