---
keyword: "items"
signature: "Schema | Array<Schema>"
value: This keyword must be set to a valid JSON Schema or to a *non-empty* array, where each item is a valid JSON Schema
summary: "If set to a schema, validation succeeds if each element of the instance validates against it, otherwise validation succeeds if each element of the instance validates against the schema at the same position, if any"
kind: [ "applicator" ]
instance: [ "array" ]
specification: "https://json-schema.org/draft-06/draft-wright-json-schema-validation-01#rfc.section.6.9"
metaschema: "http://json-schema.org/draft-06/schema#"
default:
  value: "{}"
tests:
  - draft6/items.json
introduced_in: draft1
changed_in:
  - 2020-12
index: -99
interdependencies:
  - vocabulary: validation
    keyword: minItems
  - vocabulary: validation
    keyword: maxItems
affects:
  - vocabulary: validation
    keyword: additionalItems
related:
  - vocabulary: validation
    keyword: additionalItems
  - vocabulary: validation
    keyword: contains
  - vocabulary: validation
    keyword: uniqueItems
---


The [`items`]({{< ref "draft6/validation/items" >}}) keyword is used to
validate array items and has two different modes of operation depending on the
type of its value:

- **Schema**: When set to a schema, [`items`]({{< ref "draft6/validation/items"
  >}}) validates that all items in the array instance validate against the
  given subschema.

- **Array**: When set to an array of schemas, [`items`]({{< ref
  "draft6/validation/items" >}}) validates each item in the array instance
  against the subschema at the corresponding position. Items beyond the length
  of the [`items`]({{< ref "draft6/validation/items" >}}) array can be
  validated using the [`additionalItems`]({{< ref
  "draft6/validation/additionalitems" >}}) keyword.

{{<common-pitfall>}}This keyword does not prevent an array instance from being
empty. If needed, use the [`minItems`]({{< ref "draft6/validation/minitems" >}}) to assert on the minimum bounds of the array.{{</common-pitfall>}}

{{<constraint-warning `array`>}}

## Examples

{{<schema `A schema that constrains array instances to consist of number items`>}}
{
  "$schema": "http://json-schema.org/draft-06/schema#",
  "items": { "type": "number" }
}
{{</schema>}}

{{<instance-pass `An array value that only consists of number items is valid`>}}
[ 1, -3.4, 54 ]
{{</instance-pass>}}

{{<instance-pass `An empty array value is valid`>}}
[]
{{</instance-pass>}}

{{<instance-fail `An array value that includes a non-number item is invalid`>}}
[ 1, -3.4, 54, "foo" ]
{{</instance-fail>}}

{{<instance-pass `A non-array value is valid`>}}
"Hello World"
{{</instance-pass>}}

{{<schema `A schema that constrains array instances to start with a boolean item followed by a number item`>}}
{
  "$schema": "http://json-schema.org/draft-06/schema#",
  "items": [ { "type": "boolean" }, { "type": "number" } ]
}
{{</schema>}}

{{<instance-pass `An array value that consists of a boolean item followed by a number item is valid`>}}
[ false, 35 ]
{{</instance-pass>}}

{{<instance-pass `An array value with additional items beyond the tuple is valid`>}}
[ false, 35, "foo", "bar" ]
{{</instance-pass>}}

{{<instance-fail `An array value where the first item is not a boolean is invalid`>}}
[ "not a boolean", 35 ]
{{</instance-fail>}}

{{<instance-fail `An array value where the second item is not a number is invalid`>}}
[ false, "not a number" ]
{{</instance-fail>}}

{{<instance-pass `An empty array value is valid`>}}
[]
{{</instance-pass>}}

{{<instance-pass `A non-array value is valid`>}}
"Hello World"
{{</instance-pass>}}

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
