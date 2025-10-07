---
keyword: "type"
signature: "String | Array<String | Schema>"
value: This keyword must be set to either a string that corresponds to one of the supported types, a *non-empty* array of unique strings or schemas that correspond to one of the supported types, or the value `any`. If the keyword is not defined or the value is not in the list of supported types, any type of value is acceptable.
summary: "Validation succeeds if the type of the instance matches the type represented by the given type, or matches at least one of the given types."
kind: [ "assertion" ]
instance: [ "any" ]
specification: "https://json-schema.org/draft-03/draft-zyp-json-schema-03.pdf#5.1"
metaschema: "http://json-schema.org/draft-03/schema#"
default:
  value: "\"any\""
tests:
  - draft3/type.json
index: -99995
introduced_in: draft1
changed_in:
  - draft4
---

We are looking for contributors to help us fully expand the documentation to
cover this dialect. If that sounds like you, [send a pull
request on GitHub](https://github.com/sourcemeta/learnjsonschema.com/pulls)!
