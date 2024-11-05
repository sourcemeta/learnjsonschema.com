---
keyword: "additionalProperties"
signature: "Schema"
value: This keyword must be set to a valid JSON Schema
summary: "Validation succeeds if the schema validates against each value not matched by other object applicators in this vocabulary."
kind: [ "applicator" ]
instance: [ "object" ]
specification: "https://json-schema.org/draft-04/draft-fge-json-schema-validation-00#rfc.section.5.4.4"
metaschema: "http://json-schema.org/draft-04/schema#"
tests:
  - draft4/additionalProperties.json
default:
  value: "{}"
introduced_in: draft1
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
    keyword: required
  - vocabulary: validation
    keyword: minProperties
  - vocabulary: validation
    keyword: maxProperties
---
