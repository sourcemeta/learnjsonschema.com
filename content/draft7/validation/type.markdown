---
keyword: "type"
signature: "String | Array<String>"
value: This keyword must be set to either a string that corresponds to one of the supported types, or a *non-empty* array of unique strings that correspond to one of the supported types
summary: "Validation succeeds if the type of the instance matches the type represented by the given type, or matches at least one of the given types."
kind: [ "assertion" ]
instance: [ "any" ]
specification: "https://json-schema.org/draft-07/draft-handrews-json-schema-validation-01#rfc.section.6.1.1"
metaschema: "http://json-schema.org/draft-07/schema#"
default:
  value: "[ \"null\", \"boolean\", \"object\", \"array\", \"number\", \"string\" ]"
tests:
  - draft7/type.json
index: -99999
introduced_in: draft1
changed_in:
  - draft4
---
