---
keyword: "propertyNames"
signature: "Schema"
value: This keyword must be set to a valid JSON Schema
summary: "Validation succeeds if the schema validates against every property name in the instance."
kind: [ "applicator" ]
instance: [ "object" ]
specification: "https://json-schema.org/draft-07/draft-handrews-json-schema-validation-01#rfc.section.6.5.8"
metaschema: "http://json-schema.org/draft-07/schema#"
default:
  value: "{}"
index: -2
tests:
  - draft7/propertyNames.json
introduced_in: draft6
related:
  - vocabulary: validation
    keyword: patternProperties
  - vocabulary: validation
    keyword: additionalProperties
  - vocabulary: validation
    keyword: dependencies
  - vocabulary: validation
    keyword: required
  - vocabulary: validation
    keyword: minProperties
  - vocabulary: validation
    keyword: maxProperties
---
