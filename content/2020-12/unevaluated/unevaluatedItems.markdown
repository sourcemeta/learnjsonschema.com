---
keyword: "unevaluatedItems"
signature: "Schema"
value: This keyword must be set to a valid JSON Schema
summary: "Validates array elements that did not successfully validate against other standard array applicators."
kind: [ "applicator", "annotation" ]
instance: [ "array" ]
specification: "https://json-schema.org/draft/2020-12/json-schema-core.html#section-11.2"
metaschema: "https://json-schema.org/draft/2020-12/meta/unevaluated"
default:
  value: "{}"
tests:
  - draft2020-12/unevaluatedItems.json
introduced_in: 2019-09
annotation:
   description: A boolean true if it applied to any item of the instance
   kind: [ "boolean" ]
interdependencies:
  - vocabulary: applicator
    keyword: prefixItems
  - vocabulary: applicator
    keyword: items
  - vocabulary: applicator
    keyword: contains
related:
  - vocabulary: unevaluated
    keyword: unevaluatedProperties
---

The [`unevaluatedItems`]({{< ref "2020-12/unevaluated/unevaluateditems" >}})
keyword is a generalisation of the [`items`]({{< ref "2020-12/applicator/items"
>}}) keyword that considers related keywords even when they are not direct
siblings of this keyword. More specifically, this keyword is affected by
occurrences of [`prefixItems`]({{< ref "2020-12/applicator/prefixitems" >}}),
[`items`]({{< ref "2020-12/applicator/items" >}}), [`contains`]({{< ref
"2020-12/applicator/contains" >}}), and [`unevaluatedItems`]({{< ref
"2020-12/unevaluated/unevaluateditems"
>}}) itself, as long as the evaluate path that led to
[`unevaluatedItems`]({{< ref "2020-12/unevaluated/unevaluateditems"
>}}) is a _prefix_ of the evaluate path of the others.

Given its evaluation-dependent nature, this keyword is evaluated after every
other keyword from every other vocabulary.

{{<best-practice>}}

There are two common use cases for this keyword, both for reducing duplication:
(1) Elegantly describing additional array items while declaring the
[`prefixItems`]({{< ref "2020-12/applicator/prefixitems" >}}) or
[`contains`]({{< ref "2020-12/applicator/contains" >}}) keywords behind
conditional logic without duplicating the [`items`]({{< ref
"2020-12/applicator/items"
>}}) keyword in every possible branch. (2) Reusing
helpers that consist of the [`prefixItems`]({{< ref
"2020-12/applicator/prefixitems" >}}), [`items`]({{< ref
"2020-12/applicator/items" >}}), or [`contains`]({{< ref
"2020-12/applicator/contains" >}}) keywords, while specialising the helpers as
needed in specific locations without having to inline the entire contents of
the helper.

{{</best-practice>}}

{{<learning-more>}}

The JSON Schema specification defines the relationship between this keyword and
the ones that affect it in terms of annotations. However, in practice, most
implementations avoid the use of annotations for performance reasons, as
emitting annotations and checking the annotation values of other keywords often
involves significant memory allocation and complex data structure traversals.

The paper [Elimination of annotation dependencies in validation for Modern JSON
Schema](https://arxiv.org/abs/2503.11288) is a comprehensive mathematical study
of how applicators can be automatically re-written to avoid annotation
dependencies, leading to schemas that are simpler to evaluate.

{{</learning-more>}}

{{<constraint-warning `array`>}}

## Examples

{{<schema `A schema that conditionally constrains array instances to contain certain items, with number additional items in both cases`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "if": { "maxItems": 3 },
  "then": { "prefixItems": [ { "type": "string" } ] },
  "else": { "contains": { "type": "boolean" } },
  "unevaluatedItems": { "type": "number" }
}
{{</schema>}}

{{<instance-pass `An array value that contains a string property and other number items is valid`>}}
[ "foo", 1, 2 ]
{{</instance-pass>}}

{{<instance-annotation>}}
{ "keyword": "/then/prefixItems", "instance": "", "value": 0 }
{ "keyword": "/unevaluatedItems", "instance": "", "value": true }
{{</instance-annotation>}}

{{<instance-pass `An array value that contains multiple boolean and number items is valid`>}}
[ true, 1, false, 2, true, 3 ]
{{</instance-pass>}}

{{<instance-annotation>}}
{ "keyword": "/else/contains", "instance": "", "value": [ 0, 2, 4 ] }
{ "keyword": "/unevaluatedItems", "instance": "", "value": true }
{{</instance-annotation>}}

{{<instance-fail `An array value that contains a string property and other non-number items is invalid`>}}
[ "foo", "bar", "baz" ]
{{</instance-fail>}}

{{<instance-fail `An array value that contains multiple boolean and number items, and string additional items is invalid`>}}
[ true, 2, "foo", "bar" ]
{{</instance-fail>}}

{{<instance-pass `An empty array value is valid`>}}
{}
{{</instance-pass>}}

{{<instance-pass `A non-array value is valid`>}}
"Hello World"
{{</instance-pass>}}

{{<schema `A schema that constraints array instances to only allow a single string item using a helper`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$ref": "#/$defs/string-first-item",
  "unevaluatedItems": false,
  "$defs": {
    "string-first-item": {
      "prefixItems": [ { "type": "string" } ]
    }
  }
}
{{</schema>}}

{{<instance-pass `An array value that only contains a string item is valid`>}}
[ "foo" ]
{{</instance-pass>}}

{{<instance-annotation>}}
{ "keyword": "/$defs/string-first-item/prefixItems", "instance": "", "value": 0 }
{{</instance-annotation>}}

{{<instance-fail `An array value that contains a string item and other items is invalid`>}}
[ "foo", 2, 3 ]
{{</instance-fail>}}

{{<instance-pass `An empty array value is valid`>}}
{}
{{</instance-pass>}}

{{<instance-pass `A non-array value is valid`>}}
"Hello World"
{{</instance-pass>}}

{{<schema `A schema that constraints array instances to not define any items, as both array keywords are cousins`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "allOf": [
    { "items": true },
    { "unevaluatedItems": false }
  ]
}
{{</schema>}}

{{<instance-fail `An array value that contains any item is invalid as the schema prohibits unevaluated items`>}}
[ 1, 2, 3 ]
{{</instance-fail>}}

{{<instance-pass `An empty array value is valid`>}}
[]
{{</instance-pass>}}

{{<instance-pass `A non-array value is valid`>}}
"Hello World"
{{</instance-pass>}}

{{<schema `A schema that constraints array instances to define arbitrary items`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "allOf": [ { "unevaluatedItems": true } ],
  "unevaluatedItems": false
}
{{</schema>}}

{{<instance-pass `An array value that contains any item is valid as the nested applicator takes precedence`>}}
[ 1, 2, 3 ]
{{</instance-pass>}}

{{<instance-annotation>}}
{ "keyword": "/allOf/0/unevaluatedItems", "instance": "", "value": true }
{{</instance-annotation>}}

{{<instance-pass `An empty array value is valid`>}}
{}
{{</instance-pass>}}

{{<instance-pass `A non-array value is valid`>}}
"Hello World"
{{</instance-pass>}}
