---
keyword: "default"
signature: "Any"
value: This keyword must be set to a JSON value, preferrably that successfully validates against the corresponding subschema
summary: "This keyword can be used to supply a default JSON value associated with a particular schema."
kind: [ "annotation" ]
instance: [ "any" ]
specification: "https://json-schema.org/draft/2019-09/draft-handrews-json-schema-validation-02#rfc.section.9.2"
metaschema: "https://json-schema.org/draft/2019-09/meta/meta-data"
tests:
  - draft2019-09/default.json
introduced_in: draft1
annotation:
   description: The default value set by this keyword
   kind: [ "any" ]
related:
  - vocabulary: meta-data
    keyword: title
  - vocabulary: meta-data
    keyword: description
  - vocabulary: meta-data
    keyword: examples
  - vocabulary: meta-data
    keyword: readOnly
  - vocabulary: meta-data
    keyword: writeOnly
  - vocabulary: meta-data
    keyword: deprecated
---
