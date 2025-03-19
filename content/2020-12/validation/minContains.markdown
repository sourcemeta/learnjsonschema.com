---
keyword: "minContains"
signature: "Integer"
value: This keyword must be set to a zero or positive integer
summary: "The number of times that the [`contains`](/2020-12/applicator/contains) keyword (if set) successfully validates against the instance must be greater than or equal to the given integer."
kind: [ "assertion" ]
instance: [ "array" ]
specification: "https://json-schema.org/draft/2020-12/json-schema-validation.html#section-6.4.5"
metaschema: "https://json-schema.org/draft/2020-12/meta/validation"
default:
  value: 0
tests:
  - draft2020-12/minContains.json
introduced_in: 2019-09
affects:
  - vocabulary: applicator
    keyword: contains
related:
  - vocabulary: validation
    keyword: maxContains
  - vocabulary: applicator
    keyword: prefixItems
  - vocabulary: applicator
    keyword: items
---

The `minContains` keyword modifies the [`contains`]({{< ref
"2020-12/applicator/contains" >}}) keyword to constrain array instances to the
given minimum number of containment matches. This keyword has no effect if the
[`contains`]({{< ref "2020-12/applicator/contains" >}}) keyword is not declared.

{{<common-pitfall>}}Keep in mind that when collecting annotations, the
evaluator might need to exhaustively check every item in the array past the
containment lower bound instead of short-circuiting validation, potentially
introducing additional computational overhead.

For example, consider an array of 10 items where 5 of its items validate
against the `contains` subschema and `minContains` is set to to 2. When not
collecting annotations, validation will stop after encountering the second
match. However, when collecting annotations, validation will have to proceed
past the second match to report the 5 matching indexes.{{</common-pitfall>}}
{{<constraint-warning `array`>}}

## Examples

{{<schema `A schema that constrains array instances to contain at least two even numbers`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "minContains": 2,
  "contains": {
    "type": "number",
    "multipleOf": 2
  }
}
{{</schema>}}

{{<instance-pass `An array value with two even numbers is valid`>}}
[ "foo", 2, false, 3, 4, [ "bar" ], -5 ]
{{</instance-pass>}}

{{<instance-annotation>}}
{ "keyword": "/contains", "instance": "", "value": [ 1, 4 ] }
{{</instance-annotation>}}

{{<instance-pass `An array value with more than two even numbers is valid`>}}
[ "foo", 2, false, 3, 4, [ "bar" ], -5, -3.0 ]
{{</instance-pass>}}

{{<instance-annotation>}}
{ "keyword": "/contains", "instance": "", "value": [ 1, 4, 7 ] }
{{</instance-annotation>}}

{{<instance-fail `An array value with one even number is invalid`>}}
[ "foo", 2, false, [ "bar" ], -5 ]
{{</instance-fail>}}

{{<instance-fail `An array value without any even number is invalid`>}}
[ "foo", true ]
{{</instance-fail>}}

{{<instance-fail `An empty array value is invalid`>}}
[]
{{</instance-fail>}}

{{<instance-pass `A non-array value is valid`>}}
"Hello World"
{{</instance-pass>}}

{{<schema `A schema that incorrectly constrains minimum containment without constrainining containment`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "minContains": 2
}
{{</schema>}}

{{<instance-pass `An array value with arbitrary items is valid`>}}
[ "John", false, 29, { "foo": "bar" }, [ 5, 7 ] ]
{{</instance-pass>}}

{{<instance-pass `An empty array is valid`>}}
[]
{{</instance-pass>}}

{{<instance-pass `A non-array value is valid`>}}
"Hello World"
{{</instance-pass>}}
