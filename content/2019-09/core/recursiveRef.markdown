---
keyword: "$recursiveRef"
signature: "URI Reference"
value: This keyword must be set to an absolute URI or a relative reference as defined by [RFC 3986](https://www.rfc-editor.org/info/rfc3986), where its fragment (if any) can consist of a JSON Pointer as defined by [RFC 6901](https://datatracker.ietf.org/doc/html/rfc6901)
summary: "This keyword is used to reference an identified schema, deferring the full resolution until runtime, at which point it is resolved each time it is encountered while evaluating an instance."
kind: [ "applicator" ]
instance: [ "any" ]
specification: "https://json-schema.org/draft/2019-09/draft-handrews-json-schema-02#rfc.section.8.2.4.2.1"
metaschema: "https://json-schema.org/draft/2019-09/meta/core"
tests:
  - draft2019-09/recursiveRef.json
introduced_in: 2019-09
interdependencies:
  - vocabulary: core
    keyword: $id
  - vocabulary: core
    keyword: $recursiveAnchor
  - vocabulary: core
    keyword: $anchor
related:
  - vocabulary: core
    keyword: $ref
  - vocabulary: core
    keyword: $defs
---

The `$recursiveRef` keyword is used together with [`$recursiveAnchor`]({{< ref
"2019-09/core/recursiveanchor" >}}) to enable dynamic referencing for recursive
structures, particularly useful for extending meta-schemas. This keyword works
by looking up the dynamic scope at runtime to find the appropriate schema to
reference.

In 2019-09, `$recursiveRef` is limited to referencing the schema root (using
`"#"` as the fragment). When a `$recursiveRef` with fragment `"#"` is
encountered, the evaluator looks back through the dynamic evaluation path to
find the outermost schema that has `"$recursiveAnchor": true` at its root, and
uses that schema for validation.

This mechanism is primarily used in JSON Schema meta-schemas to allow proper
extension and customization of vocabularies.

{{<common-pitfall>}}In JSON Schema 2019-09, `$recursiveRef` only supports the
special empty fragment `"#"`. It cannot be used with named anchors or JSON
Pointer fragments. This limitation was addressed in JSON Schema 2020-12 with
the more flexible `$dynamicRef` and `$dynamicAnchor` keywords.{{</common-pitfall>}}

## Examples

{{<schema `A meta-schema that allows extending with custom properties using $recursiveRef`>}}
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

{{<schema `An extended meta-schema that adds validation for a custom property`>}}
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

{{<schema `A schema using the extended meta-schema with recursive references`>}}
{
  "$schema": "https://example.com/meta/extended",
  "type": "object",
  "properties": {
    "nested": { "$recursiveRef": "#" }
  }
}
{{</schema>}}

In this example, when `$recursiveRef` is evaluated in the `nested` property, it
will resolve to the extended meta-schema (the outermost schema with
`$recursiveAnchor: true`), allowing the `custom` property to be validated even
in nested schema definitions.