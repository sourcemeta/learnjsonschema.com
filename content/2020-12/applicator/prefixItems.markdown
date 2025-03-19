---
keyword: "prefixItems"
signature: "Array<Schema>"
value: This keyword must be set to a *non-empty* array, where each item is a valid JSON Schema
summary: "Validation succeeds if each element of the instance validates against the schema at the same position, if any."
kind: [ "applicator", "annotation" ]
instance: [ "array" ]
specification: "https://json-schema.org/draft/2020-12/json-schema-core.html#section-10.3.1.1"
metaschema: "https://json-schema.org/draft/2020-12/meta/applicator"
default:
  logical_value: "[]"
tests:
  - draft2020-12/prefixItems.json
introduced_in: 2020-12
annotation:
   description: The largest index to which this keyword applied its subschema, or a boolean true if it was applied to every item of the instance
   kind: [ "number", "boolean" ]
affects:
  - vocabulary: applicator
    keyword: items
related:
  - vocabulary: applicator
    keyword: items
  - vocabulary: validation
    keyword: minItems
  - vocabulary: validation
    keyword: maxItems
  - vocabulary: applicator
    keyword: contains
  - vocabulary: validation
    keyword: minContains
  - vocabulary: validation
    keyword: maxContains
  - vocabulary: validation
    keyword: uniqueItems
  - vocabulary: unevaluated
    keyword: unevaluatedItems
---

The `prefixItems` keyword restricts a number of items from the start of an
array instance to validate against the given sequence of subschemas, where the
item at a given index in the array instance is evaluated against the subschema
at the given index in the `prefixItems` array, if any.  Information about the
number of subschemas that were evaluated against the array instance is reported
using annotations.

Array items outside the range described by the `prefixItems` keyword will be
evaluated against the [`items`]({{< ref "2020-12/applicator/items" >}})
keyword, if present.

{{<common-pitfall>}}This keyword does not restrict the size of the array. If
the array instance has fewer number of items that the given subschemas, only
such items will be validated. If needed, use the [`minItems`]({{< ref
"2020-12/validation/minitems" >}}) and the [`maxItems`]({{< ref
"2020-12/validation/maxitems" >}}) keywords to assert on the bounds of the
array.{{</common-pitfall>}}

{{<constraint-warning `array`>}}

## Examples

{{<schema `A schema that constrains array instances to start with a boolean value followed by a number value`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "prefixItems": [ { "type": "boolean" }, { "type": "number" } ]
}
{{</schema>}}

{{<instance-pass `An empty array value is valid`>}}
[]
{{</instance-pass>}}

{{<instance-annotation>}}
{ "keyword": "/prefixItems", "instance": "", "value": 0 }
{{</instance-annotation>}}

{{<instance-pass `An array value that consists of a boolean value is valid`>}}
[ false ]
{{</instance-pass>}}

{{<instance-annotation>}}
{ "keyword": "/prefixItems", "instance": "", "value": 1 }
{{</instance-annotation>}}

{{<instance-pass `An array value that consists of a boolean value followed by a number value is valid`>}}
[ false, 35 ]
{{</instance-pass>}}

{{<instance-annotation>}}
{ "keyword": "/prefixItems", "instance": "", "value": true }
{{</instance-annotation>}}

{{<instance-pass `An array value that consists of a boolean value followed by a number value and other items is valid`>}}
[ false, 35, "something", "else" ]
{{</instance-pass>}}

{{<instance-annotation>}}
{ "keyword": "/prefixItems", "instance": "", "value": 2 }
{{</instance-annotation>}}

{{<instance-fail `An array value that does not consist of a boolean value followed by a number value is invalid`>}}
[ true, false ]
{{</instance-fail>}}

{{<instance-pass `A non-array value is valid`>}}
"Hello World"
{{</instance-pass>}}

{{<schema `A schema that constrains array instances to start with a boolean value followed by a number value followed by strings`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "prefixItems": [ { "type": "boolean" }, { "type": "number" } ],
  "items": { "type": "string" }
}
{{</schema>}}

{{<instance-pass `An empty array value is valid`>}}
[]
{{</instance-pass>}}

{{<instance-annotation>}}
{ "keyword": "/prefixItems", "instance": "", "value": 0 }
{{</instance-annotation>}}

{{<instance-pass `An array value that consists of a boolean value is valid`>}}
[ false ]
{{</instance-pass>}}

{{<instance-annotation>}}
{ "keyword": "/prefixItems", "instance": "", "value": 1 }
{{</instance-annotation>}}

{{<instance-pass `An array value that consists of a boolean value followed by a number value is valid`>}}
[ false, 35 ]
{{</instance-pass>}}

{{<instance-annotation>}}
{ "keyword": "/prefixItems", "instance": "", "value": true }
{{</instance-annotation>}}

{{<instance-pass `An array value that consists of a boolean value followed by a number value and other string items is valid`>}}
[ false, 35, "foo", "bar" ]
{{</instance-pass>}}

{{<instance-annotation>}}
{ "keyword": "/prefixItems", "instance": "", "value": 2 }
{{</instance-annotation>}}

{{<instance-annotation>}}
{ "keyword": "/items", "instance": "", "value": true }
{{</instance-annotation>}}

{{<instance-fail `An array value that consists of a boolean value followed by a number value and other non-string items is invalid`>}}
[ false, 35, { "foo": "bar" } ]
{{</instance-fail>}}

{{<instance-pass `A non-array value is valid`>}}
"Hello World"
{{</instance-pass>}}
