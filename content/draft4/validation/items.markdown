---
keyword: "items"
signature: "Schema | Array<Schema>"
value: This keyword must be set to a valid JSON Schema or to a *non-empty* array, where each item is a valid JSON Schema
summary: "If set to a schema, validation succeeds if each element of the instance validates against it, otherwise validation succeeds if each element of the instance validates against the schema at the same position, if any"
kind: [ "applicator" ]
instance: [ "array" ]
specification: "https://json-schema.org/draft-04/draft-fge-json-schema-validation-00#rfc.section.5.3.1"
metaschema: "http://json-schema.org/draft-04/schema#"
default:
  value: "{}"
tests:
  - draft4/items.json
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
    keyword: uniqueItems
---
