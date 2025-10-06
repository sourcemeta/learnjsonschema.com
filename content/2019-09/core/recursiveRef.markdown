---
keyword: "$recursiveRef"
signature: "URI Reference"
value: This keyword must be set to the empty fragment `#`
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

The [`$recursiveRef`]({{< ref "2019-09/core/recursiveref" >}}) keyword is an
extension of the [`$ref`]({{< ref "2019-09/core/ref" >}}) keyword that enables
a schema to reference another schema by its recursive anchor, as declared by
the [`$recursiveAnchor`]({{< ref "2019-09/core/recursiveanchor" >}}) keyword.
When resolving a recursive anchor using this keyword, the base URI of the
origin is not considered. Instead, the evaluator looks in the [dynamic
scope](https://json-schema.org/blog/posts/dynamicref-and-generics) and jumps to
the first encountered occurence of the recursive anchor in the [stack of schema
resources](https://json-schema.org/blog/posts/understanding-lexical-dynamic-scopes#the-dynamic-scope-as-a-stack)
traversed so far.

In other words, **think of a schema declaring the recursive reference as a
reference that considers that its destination might have been re-defined by a
parent schema**.  For example, a schema that references the recursive anchor
says: _"jump to the location set by the recursive anchor, but if there are
overriden variants of it, jump to the first of those instead"_.

{{<common-pitfall>}}The [`$recursiveRef`]({{< ref "2019-09/core/recursiveref"
>}}) keyword only supports the special empty fragment `"#"` and it cannot be
used with named anchors or JSON Pointer fragments.{{</common-pitfall>}}

{{<best-practice>}} This advanced feature was only designed for supporting
meta-schemas.  Avoid using this keyword if you are not defining a meta-schema.
{{</best-practice>}}

{{<learning-more>}}

The official JSON Schema meta-schemas all define the recursive anchor.  as a
fundamental building block for schema extensibility.  The meta-schema of every
vocabulary (official or third-party) hooks into the recursive anchor to extend
the recursive definition of what constitutes a valid schema for the given
dialect.

More specifically, by relying on the recursive anchor, a vocabulary
meta-schema can validate the presence of a new keyword and have those
constraints be automatically discovered and applied by any applicator of any
other vocabulary (even future ones).

{{</learning-more>}}

{{<common-pitfall>}}

As a fallback, the specification allows the use of this keyword to reference
the current schema resource and recursive anchors. However, to avoid confusion
and keep your schemas easy to understand, don't rely on this fallback
behaviour.  Only make use of this keyword to reference the recursive anchor set
by the [`$recursiveAnchor`]({{< ref "2019-09/core/recursiveanchor" >}}).

{{</common-pitfall>}}

To debug which recursive anchor the evaluation process is jumping to, try the
[`jsonschema
validate`](https://github.com/sourcemeta/jsonschema/blob/main/docs/validate.markdown)
command with the `--trace` option. This option prints a trace of every step in
the evaluation process alongside the corresponding keywords and their
respective locations, letting you know which destination was preferred when
encountering a recursive reference. For example:

```sh
$ jsonschema validate custom-metaschema.json schema.json --trace
...

-> (push) "/$ref/allOf/1/$ref/properties/additionalProperties/$recursiveRef" (ControlDynamicAnchorJump)
   at "/additionalProperties"
   at keyword location "https://json-schema.org/draft/2019-09/meta/applicator#/properties/additionalProperties/$recursiveRef"
   at vocabulary "https://json-schema.org/draft/2019-09/vocab/core"

-> (push) "/$ref/allOf/1/$ref/properties/additionalProperties/$recursiveRef/properties" (LogicalWhenType)
   at "/additionalProperties"
   at keyword location "https://example.com/custom-metaschema#/properties"
   at vocabulary "https://json-schema.org/draft/2019-09/vocab/applicator"
...
```

## Examples

{{<schema `A custom meta-schema that extends the JSON Schema 2019-09 dialect with a custom keyword`>}}
{
  "$schema": "https://json-schema.org/draft/2019-09/schema",
  "$id": "https://example.com/custom-metaschema",
  "$recursiveAnchor": true,
  "$ref": "https://json-schema.org/draft/2019-09/schema",
  "properties": {
    "my-custom-keyword": { "type": "string" }
  }
}
{{</schema>}}

{{<instance-pass `An object with a top-level occurence of the custom keyword is valid`>}}
{ "my-custom-keyword": "foo" }
{{</instance-pass>}}

{{<instance-annotation>}}
{ "keyword": "/properties", "instance": "", "value": [ "my-custom-keyword" ] }
{{</instance-annotation>}}

{{<instance-pass `An object with a nested occurence of the custom keyword is valid`>}}
{ "additionalProperties": { "my-custom-keyword": "foo" } }
{{</instance-pass>}}

{{<instance-annotation>}}
{ "keyword": "/properties", "instance": "/additionalProperties", "value": [ "my-custom-keyword" ] }
{{</instance-annotation>}}

{{<instance-fail `An object with an incorrect nested occurence of the custom keyword is invalid`>}}
{ "additionalProperties": { "my-custom-keyword": 1 } }
{{</instance-fail>}}
