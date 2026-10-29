---
keyword: "example"
signature: "Any"
value: This keyword must be set to any value
summary: "Declares a single example of an instance that this schema describes, superseded by the [`examples`](/2020-12/meta-data/examples) keyword."
kind: [ "other" ]
instance: [ "any" ]
specification: "https://spec.openapis.org/oas/v3.2.1.html#schema-example"
metaschema: "https://spec.openapis.org/oas/3.2/meta/2026-02-26"
index: -9
introduced_in: openapi-3.1
related:
  - vocabulary: openapi-3.1
    keyword: example
  - vocabulary: meta-data
    keyword: examples
  - vocabulary: meta-data
    keyword: default
  - vocabulary: meta-data
    keyword: deprecated
---

The [`example`]({{< ref "2020-12/openapi-3.2/example" >}}) keyword declares a
single example instance for the schema it occurs in, typically for
documentation purposes. This keyword does not affect validation and is not an
annotation.

{{<best-practice>}} Use the [`examples`]({{< ref "2020-12/meta-data/examples"
>}}) keyword instead. The OpenAPI Specification recommends reaching for this
one [only if compatibility with OAS v3.0 or earlier is
required](https://spec.openapis.org/oas/v3.2.1.html#choosing-which-field-s-to-use).
The vocabulary meta-schema also annotates this keyword as [`deprecated`]({{< ref
"2020-12/meta-data/deprecated" >}}). Validating a schema against that
meta-schema therefore reports the deprecation for you. {{</best-practice>}}

{{<learning-more>}} This keyword exists for historical reasons. The OpenAPI 3.0
Schema Object was based on [Draft 4](/draft4), which had no way of declaring
examples, as the [`examples`]({{< ref "draft6/validation/examples" >}}) keyword
only arrived in [Draft 6](/draft6). OpenAPI 3.0 therefore defined one of its
own.

OpenAPI 3.1 re-based the Schema Object on [2020-12](/2020-12). The
[Meta-Data]({{< ref "2020-12/meta-data" >}}) vocabulary of that dialect defines
[`examples`]({{< ref "2020-12/meta-data/examples" >}}), and OpenAPI 3.1
deprecated this keyword in that same release. {{</learning-more>}}

{{<common-pitfall>}} Do not confuse this keyword with the `example` and
`examples` properties that the Parameter, Header, and Media Type Objects
declare. Those are properties of an OpenAPI document rather than JSON Schema
keywords. {{</common-pitfall>}}

## Examples

{{<schema `A schema that constrains string instances and declares an example`>}}
{
  "$schema": "https://spec.openapis.org/oas/3.2/dialect/2026-02-26",
  "type": "string",
  "example": "John Doe"
}
{{</schema>}}

{{<instance-pass `A string value is valid, and the declared example plays no part in the outcome`>}}
"Jane Doe"
{{</instance-pass>}}

{{<instance-fail `A non-string value is invalid`>}}
42
{{</instance-fail>}}

{{<schema `A schema that declares an example contradicting its own constraints`>}}
{
  "$schema": "https://spec.openapis.org/oas/3.2/dialect/2026-02-26",
  "type": "string",
  "example": 42
}
{{</schema>}}

{{<instance-pass `A string value is valid, as this keyword is never evaluated against the instance`>}}
"Jane Doe"
{{</instance-pass>}}
