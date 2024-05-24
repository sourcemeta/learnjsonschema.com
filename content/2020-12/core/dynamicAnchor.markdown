---
keyword: "$dynamicAnchor"
signature: "String"
value: This keyword must be set to a string starting with a letter and containing letters, digits, hyphens, underscores, colons, or periods
summary: "This keyword is used to create plain name fragments that are not tied to any particular structural location for referencing purposes, which are taken into consideration for dynamic referencing."
kind: [ "identifier" ]
instance: [ "any" ]
specification: "https://json-schema.org/draft/2020-12/json-schema-core.html#section-8.2.2"
metaschema: "https://json-schema.org/draft/2020-12/meta/core"
tests:
  - draft2020-12/dynamicRef.json
introduced_in: 2020-12
affects:
  - vocabulary: core
    keyword: $ref
  - vocabulary: core
    keyword: $dynamicRef
related:
  - vocabulary: core
    keyword: $id
  - vocabulary: core
    keyword: $anchor
---

The `$dynamicAnchor` keyword allows the creation of plain name fragments that are not tied to a particular structural location within a schema. This is particularly useful for making subschemas reusable and relocatable without needing to update JSON Pointer references. Unlike `$anchor`, `$dynamicAnchor` indicates an extension point when used with the `$dynamicRef` keyword, facilitating the extension of recursive schemas without imposing specific semantics on that extension. Without `$dynamicRef`, `$dynamicAnchor` behaves the same as `$anchor`.

## Examples

{{<schema `A '$dynamicRef' resolves to the first '$dynamicAnchor' still in scope that is encountered when the schema is evaluated`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://example.com/root",
  "$ref": "list",
  "$defs": {
    "foo": {
      "$dynamicAnchor": "items",
      "type": "string"
    },
    "list": {
      "$id": "list",
      "type": "array",
      "items": {
        "$dynamicRef": "#items"
      },
      "$defs": {
        "items": {
          "$comment": "This is only needed to satisfy the bookending requirement",
          "$dynamicAnchor": "items"
        }
      }
    }
  }
}
{{</schema>}}

{{<instance-pass `An array of strings is valid`>}}
[ "foo", "bar" ]
{{</instance-pass>}}

{{<instance-fail `An array containing non-strings is invalid`>}}
[ "foo", 42 ]
{{</instance-fail>}}

* _A `$dynamicRef` referencing a `$dynamicAnchor` within the same schema resource functions similarly to a standard `$ref` referencing an `$anchor`. Similarly, a `$dynamicRef` referencing an `$anchor` within the same schema resource behaves like a typical `$ref` referencing an `$anchor`. Likewise, a `$ref` targeting a `$dynamicAnchor` within the same schema resource behaves like a regular `$ref` targeting an `$anchor`._