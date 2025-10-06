---
keyword: "additionalItems"
signature: "Schema"
value: This keyword must be set to a valid JSON Schema
summary: "If [`items`](/2019-09/applicator/items) is set to an array of schemas, validation succeeds if each element of the instance not covered by it validates against this schema."
kind: [ "applicator", "annotation" ]
instance: [ "array" ]
specification: "https://json-schema.org/draft/2019-09/draft-handrews-json-schema-02#rfc.section.9.3.1.2"
metaschema: "https://json-schema.org/draft/2019-09/meta/applicator"
default:
  value: "{}"
tests:
  - draft2019-09/additionalItems.json
introduced_in: draft3
annotation:
   description: A boolean true if it applied to any item of the instance
   kind: [ "boolean" ]
interdependencies:
  - vocabulary: applicator
    keyword: items
  - vocabulary: validation
    keyword: minItems
  - vocabulary: validation
    keyword: maxItems
affects:
  - vocabulary: applicator
    keyword: unevaluatedItems
related:
  - vocabulary: applicator
    keyword: contains
  - vocabulary: validation
    keyword: minContains
  - vocabulary: validation
    keyword: maxContains
  - vocabulary: validation
    keyword: uniqueItems
  - vocabulary: applicator
    keyword: unevaluatedItems
---

The `additionalItems` keyword restricts array instance items not described by
the _sibling_ [`items`]({{< ref "2019-09/applicator/items" >}}) keyword (when
[`items`]({{< ref "2019-09/applicator/items" >}}) is in array form), to
validate against the given subschema. Whether this keyword was evaluated
against any item of the array instance is reported using annotations.

{{<common-pitfall>}}This keyword **only** has an effect when the sibling
[`items`]({{< ref "2019-09/applicator/items" >}}) keyword is set to an array of
schemas. If [`items`]({{< ref "2019-09/applicator/items" >}}) is not present or is set to a schema (not an array),
[`additionalItems`]({{< ref "2019-09/applicator/additionalitems" >}}) has no effect and is ignored. This is a common source of
confusion.{{</common-pitfall>}}

{{<common-pitfall>}}This keyword does not prevent an array instance from being
empty or having fewer items than the [`items`]({{< ref "2019-09/applicator/items" >}}) array. If needed, use the
[`minItems`]({{< ref "2019-09/validation/minitems" >}}) to assert on the minimum
bounds of the array.{{</common-pitfall>}}

{{<constraint-warning `array`>}}

## Examples

{{<schema `A schema that constrains array instances to start with a boolean item followed by a number item, with only string items allowed beyond that`>}}
{
  "$schema": "https://json-schema.org/draft/2019-09/schema",
  "items": [ { "type": "boolean" }, { "type": "number" } ],
  "additionalItems": { "type": "string" }
}
{{</schema>}}

{{<instance-pass `An array value that consists of a boolean item followed by a number item is valid`>}}
[ false, 35 ]
{{</instance-pass>}}

{{<instance-annotation>}}
{ "keyword": "/items", "instance": "", "value": true }
{{</instance-annotation>}}

{{<instance-pass `An array value that consists of a boolean item followed by a number item and string items is valid`>}}
[ false, 35, "foo", "bar" ]
{{</instance-pass>}}

{{<instance-annotation>}}
{ "keyword": "/items", "instance": "", "value": 1 }
{ "keyword": "/additionalItems", "instance": "", "value": true }
{{</instance-annotation>}}

{{<instance-fail `An array value that consists of a boolean item followed by a number item and non-string items is invalid`>}}
[ false, 35, { "foo": "bar" } ]
{{</instance-fail>}}

{{<instance-pass `An empty array value is valid`>}}
[]
{{</instance-pass>}}

{{<instance-pass `A non-array value is valid`>}}
"Hello World"
{{</instance-pass>}}

{{<schema `A schema that prevents additional items beyond the tuple`>}}
{
  "$schema": "https://json-schema.org/draft/2019-09/schema",
  "items": [ { "type": "boolean" }, { "type": "number" } ],
  "additionalItems": false
}
{{</schema>}}

{{<instance-pass `An array value with exactly two items matching the tuple is valid`>}}
[ false, 35 ]
{{</instance-pass>}}

{{<instance-annotation>}}
{ "keyword": "/items", "instance": "", "value": true }
{{</instance-annotation>}}

{{<instance-fail `An array value with items beyond the tuple is invalid`>}}
[ false, 35, "foo" ]
{{</instance-fail>}}

{{<schema `A schema that demonstrates when this keyword has no effect`>}}
{
  "$schema": "https://json-schema.org/draft/2019-09/schema",
  "items": { "type": "number" },
  "additionalItems": { "type": "string" }
}
{{</schema>}}

{{<instance-pass `An array value with only numbers is valid`>}}
[ 1, 2, 3 ]
{{</instance-pass>}}

{{<instance-annotation>}}
{ "keyword": "/items", "instance": "", "value": true }
{{</instance-annotation>}}

{{<instance-pass `An array value with numbers and strings is valid as the keyword is ignored`>}}
[ 1, 2, "foo" ]
{{</instance-pass>}}

{{<instance-annotation>}}
{ "keyword": "/items", "instance": "", "value": true }
{{</instance-annotation>}}
