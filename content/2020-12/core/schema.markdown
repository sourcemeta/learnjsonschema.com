---
keyword: "$schema"
signature: "URI"
value: This keyword must be set to an absolute URI as defined by [RFC 3986](https://www.rfc-editor.org/info/rfc3986)
summary: "This keyword is both used as a JSON Schema dialect identifier and as a reference to a JSON Schema which describes the set of valid schemas written for this particular dialect."
kind: [ "identifier" ]
instance: [ "any" ]
specification: "https://json-schema.org/draft/2020-12/json-schema-core.html#section-8.1.1"
metaschema: "https://json-schema.org/draft/2020-12/meta/core"
default:
  description: Implementation or context dependent
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

The `$schema` keyword serves to explicitly associate a schema or subschema with
the JSON Schema dialect that defines it, where the dialect is the identifier of
a meta-schema that defines the vocabularies in use and imposes syntactic
constraints on its schema instances. If the `$schema` keyword is not declared,
the schema inherits its context-specific or implementation-specific default
dialect.

{{<learning-more>}} It is common to not make use of the `$schema` keyword when
working with [OpenAPI](https://www.openapis.org). This is possible because the
OpenAPI specification clearly documents what the default JSON Schema dialect is
for every version. For example, [OpenAPI
v3.1.1](https://spec.openapis.org/oas/latest.html#json-schema-keywords) defines
the default dialect as `https://spec.openapis.org/oas/3.1/dialect/base`.
{{</learning-more>}}

Strictly-compliant JSON Schema implementations will refuse to process a schema
whose dialect cannot be unambiguously determined.

{{<best-practice>}} To avoid undefined behavior, it is generally recommended to
always explicitly set the dialect of a schema using the `$schema` keyword. This
ensures that less strict implementations unambiguously know how to process the
schema and don't attempt to guess.{{</best-practice>}}

Note that the `$schema` keyword can occur multiple times in the same schema,
and not only at the top-level. This is often the case when performing [JSON
Schema
Bundling](https://github.com/sourcemeta/jsonschema/blob/main/docs/bundle.markdown)
to inline externally referenced schemas that might be based on different
dialects of JSON Schema.

A schema is considered syntactic valid if it successfully validates against its
dialect meta-schema. You can validate a schema against its meta-schema using
the [`jsonschema
metaschema`](https://github.com/sourcemeta/jsonschema/blob/main/docs/metaschema.markdown).
For example:

```sh
$ jsonschema metaschema my-schema.json
```

## Examples

{{<schema `A schema described by the JSON Schema 2020-12 official dialect`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "string"
}
{{</schema>}}

{{<schema `A valid schema without an explicitly declared dialect, prone to undefined behavior`>}}
{
  "items": [ { "type": "number" } ]
}
{{</schema>}}

{{<schema `A valid schema that mixes the 2020-12 and 2019-09 official dialects`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "properties": {
    "price": { "type": "number" },
    "discount": {
      "$ref": "#/$defs/discount"
    }
  },
  "$defs": {
    "discount": {
      "$schema": "https://json-schema.org/draft/2019-09/schema",
      "type": "number"
    }
  }
}
{{</schema>}}
