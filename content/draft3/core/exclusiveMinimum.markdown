---
keyword: "exclusiveMinimum"
signature: "Boolean"
value: This keyword must be set to a boolean value
summary: "When [`minimum`](/draft3/validation/minimum) is present and this keyword is set to true, the numeric instance must be greater than the value in [`minimum`](/draft3/validation/minimum)."
kind: [ "assertion" ]
instance: [ "number" ]
specification: "https://json-schema.org/draft-03/draft-zyp-json-schema-03.pdf#5.11"
metaschema: "http://json-schema.org/draft-03/schema#"
default:
  value: "false"
tests:
  - draft3/minimum.json
  - draft3/optional/bignum.json
introduced_in: draft3
changed_in:
  - draft6
index: -99937
affects:
  - vocabulary: core
    keyword: minimum
related:
  - vocabulary: core
    keyword: exclusiveMaximum
  - vocabulary: core
    keyword: maximum
  - vocabulary: core
    keyword: minimum
  - vocabulary: core
    keyword: divisibleBy
---

## Examples

{{<schema `Schema with 'exclusiveMinimum' keyword`>}}
{
  "$schema": "http://json-schema.org/draft-03/schema#",
  "type": "number",
  "minimum": 1.1,
  "exclusiveMinimum": true
}
{{</schema>}}

{{<instance-pass `A numeric instance greater than the minimum with the exclusiveMinimum keyword defined is valid`>}}
1.2
{{</instance-pass>}}

{{<instance-fail `A numeric instance less than or equal to the minimum with the exclusiveMinimum keyword defined is invalid`>}}
1.1
{{</instance-fail>}}
