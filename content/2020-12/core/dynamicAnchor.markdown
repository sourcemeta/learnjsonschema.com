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

The `$dynamicAnchor` keyword allows the creation of plain name fragments that are not tied to a particular structural location within a schema. This is particularly useful for making subschemas reusable and relocatable without needing to update JSON Pointer references. Unlike `$anchor`, `$dynamicAnchor` indicates an extension point when used with the `$dynamicRef` keyword, facilitating the extension of recursive schemas without imposing specific semantics on that extension.

## Examples

{{<schema ``>}}
{{</schema>}}