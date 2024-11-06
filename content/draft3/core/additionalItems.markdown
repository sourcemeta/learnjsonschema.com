---
keyword: "additionalItems"
signature: "Schema | Boolean"
value: This keyword must be set to a valid JSON Schema
summary: "If [`items`](/draft3/validation/items) is set to an array of schemas, validation succeeds if each element of the instance not covered by it validates against this schema. If set to a boolean, no additional items are allowed in the array instance."
kind: [ "applicator" ]
instance: [ "array" ]
specification: "https://json-schema.org/draft-03/draft-zyp-json-schema-03.pdf#5.6"
metaschema: "http://json-schema.org/draft-03/schema#"
default:
  value: "{}"
tests:
  - draft3/additionalItems.json
index: -99978
introduced_in: draft3
interdependencies:
  - vocabulary: core
    keyword: items
  - vocabulary: core
    keyword: minItems
  - vocabulary: core
    keyword: maxItems
related:
  - vocabulary: core
    keyword: uniqueItems
---
