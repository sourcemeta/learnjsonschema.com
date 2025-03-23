---
keyword: "unevaluatedItems"
signature: "Schema"
value: This keyword must be set to a valid JSON Schema
summary: "Validates array elements that did not successfully validate against other standard array applicators."
kind: [ "applicator", "annotation" ]
instance: [ "array" ]
specification: "https://json-schema.org/draft/2019-09/draft-handrews-json-schema-02#rfc.section.9.3.1.3"
metaschema: "https://json-schema.org/draft/2019-09/meta/applicator"
default:
  value: "{}"
tests:
  - draft2019-09/unevaluatedItems.json
introduced_in: 2019-09
annotation:
   description: A boolean true if it applied to any item of the instance
   kind: [ "boolean" ]
interdependencies:
  - vocabulary: applicator
    keyword: items
  - vocabulary: applicator
    keyword: additionalItems
related:
  - vocabulary: applicator
    keyword: unevaluatedProperties
---
