---
keyword: "unevaluatedProperties"
signature: "Schema"
value: This keyword must be set to a valid JSON Schema
summary: "Validates object properties that did not successfully validate against other standard object applicators."
kind: [ "applicator", "annotation" ]
instance: [ "object" ]
specification: "https://json-schema.org/draft/2019-09/draft-handrews-json-schema-02#rfc.section.9.3.2.4"
metaschema: "https://json-schema.org/draft/2019-09/meta/unevaluated"
default:
  value: "{}"
tests:
  - draft2019-09/unevaluatedProperties.json
introduced_in: 2019-09
annotation:
   description: The set of instance property names validated by this keyword's subschema
   kind: [ "array" ]
interdependencies:
  - vocabulary: applicator
    keyword: properties
  - vocabulary: applicator
    keyword: patternProperties
  - vocabulary: applicator
    keyword: additionalProperties
related:
  - vocabulary: applicator
    keyword: unevaluatedItems
---
