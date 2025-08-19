---
keyword: "additionalProperties"
signature: "Schema"
value: This keyword must be set to a valid JSON Schema
summary: "Validation succeeds if the schema validates against each value not matched by other object applicators in this vocabulary."
kind: [ "applicator" ]
instance: [ "object" ]
specification: "https://json-schema.org/draft-07/draft-handrews-json-schema-validation-01#rfc.section.6.5.6"
metaschema: "http://json-schema.org/draft-07/schema#"
tests:
  - draft7/additionalProperties.json
default:
  value: "{}"
introduced_in: draft0
index: -4
interdependencies:
  - vocabulary: validation
    keyword: properties
  - vocabulary: validation
    keyword: patternProperties
related:
  - vocabulary: validation
    keyword: dependencies
  - vocabulary: validation
    keyword: propertyNames
  - vocabulary: validation
    keyword: required
  - vocabulary: validation
    keyword: minProperties
  - vocabulary: validation
    keyword: maxProperties
---
