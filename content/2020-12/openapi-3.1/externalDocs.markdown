---
keyword: "externalDocs"
signature: "Object"
value: This keyword must be set to an object that declares a `url` string, optionally a `description` string, and optionally any number of `x-` prefixed extensions
summary: "Points to an external resource that further documents the schema."
kind: [ "other" ]
instance: [ "any" ]
specification: "https://spec.openapis.org/oas/v3.1.2.html#schema-external-docs"
metaschema: "https://spec.openapis.org/oas/3.1/meta/base"
index: -99
introduced_in: openapi-3.1
interdependencies:
  - vocabulary: core
    keyword: $id
related:
  - vocabulary: openapi-3.2
    keyword: externalDocs
  - vocabulary: meta-data
    keyword: title
  - vocabulary: meta-data
    keyword: description
  - vocabulary: core
    keyword: $comment
---

The [`externalDocs`]({{< ref "2020-12/openapi-3.1/externaldocs" >}}) keyword
points to an external resource that further documents the schema it occurs in,
such as a reference page or a guide. It declares a required `url` and an
optional `description` that may use [CommonMark
0.27](https://spec.commonmark.org/0.27/) syntax. This keyword does not affect
validation and is not an annotation.

{{<common-pitfall>}} Only `x-` prefixed extensions may accompany the `url` and
`description` of this keyword's value. Any other property makes the schema
invalid against the vocabulary meta-schema. {{</common-pitfall>}}

{{<learning-more>}} The `url` may be a relative reference. Within a schema, the
OpenAPI Specification resolves it [against the nearest parent
`$id`](https://spec.openapis.org/oas/v3.1.2.html#relative-references-in-api-description-uris)
exactly as it resolves [`$ref`]({{< ref "2020-12/core/ref" >}}). The
[`jsonschema
bundle`](https://github.com/sourcemeta/jsonschema/blob/main/docs/bundle.markdown)
command rewrites such references accordingly. {{</learning-more>}}

{{<best-practice>}} Keep descriptions within plain [CommonMark
0.27](https://spec.commonmark.org/0.27/) so that they render everywhere. The
OpenAPI Specification sets that version as the [minimum that tooling must
support](https://spec.openapis.org/oas/v3.1.2.html#rich-text-formatting) when
rendering rich text. Any syntax beyond it is implementation-defined and not
interoperable. {{</best-practice>}}

## Examples

{{<schema `A schema that constrains object instances and points to its documentation`>}}
{
  "$schema": "https://spec.openapis.org/oas/3.1/dialect/base",
  "type": "object",
  "externalDocs": {
    "description": "The *Pet* data model",
    "url": "https://example.com/docs/pet.html"
  }
}
{{</schema>}}

{{<instance-pass `An object value is valid, and the declared documentation plays no part in the outcome`>}}
{ "kind": "cat" }
{{</instance-pass>}}

{{<instance-fail `A non-object value is invalid`>}}
"Misty"
{{</instance-fail>}}

{{<schema `A schema whose relative documentation references resolve against its identifier`>}}
{
  "$schema": "https://spec.openapis.org/oas/3.1/dialect/base",
  "$id": "https://example.com/schemas/pet",
  "externalDocs": { "url": "../docs/pet.html" },
  "properties": {
    "kind": {
      "type": "string",
      "externalDocs": {
        "url": "../docs/kind.html",
        "x-internal-id": 7
      }
    }
  }
}
{{</schema>}}

{{<instance-pass `An object value that matches the declared property is valid`>}}
{ "kind": "cat" }
{{</instance-pass>}}

{{<instance-fail `An object value that does not match the declared property is invalid`>}}
{ "kind": 7 }
{{</instance-fail>}}
