---
keyword: "unevaluatedItems"
signature: "Schema"
summary: "Validates array elements that did not successfully validate against other standard array applicators."
kind: [ "applicator", "annotation" ]
instance: [ "array" ]
specification: "https://json-schema.org/draft/2020-12/json-schema-core.html#section-11.2"
metaschema: "https://json-schema.org/draft/2020-12/meta/unevaluated"
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
related:
  - vocabulary: unevaluated
    keyword: unevaluatedProperties
---

## Evaluation

Before delving into `unevaluatedItems`, it's crucial to understand what evaluation means in this context.

`unevaluatedItems` considers annotations from `prefixItems`, `items`, and `contains`, both as adjacent keywords and in subschemas of adjacent keywords. Additionally, it is also affected by other `unevaluatedItems` in nested schemas (if present).

- The keywords `prefixItems`, `items`, `contains` and `unevaluatedItems` produce annotations for the indexes they successfully validate against.
- If any of these keywords generate an annotation for a particular index, that index is considered as evaluated.
- By definition, the `unevaluatedItems` subschema is always applied after  `prefixItems`, `items`, and `contains` subschemas.
- As its name implies, `unevaluatedItems` applies to any array index that has not been previously evaluated.

## Explanation

If no relevant annotations are present, the `unevaluatedItems` subschema must be applied to all locations in the array. If a boolean true value is present from any of the relevant annotations, `unevaluatedItems` is ignored. Otherwise, the subschema must be applied to any index greater than the largest annotation value for `prefixItems`, which does not appear in any annotation value for `contains`.

- The value of `unevaluatedItems` must be a valid JSON Schema.
- If this keyword is applied to any instance element, it produces an annotation value of `true`.

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
[
  // ...
  {
    "valid": true,
    "keywordLocation": "/unevaluatedItems",
    "instanceLocation": "",
    "annotation": "true"
  },
  // ...
]
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
[
  // ...
  {
    "valid": true,
    "keywordLocation": "/prefixItems",
    "instanceLocation": "",
    "annotation": 0
  },
  {
    "valid": true,
    "keywordLocation": "/contains",
    "instanceLocation": "",
    "annotation": [ 1, 2 ]
  },
  // ...
]
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
[
  // ...
  {
    "valid": true,
    "keywordLocation": "/prefixItems",
    "instanceLocation": "",
    "annotation": 0
  },
  {
    "valid": true,
    "keywordLocation": "/contains",
    "instanceLocation": "",
    "annotation": [ 1, 2 ]
  },
  // ...
]
{{</instance-annotation>}}

{{<instance-pass `An array instance with unevaluated items that conform to the 'unevaluatedItems' subschema is valid`>}}
[ "foo", 101, false ]
{{</instance-pass>}}

{{<instance-annotation>}}
[
  // ...
  {
    "valid": true,
    "keywordLocation": "/prefixItems",
    "instanceLocation": "",
    "annotation": 0
  },
  {
    "valid": true,
    "keywordLocation": "/contains",
    "instanceLocation": "",
    "annotation": [ 1 ]
  },
  {
    "valid": true,
    "keywordLocation": "/unevaluatedItems",
    "instanceLocation": "",
    "annotation": true
  },
  // ...
]
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
[
  // ...
  {
    "valid": true,
    "keywordLocation": "/prefixItems",
    "instanceLocation": "",
    "annotation": 0
  },
  {
    "valid": true,
    "keywordLocation": "/allOf/0/prefixItems",
    "instanceLocation": "",
    "annotation": 1
  },
  {
    "valid": true,
    "keywordLocation": "/unevaluatedItems",
    "instanceLocation": "",
    "annotation": true
  },
  // ...
]
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
[
  // ...
  {
    "valid": true,
    "keywordLocation": "/prefixItems",
    "instanceLocation": "",
    "annotation": 0
  },
  {
    "valid": true,
    "keywordLocation": "/allOf/0/items",
    "instanceLocation": "",
    "annotation": true
  },
  // ...
]
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
[
  // ...
  {
    "valid": true,
    "keywordLocation": "/prefixItems",
    "instanceLocation": "",
    "annotation": 1
  },
  {
    "valid": true,
    "keywordLocation": "/$ref/contains",
    "instanceLocation": "",
    "annotation": [ 2 ]
  },
  // ...
]
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
[
  // ...
  {
    "valid": true,
    "keywordLocation": "/prefixItems",
    "instanceLocation": "",
    "annotation": 0
  },
  {
    "valid": true,
    "keywordLocation": "/allOf/0/unevaluatedItems",
    "instanceLocation": "",
    "annotation": true
  },
  // ...
]
{{</instance-annotation>}}
