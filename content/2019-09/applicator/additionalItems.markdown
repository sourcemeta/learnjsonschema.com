---
keyword: "additionalItems"
signature: "Schema"
value: This keyword must be set to a valid JSON Schema
summary: "If [`items`](/2019-09/applicator/items) is set to an array of schemas, validation succeeds if each element of the instance not covered by it validates against this schema."
kind: [ "applicator", "annotation" ]
instance: [ "array" ]
specification: "https://json-schema.org/draft/2019-09/draft-handrews-json-schema-02#rfc.section.9.3.1.2"
metaschema: "https://json-schema.org/draft/2019-09/meta/applicator"
default:
  value: "{}"
tests:
  - draft2019-09/additionalItems.json
introduced_in: draft3
annotation:
   description: A boolean true if it applied to any item of the instance
   kind: [ "boolean" ]
interdependencies:
  - vocabulary: applicator
    keyword: items
  - vocabulary: validation
    keyword: minItems
  - vocabulary: validation
    keyword: maxItems
affects:
  - vocabulary: applicator
    keyword: unevaluatedItems
related:
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
