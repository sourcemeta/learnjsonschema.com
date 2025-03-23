---
keyword: "maximum"
signature: "Number"
value: This keyword must be set to a number
summary: "Validation succeeds if the numeric instance is less than or less than or equal to the given number, depending on the value of [`exclusiveMaximum`](/draft4/validation/exclusiveMaximum), if any"
kind: [ "assertion" ]
instance: [ "number" ]
specification: "https://json-schema.org/draft-04/draft-fge-json-schema-validation-00#rfc.section.5.1.2"
metaschema: "http://json-schema.org/draft-04/schema#"
tests:
  - draft4/maximum.json
introduced_in: draft1
index: -9998
interdependencies:
  - vocabulary: validation
    keyword: exclusiveMaximum
related:
  - vocabulary: validation
    keyword: minimum
  - vocabulary: validation
    keyword: exclusiveMaximum
  - vocabulary: validation
    keyword: exclusiveMinimum
  - vocabulary: validation
    keyword: multipleOf
---
