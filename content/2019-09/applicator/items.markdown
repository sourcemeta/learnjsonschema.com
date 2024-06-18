---
keyword: "items"
signature: "Schema | Array<Schema>"
value: This keyword must be set to a valid JSON Schema or to a *non-empty* array, where each item is a valid JSON Schema
summary: "If set to a schema, validation succeeds if each element of the instance validates against it, otherwise validation succeeds if each element of the instance validates against the schema at the same position, if any"
kind: [ "applicator", "annotation" ]
instance: [ "array" ]
specification: "https://json-schema.org/draft/2019-09/draft-handrews-json-schema-02#rfc.section.9.3.1.1"
metaschema: "https://json-schema.org/draft/2019-09/meta/applicator"
default:
  value: "{}"
tests:
  - draft2019-09/items.json
introduced_in: draft1
changed_in:
  - draft6
annotation:
   description: If set to a schema, a boolean true if it applied to any item of the instance, otherwise the largest index to which this keyword applied its subschema, or a boolean true if it was applied to every item of the instance
   kind: [ "number", "boolean" ]
interdependencies:
  - vocabulary: validation
    keyword: minItems
  - vocabulary: validation
    keyword: maxItems
affects:
  - vocabulary: applicator
    keyword: additionalItems
  - vocabulary: applicator
    keyword: unevaluatedItems
related:
  - vocabulary: applicator
    keyword: additionalItems
  - vocabulary: applicator
    keyword: contains
  - vocabulary: validation
    keyword: minContains
  - vocabulary: validation
    keyword: maxContains
  - vocabulary: validation
    keyword: uniqueItems
  - vocabulary: applicator
    keyword: unevaluatedItems
---
