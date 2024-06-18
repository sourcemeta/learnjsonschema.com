---
keyword: "contentMediaType"
signature: "String"
value: This keyword should be set to a valid media type as defined in [RFC 2046](https://www.rfc-editor.org/rfc/rfc2046.html), like the registered [IANA](https://www.iana.org/assignments/media-types/media-types.xhtml) media types
summary: "This keyword declares the media type of the string instance."
kind: [ "annotation" ]
instance: [ "string" ]
specification: "https://json-schema.org/draft/2019-09/draft-handrews-json-schema-validation-02#rfc.section.8.4"
metaschema: "https://json-schema.org/draft/2019-09/meta/content"
tests:
  - draft2019-09/content.json
introduced_in: draft7
annotation:
   description: The content media type set by this keyword
   kind: [ "string" ]
affects:
  - vocabulary: content
    keyword: contentSchema
related:
  - vocabulary: content
    keyword: contentEncoding
---
