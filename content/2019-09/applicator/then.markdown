---
keyword: "then"
signature: "Schema"
value: This keyword must be set to a valid JSON Schema
summary: "When [`if`](/2019-09/applicator/if) is present, and the instance successfully validates against its subschema, then validation succeeds against this keyword if the instance also successfully validates against this keyword's subschema."
kind: [ "applicator" ]
instance: [ "any" ]
specification: "https://json-schema.org/draft/2019-09/draft-handrews-json-schema-02#rfc.section.9.2.2.2"
metaschema: "https://json-schema.org/draft/2019-09/meta/applicator"
default:
  value: "{}"
tests:
  - draft2019-09/if-then-else.json
index: -9999
introduced_in: draft7
interdependencies:
  - vocabulary: applicator
    keyword: if
related:
  - vocabulary: applicator
    keyword: else
  - vocabulary: applicator
    keyword: allOf
  - vocabulary: applicator
    keyword: anyOf
  - vocabulary: applicator
    keyword: oneOf
  - vocabulary: applicator
    keyword: not
---
