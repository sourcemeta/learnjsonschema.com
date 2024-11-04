---
keyword: "readOnly"
signature: "Boolean"
value: This keyword must be set to a boolean value
summary: "This keyword indicates that the value of the instance is managed exclusively by the owning authority, and attempts by an application to modify the value of this property are expected to be ignored or rejected by that owning authority."
kind: [ "annotation" ]
instance: [ "any" ]
specification: "https://json-schema.org/draft-07/draft-handrews-json-schema-validation-01#rfc.section.10.3"
metaschema: "http://json-schema.org/draft-07/schema#"
default:
  value: false
introduced_in: draft7
index: 9997
related:
  - vocabulary: validation
    keyword: writeOnly
  - vocabulary: validation
    keyword: title
  - vocabulary: validation
    keyword: description
  - vocabulary: validation
    keyword: examples
  - vocabulary: validation
    keyword: default
---
