---
keyword: "$anchor"
signature: "String"
summary: "This keyword is used to create plain name fragments that are not tied to any particular structural location for referencing purposes, which are taken into consideration for static referencing."
kind: [ "identifier" ]
instance: [ "any" ]
specification: "https://json-schema.org/draft/2020-12/json-schema-core.html#section-8.2.2"
metaschema: "https://json-schema.org/draft/2020-12/meta/core"
introduced_in: 2019-09
related:
  - vocabulary: core
    keyword: $id
  - vocabulary: core
    keyword: $ref
  - vocabulary: core
    keyword: $dynamicRef
  - vocabulary: core
    keyword: $dynamicAnchor
---

The `$anchor` keyword is used to assign a unique identifier to a subschema within its schema resource. This identifier can then be referenced elsewhere using the `$ref` keyword.

* Its value must be a valid identifier starting with a letter and containing letters, digits, hyphens, underscores, colons, or periods.
* The `$anchor` keyword allows for the creation of plain reusable name fragments that aren't tied to specific structural locations, offering a flexible alternative to using JSON Pointer fragments, which require knowledge of the schema's structure.
* An anchor is resolved against the base URI of its schema resource.

## Examples

{{<schema `Schema with a named anchor (identifier)`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$ref": "#string",
  "$defs": {
    "string": {
      "$anchor": "string",
      "type": "string"
    }
  }
}
{{</schema>}}

{{<instance-pass `An instance with a string is valid`>}}
"Hello World!"
{{</instance-pass>}}

{{<instance-fail `An instance with a number is invalid`>}}
44
{{</instance-fail>}}

{{<schema `Schema with identifiers having absolute URI`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "properties": {
    "name": { "$ref": "https://example.com/person/name#name" },
    "age": { "$ref": "https://example.com/person/age#age" }
  },
  "required": [ "name", "age" ],
  "$defs": {
    "name": {
      "$id": "https://example.com/person/name",
      "$anchor": "name",
      "type": "string"
    },
    "age": {
      "$id": "https://example.com/person/age",
      "$anchor": "age",
      "type": "integer"
    }
  }
}
{{</schema>}}

{{<instance-pass `An instance adhering to the schema is valid`>}}
{
  "name": "John",
  "age": 55
}
{{</instance-pass>}}

{{<instance-fail `The value of age must be an integer`>}}
{
  "name": "foo",
  "age": "bar"
}
{{</instance-fail>}}

{{<schema `Schema with location-independent identifier having base URI change in subschema`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://example.com/base",
  "$ref": "https://example.com/nested#foo",
  "$defs": {
    "foo": {
      "$id": "nested",
      "$anchor": "foo",
      "type": "integer"
    }
  }
}
{{</schema>}}

{{<instance-pass `An instance with integer is valid`>}}
99
{{</instance-pass>}}

{{<instance-fail `An instance with boolean is invalid`>}}
true
{{</instance-fail>}}
- Here the URI Reference of `foo` subschema is resolved to `https://example.com/nested` and the named anchor is used in the URI fragment to reference this subschema.