---
keyword: "extends"
signature: "URI Reference | Schema | Array<Schema>"
value: This keyword must be set to either a schema, a list of schemas, or a URI that points to a schema
summary: "Validation succeeds if the instance is valid against the schema or schemas defined by this keyword"
kind: [ "applicator" ]
instance: [ "any" ]
specification: "https://json-schema.org/draft-03/draft-zyp-json-schema-03.pdf#5.26"
metaschema: "http://json-schema.org/draft-03/schema#"
default:
  logical_value: "[]"
tests:
  - draft3/extends.json
index: -99996
introduced_in: draft1
removed_in: draft4
related:
  - vocabulary: core
    keyword: enum
---

We are looking for contributors to help us fully expand the documentation to
cover this dialect. If that sounds like you, [send a pull
request on GitHub](https://github.com/sourcemeta/learnjsonschema.com/pulls)!
