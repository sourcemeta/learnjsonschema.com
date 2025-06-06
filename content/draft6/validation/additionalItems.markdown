---
keyword: "additionalItems"
signature: "Schema"
value: This keyword must be set to a valid JSON Schema
summary: "If [`items`](/draft6/validation/items) is set to an array of schemas, validation succeeds if each element of the instance not covered by it validates against this schema."
kind: [ "applicator" ]
instance: [ "array" ]
specification: "https://json-schema.org/draft-06/draft-wright-json-schema-validation-01#rfc.section.6.10"
metaschema: "http://json-schema.org/draft-06/schema#"
default:
  value: "{}"
tests:
  - draft6/additionalItems.json
index: -98
introduced_in: draft3
interdependencies:
  - vocabulary: validation
    keyword: items
  - vocabulary: validation
    keyword: minItems
  - vocabulary: validation
    keyword: maxItems
related:
  - vocabulary: validation
    keyword: contains
  - vocabulary: validation
    keyword: uniqueItems
---
