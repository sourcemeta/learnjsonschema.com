---
keyword: "contentEncoding"
signature: "String"
value: This keyword should be set to a standard (to increase interoperability) encoding name such as those defined in [RFC 4648](https://www.rfc-editor.org/info/rfc4686) and [RFC 2045](https://www.rfc-editor.org/info/rfc2045.html)
summary: "The string instance should be interpreted as encoded binary data and decoded using the encoding named by this property."
kind: [ "annotation" ]
instance: [ "string" ]
specification: "https://json-schema.org/draft/2019-09/draft-handrews-json-schema-validation-02#rfc.section.8.3"
metaschema: "https://json-schema.org/draft/2019-09/meta/content"
tests:
  - draft2019-09/content.json
introduced_in: draft7
annotation:
   description: The content encoding name set by this keyword
   kind: [ "string" ]
related:
  - vocabulary: content
    keyword: contentMediaType
  - vocabulary: content
    keyword: contentSchema
---
