---
keyword: "items"
signature: "Schema | Array<Schema>"
value: This keyword must be set to a valid JSON Schema or to a *non-empty* array, where each item is a valid JSON Schema
summary: "If set to a schema, validation succeeds if each element of the instance validates against it. If set to an array, validation succeeds if each element of the instance validates against the schema at the same position, if any."
kind: [ "applicator" ]
instance: [ "array" ]
specification: "https://json-schema.org/draft-03/draft-zyp-json-schema-03.pdf#5.5"
metaschema: "http://json-schema.org/draft-03/schema#"
default:
  value: "{}"
tests:
  - draft3/items.json
introduced_in: draft1
changed_in:
  - 2020-12
index: -99979
interdependencies:
  - vocabulary: core
    keyword: minItems
  - vocabulary: core
    keyword: maxItems
affects:
  - vocabulary: core
    keyword: additionalItems
related:
  - vocabulary: core
    keyword: additionalItems
  - vocabulary: core
    keyword: uniqueItems
---
