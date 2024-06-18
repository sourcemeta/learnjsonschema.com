---
keyword: "propertyNames"
signature: "Schema"
value: This keyword must be set to a valid JSON Schema
summary: "Validation succeeds if the schema validates against every property name in the instance."
kind: [ "applicator" ]
instance: [ "object" ]
specification: "https://json-schema.org/draft/2019-09/draft-handrews-json-schema-02#rfc.section.9.3.2.5"
metaschema: "https://json-schema.org/draft/2019-09/meta/applicator"
default:
  value: "{}"
tests:
  - draft2019-09/propertyNames.json
index: -997
introduced_in: draft6
related:
  - vocabulary: applicator
    keyword: propertyNames
  - vocabulary: applicator
    keyword: patternProperties
  - vocabulary: applicator
    keyword: additionalProperties
  - vocabulary: applicator
    keyword: dependentSchemas
  - vocabulary: validation
    keyword: required
  - vocabulary: validation
    keyword: dependentRequired
  - vocabulary: validation
    keyword: minProperties
  - vocabulary: validation
    keyword: maxProperties
  - vocabulary: applicator
    keyword: unevaluatedProperties
---
