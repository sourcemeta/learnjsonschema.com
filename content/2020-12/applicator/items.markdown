---
keyword: "items"
signature: "Schema"
value: This keyword must be set to a valid JSON Schema
summary: "Validation succeeds if each element of the instance not covered by [`prefixItems`](/2020-12/applicator/prefixitems) validates against this schema."
kind: [ "applicator", "annotation" ]
instance: [ "array" ]
specification: "https://json-schema.org/draft/2020-12/json-schema-core.html#section-10.3.1.2"
metaschema: "https://json-schema.org/draft/2020-12/meta/applicator"
default:
  value: "{}"
tests:
  - draft2020-12/items.json
introduced_in: draft1
changed_in:
  - 2019-09
  - draft6
annotation:
   description: A boolean true if it applied to any item of the instance
   kind: [ "boolean" ]
interdependencies:
  - vocabulary: applicator
    keyword: prefixItems
  - vocabulary: validation
    keyword: minItems
  - vocabulary: validation
    keyword: maxItems
affects:
  - vocabulary: unevaluated
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
  - vocabulary: unevaluated
    keyword: unevaluatedItems
---

The `items` keyword restricts array instance items not described by the
[`prefixItems`]({{< ref "2020-12/applicator/prefixitems" >}}) keyword (if any),
to validate against the given subschema. Whether this keyword was evaluated
against any item of the array instance is reported using annotations.

{{<common-pitfall>}}This keyword does not prevent an array instance from being
empty. If needed, use the [`minItems`]({{< ref "2020-12/validation/minitems"
>}}) to assert on the minimum bounds of the array.{{</common-pitfall>}}

{{<constraint-warning `array`>}}

## Examples

{{<schema `A schema that constrains array instances to consist of number items`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
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

{{<schema `A schema that constrains array instances to start with a boolean item followed by a number item followed by strings`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "prefixItems": [ { "type": "boolean" }, { "type": "number" } ],
  "items": { "type": "string" }
}
{{</schema>}}

{{<instance-pass `An array value that consists of a boolean item followed by a number item is valid`>}}
[ false, 35 ]
{{</instance-pass>}}

{{<instance-annotation>}}
{ "keyword": "/prefixItems", "instance": "", "value": true }
{{</instance-annotation>}}

{{<instance-pass `An array value that consists of a boolean item followed by a number item and other string items is valid`>}}
[ false, 35, "foo", "bar" ]
{{</instance-pass>}}

{{<instance-annotation>}}
{ "keyword": "/prefixItems", "instance": "", "value": 2 }
{{</instance-annotation>}}

{{<instance-annotation>}}
{ "keyword": "/items", "instance": "", "value": true }
{{</instance-annotation>}}

{{<instance-fail `An array value that consists of a boolean item followed by a number item and other non-string items is invalid`>}}
[ false, 35, { "foo": "bar" } ]
{{</instance-fail>}}

{{<instance-pass `An empty array value is valid`>}}
[]
{{</instance-pass>}}

{{<instance-pass `A non-array value is valid`>}}
"Hello World"
{{</instance-pass>}}
