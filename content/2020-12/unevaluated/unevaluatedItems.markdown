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
occurences of [`prefixItems`]({{< ref "2020-12/applicator/prefixitems" >}}),
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
>}}) keyword in every possible branch. (2) Re-using
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

{{<schema `Schema with 'unevaluatedItems' set to boolean true`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "unevaluatedItems": true
}
{{</schema>}}

{{<instance-pass `All array instances pass against the true schema`>}}
[ "foo", "bar" ]
{{</instance-pass>}}

{{<instance-annotation>}}
{ "keyword": "/unevaluatedItems", "instance": "", "value": "true" }
{{</instance-annotation>}}

{{<instance-pass `'unevaluatedItems' does not have any effect on instances other than an array`>}}
"John Doe"
{{</instance-pass>}}

* Here, no items are defined in the above schema. Consequently, all items in an array instance are considered unevaluated, and the `unevaluatedItems` subschema applies to them. Since the subschema here is a boolean true, an instance with unevaluated items, regardless of their value, is considered valid.

{{<schema `Schema with 'unevaluatedItems' set to boolean false`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "unevaluatedItems": false
}
{{</schema>}}

{{<instance-fail `All object instances fail against the false schema`>}}
[ "foo", "bar" ]
{{</instance-fail>}}

{{<instance-pass `'unevaluatedItems' does not have any effect on instances other than an array`>}}
{ "John": 46 }
{{</instance-pass>}}

{{<schema `Schema with 'unevaluatedItems', 'prefixItems', and 'contains', with unevaluatedItems set to boolean false`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "prefixItems": [ { "type": "string" } ],
  "contains": { "type": "number" },
  "unevaluatedItems": false
}
{{</schema>}}

{{<instance-fail `An array instance with unevaluated items is invalid`>}}
[ "foo", 101, false ]
{{</instance-fail>}}

{{<instance-pass `An array instance with no unevaluated items is valid`>}}
[ "foo", 101, 77 ]
{{</instance-pass>}}

{{<instance-annotation>}}
{ "keyword": "/prefixItems", "instance": "", "value": 0 }
{ "keyword": "/contains", "instance": "", "value": [ 1, 2 ] }
{{</instance-annotation>}}

* For the first instance, the annotation result of `prefixItems` is 0, and the annotation result of `contains` is [ 1 ]. However, the item at 2nd index (i.e., `false`) remains unevaluated, so the `unevaluatedItems` subschema applies to it. This subschema fails (as any instance against a false schema is always invalid), leading to validation failure.

* For the second instance, the annotation result of `prefixItems` is 0, and the annotation result of contains is [ 1, 2 ]. No items remain unevaluated; hence, the instance is considered valid.

{{<schema `Schema with 'unevaluatedItems', 'prefixItems', and 'contains', with unevaluatedItems set to an object schema`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "prefixItems": [ { "type": "string" } ],
  "contains": { "type": "number" },
  "unevaluatedItems": { "type": "boolean" }
}
{{</schema>}}

{{<instance-pass `An array instance with no unevaluated items is valid`>}}
[ "foo", 101, 77 ]
{{</instance-pass>}}

{{<instance-annotation>}}
{ "keyword": "/prefixItems", "instance": "", "value": 0 }
{ "keyword": "/contains", "instance": "", "value": [ 1, 2 ] }
{{</instance-annotation>}}

{{<instance-pass `An array instance with unevaluated items that conform to the 'unevaluatedItems' subschema is valid`>}}
[ "foo", 101, false ]
{{</instance-pass>}}

{{<instance-annotation>}}
{ "keyword": "/prefixItems", "instance": "", "value": 0 }
{ "keyword": "/contains", "instance": "", "value": [ 1 ] }
{ "keyword": "/unevaluatedItems", "instance": "", "value": true }
{{</instance-annotation>}}

{{<instance-fail `An array instance with unevaluated items that do not conform to the 'unevaluatedItems' subschema is invalid`>}}
[ "foo", 101, [ false ] ]
{{</instance-fail>}}

* For the first instance, there are no unevaluated items.

* For the second instance, the item at 2nd index (i.e., `false`) remains unevaluated, and the `unevaluatedItems` subschema applies to it. This item conforms to this subschema, and hence the instance is valid.

{{<schema `Schema with 'unevaluatedItems', and 'allOf' keyword`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "prefixItems": [ { "type": "string" } ],
  "allOf" : [
    {
      "prefixItems": [
        true,
        { "type": "boolean" }
      ]
    }
  ],
  "unevaluatedItems": { "type": "number" }
}
{{</schema>}}

{{<instance-pass `An array instance with unevaluated items that conform to the 'unevaluatedItems' subschema is valid`>}}
[ "foo", false, 22 ]
{{</instance-pass>}}

{{<instance-annotation>}}
{ "keyword": "/prefixItems", "instance": "", "value": 0 }
{ "keyword": "/allOf/0/prefixItems", "instance": "", "value": 1 }
{ "keyword": "/unevaluatedItems", "instance": "", "value": true }
{{</instance-annotation>}}

{{<instance-fail `An array instance with unevaluated items that do not conform to the 'unevaluatedItems' subschema is invalid`>}}
[ "foo", 101, [ false ] ]
{{</instance-fail>}}

For the above two instances, the annotation result of top level `prefixItems` is 0, and the annotation result of the nested `prefixItems` is 1. The `unevaluatedItems` recognizes the annotations from top level `prefixItems` as well as nested `prefixItems` (as it can see through adjacent and nested applicators as only the produced annotations matter, not the schema structure) and ensures that the item at index 2 remains unevaluated and its subschema applies to it.

* The first instance passes as it conforms to the unevaluated subschema.
* The second instance fails as it does not conform to the unevaluated subschema.

{{<schema `Schema with 'unevaluatedItems', and 'allOf' keyword`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "prefixItems": [ { "type": "string" } ],
  "allOf" : [
    {
      "items": true
    }
  ],
  "unevaluatedItems": { "type": "number" }
}
{{</schema>}}

{{<instance-pass `An array instance with no unevaluated items is valid`>}}
[ "foo", false, 22 ]
{{</instance-pass>}}

{{<instance-annotation>}}
{ "keyword": "/prefixItems", "instance": "", "value": 0 }
{ "keyword": "/allOf/0/items", "instance": "", "value": true }
{{</instance-annotation>}}

* Here, the nested `items` evaluated all the unevaluated items. So there's nothing left unevaluated.

{{<schema `Schema with 'unevaluatedItems' and '#ref' keyword`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "prefixItems": [
    { "type": "string" },
    { "type": "boolean" }
  ],
  "$ref": "#/$defs/bar",
  "unevaluatedItems": false,
  "$defs": {
    "bar": {
      "contains": { "type": "number" }
    }
  }
}
{{</schema>}}

{{<instance-pass `An instance with no unevaluated items is valid`>}}
[ "foo", false, 22 ]
{{</instance-pass>}}

{{<instance-annotation>}}
{ "keyword": "/prefixItems", "instance": "", "value": 1 }
{ "keyword": "/$ref/contains", "instance": "", "value": [ 2 ] }
{{</instance-annotation>}}

{{<instance-fail `An instance with unevaluated items is invalid`>}}
[ "foo", false, "bar" ]
{{</instance-fail>}}

{{<schema `Schema with nested 'unevaluatedItems' keyword`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "prefixItems": [ { "type": "string" } ],
  "allOf" : [
    {
      "unevaluatedItems": true
    }
  ],
  "unevaluatedItems": false
}
{{</schema>}}

{{<instance-pass `No items left unevaluated for the top level 'unevaluatedItems'`>}}
[ "foo", false, "bar" ]
{{</instance-pass>}}

{{<instance-annotation>}}
{ "keyword": "/prefixItems", "instance": "", "value": 0 }
{ "keyword": "/allOf/0/unevaluatedItems", "instance": "", "value": true }
{{</instance-annotation>}}
