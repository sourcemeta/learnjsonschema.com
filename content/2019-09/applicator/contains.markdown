---
keyword: "contains"
signature: "Schema"
value: This keyword must be set to a valid JSON Schema
summary: "Validation succeeds if the instance contains an element that validates against this schema."
kind: [ "applicator" ]
instance: [ "array" ]
specification: "https://json-schema.org/draft/2019-09/draft-handrews-json-schema-02#rfc.section.9.3.1.4"
metaschema: "https://json-schema.org/draft/2019-09/meta/applicator"
tests:
  - draft2019-09/contains.json
default:
  value: "{}"
introduced_in: draft6
interdependencies:
  - vocabulary: validation
    keyword: minContains
  - vocabulary: validation
    keyword: maxContains
related:
  - vocabulary: applicator
    keyword: items
  - vocabulary: applicator
    keyword: additionalItems
  - vocabulary: validation
    keyword: minItems
  - vocabulary: validation
    keyword: maxItems
  - vocabulary: validation
    keyword: uniqueItems
  - vocabulary: applicator
    keyword: unevaluatedItems
---
