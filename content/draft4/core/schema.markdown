---
keyword: "$schema"
signature: "URI"
value: This keyword must be set to an absolute URI as defined by [RFC 3986](https://www.rfc-editor.org/info/rfc3986)
summary: "This keyword is both used as a JSON Schema dialect identifier and as a reference to a JSON Schema which describes the set of valid schemas written for this particular dialect."
kind: [ "identifier" ]
instance: [ "any" ]
specification: "https://json-schema.org/draft-04/draft-zyp-json-schema-04#rfc.section.6"
metaschema: "http://json-schema.org/draft-04/schema#"
default:
  description: Implementation dependent
index: -999
introduced_in: draft3
related:
  - vocabulary: core
    keyword: id
  - vocabulary: validation
    keyword: definitions
---
