---
keyword: "$vocabulary"
signature: "Object<URI, Boolean>"
value: This keyword must be set to an object where each key is a JSON Schema vocabulary URI and each value is a boolean that represents whether the corresponding vocabulary is considered optional (false) or required (true)
summary: "This keyword is used in dialect meta-schemas to identify the required and optional vocabularies available for use in schemas described by that dialect."
kind: [ "identifier" ]
instance: [ "any" ]
specification: "https://json-schema.org/draft/2019-09/draft-handrews-json-schema-02#rfc.section.8.1.2"
metaschema: "https://json-schema.org/draft/2019-09/meta/core"
default:
  description: Implementation dependent
tests:
  - draft2019-09/vocabulary.json
introduced_in: 2019-09
related:
  - vocabulary: core
    keyword: $id
  - vocabulary: core
    keyword: $schema
---
