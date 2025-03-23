---
keyword: "then"
signature: "Schema"
value: This keyword must be set to a valid JSON Schema
summary: "When [`if`](/draft7/validation/if) is present, and the instance successfully validates against its subschema, then validation succeeds against this keyword if the instance also successfully validates against this keyword's subschema."
kind: [ "applicator" ]
instance: [ "any" ]
specification: "https://json-schema.org/draft-07/draft-handrews-json-schema-validation-01#rfc.section.6.6.2"
metaschema: "http://json-schema.org/draft-07/schema#"
default:
  value: "{}"
tests:
  - draft7/if-then-else.json
introduced_in: draft7
interdependencies:
  - vocabulary: validation
    keyword: if
related:
  - vocabulary: validation
    keyword: else
  - vocabulary: validation
    keyword: allOf
  - vocabulary: validation
    keyword: anyOf
  - vocabulary: validation
    keyword: oneOf
  - vocabulary: validation
    keyword: not
---
