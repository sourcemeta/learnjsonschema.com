---
keyword: "exclusiveMaximum"
signature: "Boolean"
value: This keyword must be set to a boolean value
summary: "When [`maximum`](/draft3/core/maximum) is present and this keyword is set to true, the numeric instance must be less than the value in [`maximum`](/draft3/core/maximum)."
summary: "Validation succeeds if the numeric instance is less than the given number."
kind: [ "assertion" ]
instance: [ "number" ]
specification: "https://json-schema.org/draft-03/draft-zyp-json-schema-03.pdf#5.12"
metaschema: "http://json-schema.org/draft-03/schema#"
default:
  value: "false"
tests:
  - draft3/maximum.json
  - draft3/optional/bignum.json
introduced_in: draft3
changed_in:
  - draft6
index: -99935
affects:
  - vocabulary: core
    keyword: maximum
related:
  - vocabulary: core
    keyword: exclusiveMinimum
  - vocabulary: core
    keyword: maximum
  - vocabulary: core
    keyword: minimum
  - vocabulary: core
    keyword: divisibleBy
---

## Examples

{{<schema `Schema with 'exclusiveMaximum' keyword`>}}
{
  "$schema": "http://json-schema.org/draft-03/schema#",
  "type": "number",
  "maximum": 3.0,
  "exclusiveMaximum": true
}
{{</schema>}}

{{<instance-pass `A numeric instance less than the maximum with the exclusiveMaximum keyword defined is valid`>}}
2.2
{{</instance-pass>}}


{{<instance-fail `A numeric instance greater than or equal to the maximum with the exclusiveMaximum keyword defined is invalid`>}}
3.0
{{</instance-fail>}}
