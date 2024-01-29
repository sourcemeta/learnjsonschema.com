---
keyword: "$schema"
signature: "URI"
summary: "This keyword is both used as a JSON Schema dialect identifier and as a reference to a JSON Schema which describes the set of valid schemas written for this particular dialect."
kind: [ "identifier" ]
instance: [ "any" ]
specification: "https://json-schema.org/draft/2020-12/json-schema-core.html#section-8.1.1"
metaschema: "https://json-schema.org/draft/2020-12/meta/core"
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

## Examples

{{<schema "This declaration indicates that the schema follows the specifications outlined in JSON Schema Draft 2020-12">}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema"
}
{{</schema>}}

{{<schema "This declaration indicates that the schema follows the specifications outlined in JSON Schema Draft 7">}}
{
  "$schema": "http://json-schema.org/draft-07/schema#"
}
{{</schema>}}
