---
keyword: "additionalProperties"
signature: "Schema | Boolean"
value: This keyword must be set to a valid JSON Schema
summary: "Validation succeeds if the schema validates against each value not matched by other object applicators in this vocabulary. If set to a boolean, no additional properties are allowed in the instance."
kind: [ "applicator" ]
instance: [ "object" ]
specification: "https://json-schema.org/draft-03/draft-zyp-json-schema-03.pdf#5.4"
metaschema: "http://json-schema.org/draft-03/schema#"
tests:
  - draft3/additionalProperties.json
default:
  value: "{}"
introduced_in: draft0
index: -99987
interdependencies:
  - vocabulary: core
    keyword: properties
  - vocabulary: core
    keyword: patternProperties
related:
  - vocabulary: core
    keyword: dependencies
  - vocabulary: core
    keyword: required
---
