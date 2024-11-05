---
keyword: "properties"
signature: "Object<String, Schema>"
value: This keyword must be set to an object where each value is a valid JSON Schema
summary: "Validation succeeds if, for each name that appears in both the instance and as a name within this keyword's value, the child instance for that name successfully validates against the corresponding schema."
kind: [ "applicator" ]
instance: [ "object" ]
specification: "https://json-schema.org/draft-06/draft-wright-json-schema-validation-01#rfc.section.6.18"
metaschema: "http://json-schema.org/draft-06/schema#"
default:
  value: "{}"
tests:
  - draft6/properties.json
introduced_in: draft1
index: -6
affects:
  - vocabulary: validation
    keyword: additionalProperties
related:
  - vocabulary: validation
    keyword: patternProperties
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
