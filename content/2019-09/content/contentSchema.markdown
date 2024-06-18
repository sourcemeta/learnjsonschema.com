---
keyword: "contentSchema"
signature: "Schema"
value: This keyword must be set to a valid JSON Schema
summary: "This keyword declares a schema which describes the structure of the string."
kind: [ "annotation" ]
instance: [ "string" ]
specification: "https://json-schema.org/draft/2019-09/draft-handrews-json-schema-validation-02#rfc.section.8.5"
metaschema: "https://json-schema.org/draft/2019-09/meta/content"
default:
  value: "{}"
tests:
  - draft2019-09/content.json
introduced_in: 2019-09
annotation:
   description: The content schema set by this keyword
   kind: [ "object", "boolean" ]
interdependencies:
  - vocabulary: content
    keyword: contentMediaType
related:
  - vocabulary: content
    keyword: contentEncoding
---
