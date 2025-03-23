---
keyword: "contentMediaType"
signature: "String"
value: This keyword should be set to a valid media type as defined in [RFC 2046](https://www.rfc-editor.org/rfc/rfc2046.html), like the registered [IANA](https://www.iana.org/assignments/media-types/media-types.xhtml) media types
summary: "This keyword declares the media type of the string instance."
kind: [ "annotation" ]
instance: [ "string" ]
specification: "https://json-schema.org/draft-07/draft-handrews-json-schema-validation-01#rfc.section.8.4"
metaschema: "http://json-schema.org/draft-07/schema#"
tests:
  - draft7/optional/content.json
introduced_in: draft7
index: 99
related:
  - vocabulary: validation
    keyword: contentEncoding
---
