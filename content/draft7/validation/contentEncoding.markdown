---
keyword: "contentEncoding"
signature: "String"
value: This keyword should be set to a standard (to increase interoperability) encoding name such as those defined in [RFC 4648](https://www.rfc-editor.org/info/rfc4648) and [RFC 2045](https://www.rfc-editor.org/info/rfc2045.html)
summary: "The string instance should be interpreted as encoded binary data and decoded using the encoding named by this property."
kind: [ "annotation" ]
instance: [ "string" ]
specification: "https://json-schema.org/draft-07/draft-handrews-json-schema-validation-01#rfc.section.8.3"
metaschema: "http://json-schema.org/draft-07/schema#"
tests:
  - draft7/optional/content.json
introduced_in: draft7
index: 98
related:
  - vocabulary: validation
    keyword: contentMediaType
---
