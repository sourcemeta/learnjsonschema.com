---
keyword: "minimum"
signature: "Number"
value: This keyword must be set to a number
summary: "Validation succeeds if the numeric instance is greater than or greater than or equal to the given number, depending on the value of [`exclusiveMinimum`](/draft4/validation/exclusiveMinimum), if any"
kind: [ "assertion" ]
instance: [ "number" ]
specification: "https://json-schema.org/draft-04/draft-fge-json-schema-validation-00#rfc.section.5.1.3"
metaschema: "http://json-schema.org/draft-04/schema#"
tests:
  - draft4/minimum.json
introduced_in: draft1
index: -9996
interdependencies:
  - vocabulary: validation
    keyword: exclusiveMinimum
related:
  - vocabulary: validation
    keyword: maximum
  - vocabulary: validation
    keyword: exclusiveMaximum
  - vocabulary: validation
    keyword: exclusiveMinimum
  - vocabulary: validation
    keyword: multipleOf
---
