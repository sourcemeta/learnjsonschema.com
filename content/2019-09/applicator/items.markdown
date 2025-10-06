---
keyword: "items"
signature: "Schema | Array<Schema>"
value: This keyword must be set to a valid JSON Schema or to a *non-empty* array, where each item is a valid JSON Schema
summary: "If set to a schema, validation succeeds if each element of the instance validates against it, otherwise validation succeeds if each element of the instance validates against the schema at the same position, if any"
kind: [ "applicator", "annotation" ]
instance: [ "array" ]
specification: "https://json-schema.org/draft/2019-09/draft-handrews-json-schema-02#rfc.section.9.3.1.1"
metaschema: "https://json-schema.org/draft/2019-09/meta/applicator"
default:
  value: "{}"
tests:
  - draft2019-09/items.json
introduced_in: draft1
changed_in:
  - draft6
annotation:
   description: If set to a schema, a boolean true if it applied to every item of the instance, otherwise the largest index to which this keyword applied its subschema, or a boolean true if it was applied to every item of the instance
   kind: [ "number", "boolean" ]
interdependencies:
  - vocabulary: validation
    keyword: minItems
  - vocabulary: validation
    keyword: maxItems
affects:
  - vocabulary: applicator
    keyword: additionalItems
  - vocabulary: applicator
    keyword: unevaluatedItems
related:
  - vocabulary: applicator
    keyword: additionalItems
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

The [`items`]({{< ref "2019-09/applicator/items" >}}) keyword is used to
validate array items and has two different modes of operation depending on the
type of its value:

- **Schema**: When set to a schema, [`items`]({{< ref
  "2019-09/applicator/items" >}}) validates that all items in the array
  instance validate against the given subschema. Whether this keyword was
  evaluated against any item of the array instance is reported using
  annotations.

- **Array**: When set to an array of schemas, [`items`]({{< ref
  "2019-09/applicator/items" >}}) validates each item in the array instance
  against the subschema at the corresponding position. Items beyond the length
  of the [`items`]({{< ref "2019-09/applicator/items" >}}) array can be
  validated using the [`additionalItems`]({{< ref
  "2019-09/applicator/additionalitems" >}}) keyword. The annotation reports the
  largest index to which a subschema was applied, or `true` if it was applied
  to every item.

{{<common-pitfall>}}This keyword does not prevent an array instance from being
empty. If needed, use the [`minItems`]({{< ref "2019-09/validation/minitems"
>}}) to assert on the minimum bounds of the array.{{</common-pitfall>}}

{{<constraint-warning `array`>}}

## Examples

{{<schema `A schema that constrains array instances to consist of number items`>}}
{
  "$schema": "https://json-schema.org/draft/2019-09/schema",
  "items": { "type": "number" }
}
{{</schema>}}

{{<instance-pass `An array value that only consists of number items is valid`>}}
[ 1, -3.4, 54 ]
{{</instance-pass>}}

{{<instance-annotation>}}
{ "keyword": "/items", "instance": "", "value": true }
{{</instance-annotation>}}

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
  "$schema": "https://json-schema.org/draft/2019-09/schema",
  "items": [ { "type": "boolean" }, { "type": "number" } ]
}
{{</schema>}}

{{<instance-pass `An array value that consists of a boolean item followed by a number item is valid`>}}
[ false, 35 ]
{{</instance-pass>}}

{{<instance-annotation>}}
{ "keyword": "/items", "instance": "", "value": true }
{{</instance-annotation>}}

{{<instance-pass `An array value with additional items beyond the tuple is valid`>}}
[ false, 35, "foo", "bar" ]
{{</instance-pass>}}

{{<instance-annotation>}}
{ "keyword": "/items", "instance": "", "value": 1 }
{{</instance-annotation>}}

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
