---
keyword: "maxContains"
signature: "Integer"
value: This keyword must be set to a zero or positive integer
summary: "The number of times that the [`contains`](/2020-12/applicator/contains) keyword (if set) successfully validates against the instance must be less than or equal to the given integer."
kind: [ "assertion" ]
instance: [ "array" ]
specification: "https://json-schema.org/draft/2020-12/json-schema-validation.html#section-6.4.4"
metaschema: "https://json-schema.org/draft/2020-12/meta/validation"
tests:
  - draft2020-12/maxContains.json
introduced_in: 2019-09
affects:
  - vocabulary: applicator
    keyword: contains
related:
  - vocabulary: validation
    keyword: minContains
  - vocabulary: applicator
    keyword: prefixItems
  - vocabulary: applicator
    keyword: items
---

The `maxContains` keyword modifies the [`contains`]({{< ref
"2020-12/applicator/contains" >}}) keyword to constrain array instances to the
given maximum number of containment matches. This keyword has no effect if the
[`contains`]({{< ref "2020-12/applicator/contains" >}}) keyword is not
declared.

{{<learning-more>}}
Using [`contains`]({{< ref "2020-12/applicator/contains"
>}}) with both [`minContains`]({{< ref "2020-12/validation/mincontains" >}})
and [`maxContains`]({{< ref "2020-12/validation/maxcontains" >}}) set to the
same value restricts arrays to contain exactly that number of items that match
the given subschema. Furthermore, setting these keywords to zero is a common
trick to restrict arrays to not contain an item that matches the given
subschema without making use of the [`not`]({{< ref "2020-12/applicator/not"
>}}) applicator.
{{</learning-more>}}

{{<constraint-warning `array`>}}

## Examples

{{<schema `A schema that constrains array instances to contain at most two even numbers`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "maxContains": 2,
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

{{<instance-pass `An array value with one even number is valid`>}}
[ "foo", 2, false, [ "bar" ], -5 ]
{{</instance-pass>}}

{{<instance-annotation>}}
{ "keyword": "/contains", "instance": "", "value": [ 1 ] }
{{</instance-annotation>}}

{{<instance-fail `An array value with more than two even numbers is invalid`>}}
[ "foo", 2, false, 3, 4, [ "bar" ], -5, -3.0 ]
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

{{<schema `A schema that constrains array instances to not contain an even number`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "minContains": 0,
  "maxContains": 0,
  "contains": {
    "multipleOf": 2
  }
}
{{</schema>}}

{{<instance-pass `An array value with no even number is valid`>}}
[ "foo", 3, false ]
{{</instance-pass>}}

{{<instance-fail `An array value with one even number is invalid`>}}
[ "foo", 2, false ]
{{</instance-fail>}}

{{<instance-fail `An array value with multiple even numbers is invalid`>}}
[ "foo", 2, 4 ]
{{</instance-fail>}}

{{<instance-pass `An empty array value is invalid`>}}
[]
{{</instance-pass>}}

{{<instance-pass `A non-array value is valid`>}}
"Hello World"
{{</instance-pass>}}

{{<schema `A schema that incorrectly constrains maximum containment without constrainining containment`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "maxContains": 2
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
