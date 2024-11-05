---
keyword: "type"
signature: "String | Array<String>"
value: This keyword must be set to either a string that corresponds to one of the supported types, or a *non-empty* array of unique strings that correspond to one of the supported types
summary: "Validation succeeds if the type of the instance matches the type represented by the given type, or matches at least one of the given types."
kind: [ "assertion" ]
instance: [ "any" ]
specification: "https://json-schema.org/draft/2019-09/draft-handrews-json-schema-validation-02#rfc.section.6.1.1"
metaschema: "https://json-schema.org/draft/2019-09/meta/validation"
default:
  value: "[ \"null\", \"boolean\", \"object\", \"array\", \"number\", \"string\" ]"
tests:
  - draft2019-09/type.json
introduced_in: draft1
changed_in:
  - draft6
  - draft4
index: -99999
---
