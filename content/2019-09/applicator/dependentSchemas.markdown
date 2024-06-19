---
keyword: "dependentSchemas"
signature: "Object<String, Schema>"
value: This keyword must be set to an object where each value is a valid JSON Schema
summary: "This keyword specifies subschemas that are evaluated if the instance is an object and contains a certain property."
kind: [ "applicator" ]
instance: [ "object" ]
specification: "https://json-schema.org/draft/2019-09/draft-handrews-json-schema-02#rfc.section.9.2.2.4"
metaschema: "https://json-schema.org/draft/2019-09/meta/applicator"
default:
  value: "{}"
tests:
  - draft2019-09/dependentSchemas.json
index: -997
introduced_in: 2019-09
related:
  - vocabulary: validation
    keyword: required
  - vocabulary: validation
    keyword: dependentRequired
---
