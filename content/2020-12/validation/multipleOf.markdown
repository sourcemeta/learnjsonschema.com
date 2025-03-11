---
keyword: "multipleOf"
signature: "Number"
value: This keyword must be set to a number that is greater than zero
summary: "A numeric instance is valid only if division by this keyword's value results in an integer."
kind: [ "assertion" ]
instance: [ "number" ]
specification: "https://json-schema.org/draft/2020-12/json-schema-validation.html#section-6.2.1"
metaschema: "https://json-schema.org/draft/2020-12/meta/validation"
default:
  value: 1
tests:
  - draft2020-12/multipleOf.json
index: -999
introduced_in: draft4
related:
  - vocabulary: validation
    keyword: exclusiveMaximum
  - vocabulary: validation
    keyword: exclusiveMinimum
  - vocabulary: validation
    keyword: maximum
  - vocabulary: validation
    keyword: minimum
---

The `multipleOf` keyword restricts number instances to be multiples of the
given number. 

{{<learning-more>}}Setting this keyword to negative powers of 10, such as
`0.01` (10^-2), `0.001` (10^-3), and `0.0001` (10^-4), is a common mechanism to
control the maximum number of digits in the fractional part of a real number.
For example, `1.2` and `-12.34` are multiples of `0.01`, but `1.234` is
not.{{</learning-more>}}

{{<constraint-warning `number`>}}

## Examples

{{<schema `A schema that constrains number instances to be multiples of the integer 5`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "multipleOf": 5
}
{{</schema>}}

{{<instance-pass `An integer value that is a positive multiple of 5 is valid`>}}
10
{{</instance-pass>}}

{{<instance-pass `An integer value that is a negative multiple of 5 is valid`>}}
-5
{{</instance-pass>}}

{{<instance-pass `The real number representation of an integer value that is a positive multiple of 5 is valid`>}}
15.0
{{</instance-pass>}}

{{<instance-fail `An integer value that is not a multiple of 5 is invalid`>}}
8
{{</instance-fail>}}

{{<instance-pass `The zero integer value is a multiple of every number`>}}
0
{{</instance-pass>}}

{{<instance-pass `A non-number value is valid`>}}
"100000"
{{</instance-pass>}}

{{<schema `A schema that constrains number instances to be multiples of the real number 2.3`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "multipleOf": 2.3
}
{{</schema>}}

{{<instance-pass `A number value that is a positive multiple of 2.3 is valid`>}}
6.9
{{</instance-pass>}}

{{<instance-pass `A number value that is a negative multiple of 2.3 is valid`>}}
-4.6
{{</instance-pass>}}

{{<instance-fail `A number value that is not a multiple of 2.3 is invalid`>}}
2.4
{{</instance-fail>}}

{{<instance-pass `The zero integer value is a multiple of every number`>}}
0
{{</instance-pass>}}

{{<instance-pass `A non-number value is valid`>}}
"100000"
{{</instance-pass>}}

{{<schema `A schema that constrains number instances to have up to 2 digits in the fractional part`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "multipleOf": 0.01
}
{{</schema>}}

{{<instance-pass `Any integer value is valid`>}}
2
{{</instance-pass>}}

{{<instance-pass `A number value with 1 digit in the fractional part is valid`>}}
5.1
{{</instance-pass>}}

{{<instance-pass `A number value with 2 digits in the fractional part is valid`>}}
-12.34
{{</instance-pass>}}

{{<instance-fail `A number value with 3 digits in the fractional part is invalid`>}}
1.234
{{</instance-fail>}}

{{<instance-pass `The zero integer value is a multiple of every number`>}}
0
{{</instance-pass>}}

{{<instance-pass `A non-number value is valid`>}}
"100000"
{{</instance-pass>}}
