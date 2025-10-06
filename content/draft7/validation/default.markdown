---
keyword: "default"
signature: "Any"
value: This keyword must be set to a JSON value, preferably that successfully validates against the corresponding subschema
summary: "This keyword can be used to supply a default JSON value associated with a particular schema."
kind: [ "annotation" ]
instance: [ "any" ]
specification: "https://json-schema.org/draft-07/draft-handrews-json-schema-validation-01#rfc.section.10.2"
metaschema: "http://json-schema.org/draft-07/schema#"
tests:
  - draft7/default.json
introduced_in: draft1
index: 9996
related:
  - vocabulary: validation
    keyword: title
  - vocabulary: validation
    keyword: description
  - vocabulary: validation
    keyword: examples
  - vocabulary: validation
    keyword: readOnly
  - vocabulary: validation
    keyword: writeOnly
---
