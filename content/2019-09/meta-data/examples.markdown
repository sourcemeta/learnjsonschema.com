---
keyword: "examples"
signature: "Array<Any>"
value: This keyword must be set to an array of JSON values that preferrably successfully validates against the corresponding subschema
summary: "This keyword is used to provide sample JSON values associated with a particular schema, for the purpose of illustrating usage."
kind: [ "annotation" ]
instance: [ "any" ]
specification: "https://json-schema.org/draft/2019-09/draft-handrews-json-schema-validation-02#rfc.section.9.5"
metaschema: "https://json-schema.org/draft/2019-09/meta/meta-data"
default:
  value: "[]"
tests:
  - draft2019-09/optional/refOfUnknownKeyword.json
introduced_in: draft6
annotation:
   description: The set of examples set by this keyword
   kind: [ "array" ]
related:
  - vocabulary: meta-data
    keyword: title
  - vocabulary: meta-data
    keyword: description
  - vocabulary: meta-data
    keyword: default
  - vocabulary: meta-data
    keyword: readOnly
  - vocabulary: meta-data
    keyword: writeOnly
  - vocabulary: meta-data
    keyword: deprecated
---
