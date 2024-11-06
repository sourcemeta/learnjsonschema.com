---
keyword: "minItems"
signature: "Integer"
value: This keyword must be set to a zero or positive integer
summary: "An array instance is valid if its size is greater than, or equal to, the value of this keyword."
kind: [ "assertion" ]
instance: [ "array" ]
specification: "https://json-schema.org/draft-03/draft-zyp-json-schema-03.pdf#5.13"
metaschema: "http://json-schema.org/draft-03/schema#"
default:
  value: 0
tests:
  - draft3/minItems.json
introduced_in: draft1
index: -99977
related:
  - vocabulary: core
    keyword: items
  - vocabulary: core
    keyword: additionalItems
  - vocabulary: core
    keyword: maxItems
---

## Examples

{{<schema `Schema with 'minItems' keyword`>}}
{
  "$schema": "http://json-schema.org/draft-03/schema#",
  "type": "array",
  "minItems": 1,
  "items": {
    "type": "string"
  }
}
{{</schema>}}

{{<instance-pass `An array instance with greater than or equal to the minItems value is valid`>}}
["learn"]
{{</instance-pass>}}


{{<instance-fail `An array instance with less than the minItems value is invalid`>}}
[]
{{</instance-fail>}}
