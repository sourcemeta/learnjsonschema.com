---
keyword: "format"
signature: "String"
value: This keyword must be set to a string, preferrably one that is standardized by JSON Schema to ensure interoperability
summary: "Define semantic information about a string instance."
kind: [ "annotation" ]
instance: [ "string" ]
specification: "https://json-schema.org/draft/2019-09/draft-handrews-json-schema-validation-02#rfc.section.7.2.1"
metaschema: "https://json-schema.org/draft/2019-09/meta/format"
tests:
  - draft2019-09/format.json
introduced_in: draft1
changed_in:
  - draft3
  - draft4
  - draft6
  - draft7
annotation:
   description: The format name set by this keyword
   kind: [ "string" ]
---
