---
keyword: "contains"
signature: "Schema"
value: This keyword must be set to a valid JSON Schema
summary: "Validation succeeds if the instance contains an element that validates against this schema."
kind: [ "applicator" ]
instance: [ "array" ]
specification: "https://json-schema.org/draft/2019-09/draft-handrews-json-schema-02#rfc.section.9.3.1.4"
metaschema: "https://json-schema.org/draft/2019-09/meta/applicator"
tests:
  - draft2019-09/contains.json
default:
  value: "{}"
introduced_in: draft6
interdependencies:
  - vocabulary: validation
    keyword: minContains
  - vocabulary: validation
    keyword: maxContains
related:
  - vocabulary: applicator
    keyword: items
  - vocabulary: applicator
    keyword: additionalItems
  - vocabulary: validation
    keyword: minItems
  - vocabulary: validation
    keyword: maxItems
  - vocabulary: validation
    keyword: uniqueItems
  - vocabulary: applicator
    keyword: unevaluatedItems
---

The [`contains`]({{< ref "2019-09/applicator/contains" >}}) keyword restricts
array instances to include one or more items (at any location of the array) that
validate against the given subschema. The lower and upper bounds that are
allowed to validate against the given subschema can be controlled using the
[`minContains`]({{< ref "2019-09/validation/mincontains" >}}) and
[`maxContains`]({{< ref "2019-09/validation/maxcontains" >}}) keywords.

{{<constraint-warning `array`>}}

## Examples

{{<schema `A schema that constrains array instances to contain at least one even number`>}}
{
  "$schema": "https://json-schema.org/draft/2019-09/schema",
  "contains": {
    "type": "number",
    "multipleOf": 2
  }
}
{{</schema>}}

{{<instance-pass `An array value with one even number is valid`>}}
[ "foo", 2, false, [ "bar" ], -5 ]
{{</instance-pass>}}

{{<instance-pass `An array value with multiple even numbers is valid`>}}
[ "foo", 2, false, 3, 4, [ "bar" ], -5, -3.0 ]
{{</instance-pass>}}

{{<instance-pass `An array value that solely consists of even numbers is valid`>}}
[ 2, 4, 6, 8, 10, 12 ]
{{</instance-pass>}}

{{<instance-fail `An array value without any even number is invalid`>}}
[ "foo", true ]
{{</instance-fail>}}

{{<instance-fail `An empty array value is invalid`>}}
[]
{{</instance-fail>}}

{{<instance-pass `A non-array value is valid`>}}
"Hello World"
{{</instance-pass>}}
