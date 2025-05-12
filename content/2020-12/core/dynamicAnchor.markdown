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


The [`$dynamicAnchor`]({{< ref "2020-12/core/dynamicanchor" >}}) keyword is an
extension of the [`$anchor`]({{< ref "2020-12/core/anchor" >}}) keyword that
not only associates a subschema with the given URI fragment identifier, but
also records this association in the [dynamic
scope](https://json-schema.org/blog/posts/dynamicref-and-generics).  When
resolving a dynamic anchor using the [`$dynamicRef`]({{< ref
"2020-12/core/dynamicref" >}}) keyword, the base URI of the origin is not
considered. Instead, evaluation jumps to the first encountered occurence of the
given dynamic anchor in the [stack of schema
resources](https://json-schema.org/blog/posts/understanding-lexical-dynamic-scopes#the-dynamic-scope-as-a-stack)
traversed so far.

In other words, **think of a schema declaring a dynamic anchor as offering an
overridable extension hook**.  For example, a schema that declares a dynamic
anchor `foo` says: _"I allow any parent schema to re-define this `foo`
subschema as they desire"_, while keeping the rest of the schema intact. 

{{<best-practice>}}

Use dynamic references when you need to define generic and extensible schemas.
In fact, the dynamic referencing mechanism is a direct translation of generic
programming facilities like [C++ template
parameters](https://en.cppreference.com/w/cpp/language/template_parameters) and
[Java generics](https://en.wikipedia.org/wiki/Generics_in_Java) to JSON Schema.
See the blog post [Using Dynamic References to Support Generic
Types](https://json-schema.org/blog/posts/dynamicref-and-generics#using-dynamic-references-to-support-generic-types)
by Greg Dennis (co-author of the JSON Schema specification) for a hands-on
discussion of this concept.

{{</best-practice>}}

{{<learning-more>}}

The official JSON Schema meta-schemas define, by convention, a dynamic anchor
called `meta`. This is a fundamental building block for schema extensibility.
The meta-schema of every vocabulary (official or third-party) hooks into this
dynamic anchor to extend the recursive definition of what constitutes a valid
schema for the given dialect. 

More specifically, by relying on the `meta` dynamic anchor, a vocabulary
meta-schema can validate the presence of a new keyword and have those
constraints be automatically discovered and applied by any applicator of any
other vocabulary (even future ones).

{{</learning-more>}}

{{<common-pitfall>}}

The schema resource from where the dynamic anchor lookup originates _must_
declare such dynamic anchor. Otherwise, the schema would be unusable until
another schema provides a definition for dynamic such anchor. This rule is
informally referred to as the _bookending requirement_.

{{</common-pitfall>}}

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
          "$dynamicAnchor": "items",
          "type": "number"
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

_**Note:** A `$dynamicRef` referencing a `$dynamicAnchor` within the same schema resource functions similarly to a standard `$ref` referencing an `$anchor`. Similarly, a `$dynamicRef` referencing an `$anchor` within the same schema resource behaves like a typical `$ref` referencing an `$anchor`. Likewise, a `$ref` targeting a `$dynamicAnchor` within the same schema resource behaves like a regular `$ref` targeting an `$anchor`._
