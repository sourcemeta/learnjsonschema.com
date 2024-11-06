---
keyword: "disallow"
signature: "String | Array<String>"
value: This keyword is opposite of the `type` keyword. If the instance is set to either a string that corresponds to one of the supported types, or any instance matching the values in a *non-empty* array of unique strings that correspond to one of the supported types, the instance is invalid
summary: "Validation succeeds if the type of the instance does not match the type represented by the given type, or does not match at least one of the given types."
kind: [ "assertion" ]
instance: [ "any" ]
specification: "https://json-schema.org/draft-03/draft-zyp-json-schema-03.pdf#5.25"
metaschema: "http://json-schema.org/draft-03/schema#"
default:
  value: "[ \"null\", \"boolean\", \"object\", \"array\", \"number\", \"string\", \"any\"]"
tests:
  - draft3/disallow.json
index: -99994
introduced_in: draft1
removed_in: draft4
---
