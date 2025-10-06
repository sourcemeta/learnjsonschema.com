---
keyword: "$recursiveAnchor"
signature: "Boolean"
value: This keyword must be set to a boolean that determines whether the reference destination is must be determined by examining the dynamic scope or not
summary: "This keyword is used to dynamically identify a base URI at runtime by marking where such a calculation can start, and where it stops."
kind: [ "identifier" ]
instance: [ "any" ]
specification: "https://json-schema.org/draft/2019-09/draft-handrews-json-schema-02#rfc.section.8.2.4.2.2"
metaschema: "https://json-schema.org/draft/2019-09/meta/core"
default:
  value: "false"
tests:
  - draft2019-09/recursiveRef.json
introduced_in: 2019-09
affects:
  - vocabulary: core
    keyword: $ref
  - vocabulary: core
    keyword: $recursiveRef
related:
  - vocabulary: core
    keyword: $id
  - vocabulary: core
    keyword: $anchor
---

The `$recursiveAnchor` keyword is a boolean flag used together with
[`$recursiveRef`]({{< ref "2019-09/core/recursiveref" >}}) to enable dynamic
schema resolution. When set to `true` at the root of a schema, it marks that
schema as a potential target for dynamic reference resolution.

When a [`$recursiveRef`]({{< ref "2019-09/core/recursiveref" >}}) with
fragment `"#"` is encountered during evaluation, the evaluator searches backward
through the dynamic evaluation path to find the outermost schema that has
`"$recursiveAnchor": true` at its root. That schema becomes the target of the
reference, rather than the lexical schema where the `$recursiveRef` was defined.

This mechanism is specifically designed for meta-schema extension scenarios,
where a base meta-schema needs to be extended with additional keywords or
constraints, and those extensions should apply recursively throughout nested
schema definitions.

{{<common-pitfall>}}The `$recursiveAnchor` keyword only has an effect when set
to `true` at the **root** of a schema (at the same level as `$id` or
`$schema`). Setting it to `true` in nested subschemas has no effect. This is a
key difference from `$dynamicAnchor` in JSON Schema 2020-12, which can be used
at any location with custom anchor names.{{</common-pitfall>}}

## Examples

{{<schema `A base meta-schema with $recursiveAnchor`>}}
{
  "$schema": "https://json-schema.org/draft/2019-09/schema",
  "$id": "https://example.com/meta/base",
  "$recursiveAnchor": true,
  "type": "object",
  "properties": {
    "type": { "type": "string" }
  }
}
{{</schema>}}

{{<schema `An extended meta-schema that also has $recursiveAnchor`>}}
{
  "$schema": "https://json-schema.org/draft/2019-09/schema",
  "$id": "https://example.com/meta/extended",
  "$recursiveAnchor": true,
  "$ref": "https://example.com/meta/base",
  "properties": {
    "custom": { "type": "boolean" }
  }
}
{{</schema>}}

When using the extended meta-schema with `$recursiveRef: "#"`, the reference
will resolve to the extended meta-schema (the outermost schema with
`$recursiveAnchor: true`), ensuring that custom keywords are validated even in
nested schema definitions. Without `$recursiveAnchor`, the reference would only
resolve to the base meta-schema.