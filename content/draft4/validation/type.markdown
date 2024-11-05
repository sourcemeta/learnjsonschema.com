---
keyword: "type"
signature: "String | Array<String>"
value: This keyword must be set to either a string that corresponds to one of the supported types, or a *non-empty* array of unique strings that correspond to one of the supported types
summary: "Validation succeeds if the type of the instance matches the type represented by the given type, or matches at least one of the given types."
kind: [ "assertion" ]
instance: [ "any" ]
specification: "https://json-schema.org/draft-04/draft-fge-json-schema-validation-00#rfc.section.5.5.2"
metaschema: "http://json-schema.org/draft-04/schema#"
default:
  value: "[ \"null\", \"boolean\", \"object\", \"array\", \"number\", \"string\" ]"
tests:
  - draft4/type.json
index: -99999
introduced_in: draft1
---
