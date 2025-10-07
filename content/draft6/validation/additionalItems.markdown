---
keyword: "additionalItems"
signature: "Schema"
value: This keyword must be set to a valid JSON Schema
summary: "If [`items`](/draft6/validation/items) is set to an array of schemas, validation succeeds if each element of the instance not covered by it validates against this schema."
kind: [ "applicator" ]
instance: [ "array" ]
specification: "https://json-schema.org/draft-06/draft-wright-json-schema-validation-01#rfc.section.6.10"
metaschema: "http://json-schema.org/draft-06/schema#"
default:
  value: "{}"
tests:
  - draft6/additionalItems.json
index: -98
introduced_in: draft3
interdependencies:
  - vocabulary: validation
    keyword: items
  - vocabulary: validation
    keyword: minItems
  - vocabulary: validation
    keyword: maxItems
related:
  - vocabulary: validation
    keyword: contains
  - vocabulary: validation
    keyword: uniqueItems
---

The [`additionalItems`]({{< ref "draft6/validation/additionalitems" >}})
keyword restricts array instance items not described by the _sibling_
[`items`]({{< ref "draft6/validation/items" >}}) keyword (when [`items`]({{<
ref "draft6/validation/items" >}}) is in array form), to validate against the
given subschema.

{{<common-pitfall>}}This keyword **only** has an effect when the sibling
[`items`]({{< ref "draft6/validation/items" >}}) keyword is set to an array of
schemas. If [`items`]({{< ref "draft6/validation/items" >}}) is not present or
is set to a schema (not an array of schemas), [`additionalItems`]({{< ref
"draft6/validation/additionalitems" >}}) has no effect and is
ignored.{{</common-pitfall>}}

{{<common-pitfall>}}This keyword does not prevent an array instance from being
empty or having fewer items than the [`items`]({{< ref
"draft6/validation/items" >}}) array. If needed, use the [`minItems`]({{< ref
"draft6/validation/minitems" >}}) keyword to assert on the minimum bounds of the
array.{{</common-pitfall>}}

{{<constraint-warning `array`>}}

## Examples

{{<schema `A schema that constrains array instances to start with a boolean item followed by a number item, with only string items allowed beyond that`>}}
{
  "$schema": "http://json-schema.org/draft-06/schema#",
  "items": [ { "type": "boolean" }, { "type": "number" } ],
  "additionalItems": { "type": "string" }
}
{{</schema>}}

{{<instance-pass `An array value that consists of a boolean item followed by a number item is valid`>}}
[ false, 35 ]
{{</instance-pass>}}

{{<instance-pass `An array value that consists of a boolean item followed by a number item and string items is valid`>}}
[ false, 35, "foo", "bar" ]
{{</instance-pass>}}

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
  "$schema": "http://json-schema.org/draft-06/schema#",
  "items": [ { "type": "boolean" }, { "type": "number" } ],
  "additionalItems": false
}
{{</schema>}}

{{<instance-pass `An array value with exactly two items matching the tuple is valid`>}}
[ false, 35 ]
{{</instance-pass>}}

{{<instance-fail `An array value with items beyond the tuple is invalid`>}}
[ false, 35, "foo" ]
{{</instance-fail>}}

{{<schema `A schema that describes open items and additional items leads to the additional items schema being ignored`>}}
{
  "$schema": "http://json-schema.org/draft-06/schema#",
  "items": { "type": "number" },
  "additionalItems": { "type": "string" }
}
{{</schema>}}

{{<instance-pass `An array value with only numbers is valid`>}}
[ 1, 2, 3 ]
{{</instance-pass>}}

{{<instance-pass `An array value with numbers and strings is valid as the keyword is ignored`>}}
[ 1, 2, "foo" ]
{{</instance-pass>}}
{{<schema `A schema with only additional items definitions leads to the additional items schema being ignored`>}}
{
  "$schema": "http://json-schema.org/draft-06/schema#",
  "additionalItems": { "type": "string" }
}
{{</schema>}}

{{<instance-pass `Any array is valid`>}}
[ 1, 2, 3 ]
{{</instance-pass>}}

{{<instance-pass `A non-array value is valid`>}}
"Hello World"
{{</instance-pass>}}
