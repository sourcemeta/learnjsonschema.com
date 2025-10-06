---
keyword: "maximum"
signature: "Number"
value: This keyword must be set to a number
summary: "Validation succeeds if the numeric instance is less than or equal to the given number."
kind: [ "assertion" ]
instance: [ "number" ]
specification: "https://json-schema.org/draft/2019-09/draft-handrews-json-schema-validation-02#rfc.section.6.2.2"
metaschema: "https://json-schema.org/draft/2019-09/meta/validation"
tests:
  - draft2019-09/maximum.json
index: -999
introduced_in: draft1
related:
  - vocabulary: validation
    keyword: minimum
  - vocabulary: validation
    keyword: exclusiveMaximum
  - vocabulary: validation
    keyword: exclusiveMinimum
  - vocabulary: validation
    keyword: multipleOf
---

The [`maximum`]({{< ref "2019-09/validation/maximum" >}}) keyword restricts number instances to be less than or equal to
the given number.

{{<constraint-warning `number`>}}

## Examples

{{<schema `A schema that constrains number instances to be less than or equal to the positive integer 10`>}}
{
  "$schema": "https://json-schema.org/draft/2019-09/schema",
  "maximum": 10
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

{{<instance-pass `The real representation of the integer value 10 is valid`>}}
10.0
{{</instance-pass>}}

{{<instance-pass `The integer value 10 is valid`>}}
10
{{</instance-pass>}}

{{<instance-pass `A non-number value is valid`>}}
"100000"
{{</instance-pass>}}

{{<schema `A schema that constrains number instances to be less than or equal to the negative real number -2.1`>}}
{
  "$schema": "https://json-schema.org/draft/2019-09/schema",
  "maximum": -2.1
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

{{<instance-pass `The real number value -2.1 is valid`>}}
-2.1
{{</instance-pass>}}

{{<instance-pass `A non-number value is valid`>}}
"100000"
{{</instance-pass>}}
