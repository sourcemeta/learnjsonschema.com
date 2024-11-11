---
keyword: "maxItems"
signature: "Integer"
value: This keyword must be set to a zero or positive integer
summary: "An array instance is valid if its size is less than, or equal to, the value of this keyword."
kind: [ "assertion" ]
instance: [ "array" ]
specification: "https://json-schema.org/draft-03/draft-zyp-json-schema-03.pdf#5.14"
metaschema: "http://json-schema.org/draft-03/schema#"
tests:
  - draft3/maxItems.json
introduced_in: draft1
index: -99976
related:
  - vocabulary: core
    keyword: items
  - vocabulary: core
    keyword: additionalItems
  - vocabulary: core
    keyword: minItems
---

## Examples

{{<schema `Schema with 'maxItems' keyword`>}}
{
  "$schema": "http://json-schema.org/draft-03/schema#",
  "type": "array",
  "maxItems": 3,
  "items": {
    "type": "string"
  }
}
{{</schema>}}

{{<instance-pass `An array instance with less than or equal to the maxItems value is valid`>}}
["learn", "json", "schema"]
{{</instance-pass>}}


{{<instance-fail `An array instance with greater than the maxItems value is invalid`>}}
["learn", "json", "schema", "draft3"]
{{</instance-fail>}}

