---
keyword: "writeOnly"
signature: "Boolean"
value: This keyword must be set to a boolean value
summary: "This keyword indicates that the value is never present when the instance is retrieved from the owning authority."
kind: [ "annotation" ]
instance: [ "any" ]
specification: "https://json-schema.org/draft/2019-09/draft-handrews-json-schema-validation-02#rfc.section.9.4"
metaschema: "https://json-schema.org/draft/2019-09/meta/meta-data"
default:
  value: false
introduced_in: draft7
annotation:
   description: The boolean value set by this keyword
   kind: [ "boolean" ]
related:
  - vocabulary: meta-data
    keyword: readOnly
  - vocabulary: meta-data
    keyword: title
  - vocabulary: meta-data
    keyword: description
  - vocabulary: meta-data
    keyword: examples
  - vocabulary: meta-data
    keyword: default
  - vocabulary: meta-data
    keyword: deprecated
---
