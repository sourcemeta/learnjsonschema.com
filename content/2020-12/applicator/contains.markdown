---
keyword: "contains"
signature: "Schema"
value: This keyword must be set to a valid JSON Schema
summary: "Validation succeeds if the instance contains an element that validates against this schema."
kind: [ "applicator", "annotation" ]
instance: [ "array" ]
specification: "https://json-schema.org/draft/2020-12/json-schema-core.html#section-10.3.1.3"
metaschema: "https://json-schema.org/draft/2020-12/meta/applicator"
tests:
  - draft2020-12/contains.json
default:
  value: "{}"
introduced_in: draft6
changed_in:
  - 2019-09
annotation:
   description: A potentially empty array of the indexes to which this keyword's subschema validated successfully to (in ascending order), or a boolean true if it applied to every item of the instance
   kind: [ "array", "boolean" ]
interdependencies:
  - vocabulary: validation
    keyword: minContains
  - vocabulary: validation
    keyword: maxContains
affects:
  - vocabulary: unevaluated
    keyword: unevaluatedItems
related:
  - vocabulary: applicator
    keyword: prefixItems
  - vocabulary: applicator
    keyword: items
  - vocabulary: validation
    keyword: minItems
  - vocabulary: validation
    keyword: maxItems
  - vocabulary: validation
    keyword: uniqueItems
---

The `contains` keyword restricts array instances to include one or more items
(at any location of the array) that validate against the given subschema. The
lower and upper bounds that are allowed to validate against the given subschema
can be controlled using the [`minContains`]({{< ref
"2020-12/validation/mincontains" >}}) and [`maxContains`]({{< ref
"2020-12/validation/maxcontains" >}}) keywords. Information about the items
that were successfully validated against the given subschema is reported using
annotations.

{{<learning-more>}}Keep in mind that when collecting annotations, the
evaluator might need to exhaustively check every item in the array past the
containment lower bound instead of short-circuiting validation, potentially
introducing additional computational overhead.

For example, consider an array of 10 items where 5 of its items validate
against the `contains` subschema (and neither `minContains` nor `maxContains`
are declared, for simplicity). When not collecting annotations, validation will
stop after encountering the first match. However, when collecting annotations,
validation will have to proceed past the first match to report the 5 matching
indexes.{{</learning-more>}}

{{<constraint-warning `array`>}}

## Examples

{{<schema `A schema that constrains array instances to contain at least one even number`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "contains": {
    "type": "number",
    "multipleOf": 2
  }
}
{{</schema>}}

{{<instance-pass `An array value with one even number is valid`>}}
[ "foo", 2, false, [ "bar" ], -5 ]
{{</instance-pass>}}

{{<instance-annotation>}}
{ "keyword": "/contains", "instance": "", "value": [ 1 ] }
{{</instance-annotation>}}

{{<instance-pass `An array value with multiple even numbers is valid`>}}
[ "foo", 2, false, 3, 4, [ "bar" ], -5, -3.0 ]
{{</instance-pass>}}

{{<instance-annotation>}}
{ "keyword": "/contains", "instance": "", "value": [ 1, 4, 7 ] }
{{</instance-annotation>}}

{{<instance-pass `An array value that solely consists of even numbers is valid`>}}
[ 2, 4, 6, 8, 10, 12 ]
{{</instance-pass>}}

{{<instance-annotation>}}
{ "keyword": "/contains", "instance": "", "value": true }
{{</instance-annotation>}}

{{<instance-fail `An array value without any even number is invalid`>}}
[ "foo", true ]
{{</instance-fail>}}

{{<instance-fail `An empty array value is invalid`>}}
[]
{{</instance-fail>}}

{{<instance-pass `A non-array value is valid`>}}
"Hello World"
{{</instance-pass>}}
