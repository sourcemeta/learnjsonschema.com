---
keyword: "exclusiveMaximum"
signature: "Number"
value: This keyword must be set to a number
summary: "Validation succeeds if the numeric instance is less than the given number."
kind: [ "assertion" ]
instance: [ "number" ]
specification: "https://json-schema.org/draft/2020-12/json-schema-validation.html#section-6.2.3"
metaschema: "https://json-schema.org/draft/2020-12/meta/validation"
tests:
  - draft2020-12/exclusiveMaximum.json
index: -999
introduced_in: draft3
changed_in:
  - draft6
related:
  - vocabulary: validation
    keyword: exclusiveMinimum
  - vocabulary: validation
    keyword: maximum
  - vocabulary: validation
    keyword: minimum
  - vocabulary: validation
    keyword: multipleOf
---

The [`exclusiveMaximum`]({{< ref "2020-12/validation/exclusiveMaximum" >}}) keyword restricts number instances to be strictly less
than the given number.

{{<constraint-warning `number`>}}

## Examples

{{<schema `A schema that constrains number instances to be less than the positive integer 10`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "exclusiveMaximum": 10
}
{{</schema>}}

{{<instance-pass `A number value less than 10 is valid`>}}
9.9
{{</instance-pass>}}

{{<instance-pass `An integer value less than 10 is valid`>}}
9
{{</instance-pass>}}

{{<instance-fail `A number value greater than 10 is invalid`>}}
10.001
{{</instance-fail>}}

{{<instance-fail `An integer value greater than 10 is invalid`>}}
11
{{</instance-fail>}}

{{<instance-fail `The real representation of the integer value 10 is invalid`>}}
10.0
{{</instance-fail>}}

{{<instance-fail `The integer value 10 is invalid`>}}
10
{{</instance-fail>}}

{{<instance-pass `A non-number value is valid`>}}
"100000"
{{</instance-pass>}}

{{<schema `A schema that constrains number instances to be less than the negative real number -2.1`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "exclusiveMaximum": -2.1
}
{{</schema>}}

{{<instance-pass `A number value less than -2.1 is valid`>}}
-2.2
{{</instance-pass>}}

{{<instance-pass `An integer value less than -2.1 is valid`>}}
-3
{{</instance-pass>}}

{{<instance-fail `A number value greater than -2.1 is invalid`>}}
-2.01
{{</instance-fail>}}

{{<instance-fail `An integer value greater than -2.1 is invalid`>}}
-2
{{</instance-fail>}}

{{<instance-fail `The real number value -2.1 is invalid`>}}
-2.1
{{</instance-fail>}}

{{<instance-pass `A non-number value is valid`>}}
"100000"
{{</instance-pass>}}
