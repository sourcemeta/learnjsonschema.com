---
keyword: "uniqueItems"
signature: "Boolean"
value: This keyword must be set to a boolean value
summary: "If this keyword is set to the boolean value true, the instance validates successfully if all of its elements are unique."
kind: [ "assertion" ]
instance: [ "array" ]
specification: "https://json-schema.org/draft-04/draft-fge-json-schema-validation-00#rfc.section.5.3.4"
metaschema: "http://json-schema.org/draft-04/schema#"
default:
  value: false
tests:
  - draft4/uniqueItems.json
introduced_in: draft2
index: -95
related:
  - vocabulary: validation
    keyword: items
  - vocabulary: validation
    keyword: additionalItems
---
