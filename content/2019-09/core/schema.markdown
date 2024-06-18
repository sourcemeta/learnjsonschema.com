---
keyword: "$schema"
signature: "URI"
value: This keyword must be set to an absolute URI as defined by [RFC 3986](https://www.rfc-editor.org/info/rfc3986)
summary: "This keyword is both used as a JSON Schema dialect identifier and as a reference to a JSON Schema which describes the set of valid schemas written for this particular dialect."
kind: [ "identifier" ]
instance: [ "any" ]
specification: "https://json-schema.org/draft/2019-09/draft-handrews-json-schema-02#rfc.section.8.1.1"
metaschema: "https://json-schema.org/draft/2019-09/meta/core"
default:
  description: Implementation dependent
index: -999
introduced_in: draft3
related:
  - vocabulary: core
    keyword: $id
  - vocabulary: core
    keyword: $vocabulary
  - vocabulary: core
    keyword: $defs
---
