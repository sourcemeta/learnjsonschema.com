---
keyword: "propertyNames"
signature: "Schema"
value: This keyword must be set to a valid JSON Schema
summary: "Validation succeeds if the schema validates against every property name in the instance."
kind: [ "applicator" ]
instance: [ "object" ]
specification: "https://json-schema.org/draft-06/draft-wright-json-schema-validation-01#rfc.section.6.22"
metaschema: "http://json-schema.org/draft-06/schema#"
default:
  value: "{}"
index: -2
tests:
  - draft6/propertyNames.json
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
