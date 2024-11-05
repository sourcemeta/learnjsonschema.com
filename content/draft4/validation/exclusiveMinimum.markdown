---
keyword: "exclusiveMinimum"
signature: "Boolean"
value: This keyword must be set to a boolean value
summary: "When [`minimum`](/draft4/validation/minimum) is present and this keyword is set to true, the numeric instance must be less than the value in [`minimum`](/draft4/validation/maximum)."
kind: [ "assertion" ]
instance: [ "number" ]
specification: "https://json-schema.org/draft-04/draft-fge-json-schema-validation-00#rfc.section.5.1.3"
metaschema: "http://json-schema.org/draft-04/schema#"
default:
  value: "false"
tests:
  - draft4/minimum.json
introduced_in: draft3
index: -9995
affects:
  - vocabulary: validation
    keyword: minimum
related:
  - vocabulary: validation
    keyword: exclusiveMaximum
  - vocabulary: validation
    keyword: maximum
  - vocabulary: validation
    keyword: minimum
  - vocabulary: validation
    keyword: multipleOf
---
