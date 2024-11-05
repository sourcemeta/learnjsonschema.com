---
keyword: "exclusiveMaximum"
signature: "Boolean"
value: This keyword must be set to a boolean value
summary: "When [`maximum`](/draft4/validation/maximum) is present and this keyword is set to true, the numeric instance must be greater than the value in [`maximum`](/draft4/validation/maximum)."
summary: "Validation succeeds if the numeric instance is less than the given number."
kind: [ "assertion" ]
instance: [ "number" ]
specification: "https://json-schema.org/draft-04/draft-fge-json-schema-validation-00#rfc.section.5.1.2"
metaschema: "http://json-schema.org/draft-04/schema#"
default:
  value: "false"
tests:
  - draft4/maximum.json
introduced_in: draft3
index: -9997
affects:
  - vocabulary: validation
    keyword: maximum
related:
  - vocabulary: validation
    keyword: exclusiveMinimum
  - vocabulary: validation
    keyword: maximum
  - vocabulary: validation
    keyword: minimum
  - vocabulary: validation
    keyword: multipleOf
---
