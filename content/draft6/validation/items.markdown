---
keyword: "items"
signature: "Schema | Array<Schema>"
value: This keyword must be set to a valid JSON Schema or to a *non-empty* array, where each item is a valid JSON Schema
summary: "If set to a schema, validation succeeds if each element of the instance validates against it, otherwise validation succeeds if each element of the instance validates against the schema at the same position, if any"
kind: [ "applicator" ]
instance: [ "array" ]
specification: "https://json-schema.org/draft-06/draft-wright-json-schema-validation-01#rfc.section.6.9"
metaschema: "http://json-schema.org/draft-06/schema#"
default:
  value: "{}"
tests:
  - draft6/items.json
introduced_in: draft1
changed_in:
  - 2020-12
index: -99
interdependencies:
  - vocabulary: validation
    keyword: minItems
  - vocabulary: validation
    keyword: maxItems
affects:
  - vocabulary: validation
    keyword: additionalItems
related:
  - vocabulary: validation
    keyword: additionalItems
  - vocabulary: validation
    keyword: contains
  - vocabulary: validation
    keyword: uniqueItems
---
