---
keyword: "id"
signature: "URI Reference"
value: This keyword must be set to an absolute URI or a relative reference as defined by [RFC 3986](https://www.rfc-editor.org/info/rfc3986)
summary: "This keyword declares an identifier for the schema resource."
kind: [ "identifier" ]
instance: [ "any" ]
specification: "https://json-schema.org/draft-04/draft-zyp-json-schema-04#rfc.section.7.2"
metaschema: "http://json-schema.org/draft-04/schema#"
tests:
  - draft4/optional/id.json
index: -999
introduced_in: draft3
affects:
  - vocabulary: core
    keyword: $ref
related:
  - vocabulary: core
    keyword: $schema
---
