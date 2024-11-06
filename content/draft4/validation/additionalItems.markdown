---
keyword: "additionalItems"
signature: "Schema | Boolean"
value: This keyword must be set to a valid JSON Schema
summary: "If [`items`](/draft4/validation/items) is set to an array of schemas, validation succeeds if each element of the instance not covered by it validates against this schema. If set to `false`, no additional items are allowed in the array instance."
kind: [ "applicator" ]
instance: [ "array" ]
specification: "https://json-schema.org/draft-04/draft-fge-json-schema-validation-00#rfc.section.5.3.1"
metaschema: "http://json-schema.org/draft-04/schema#"
default:
  value: "{}"
tests:
  - draft4/additionalItems.json
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
    keyword: uniqueItems
---
