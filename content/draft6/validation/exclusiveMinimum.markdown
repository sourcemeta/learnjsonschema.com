---
keyword: "exclusiveMinimum"
signature: "Number"
value: This keyword must be set to a number
summary: "Validation succeeds if the numeric instance is greater than the given number."
kind: [ "assertion" ]
instance: [ "number" ]
specification: "https://json-schema.org/draft-06/draft-wright-json-schema-validation-01#rfc.section.6.5"
metaschema: "http://json-schema.org/draft-06/schema#"
tests:
  - draft6/exclusiveMinimum.json
introduced_in: draft3
index: -9995
related:
  - vocabulary: validation
    keyword: exclusiveMaximum
  - vocabulary: validation
    keyword: maximum
  - vocabulary: validation
    keyword: minimum
  - vocabulary: validation
    keyword: multipleOf
---


The [`exclusiveMinimum`]({{< ref "draft6/validation/exclusiveminimum" >}}) keyword restricts number instances to be strictly
greater than the given number.

{{<constraint-warning `number`>}}

## Examples

{{<schema `A schema that constrains number instances to be greater than the positive integer 10`>}}
{
  "$schema": "http://json-schema.org/draft-06/schema#",
  "exclusiveMinimum": 10
}
{{</schema>}}

{{<instance-pass `A number value greater than 10 is valid`>}}
10.1
{{</instance-pass>}}

{{<instance-pass `An integer value greater than 10 is valid`>}}
11
{{</instance-pass>}}

{{<instance-fail `A number value less than 10 is invalid`>}}
9.9
{{</instance-fail>}}

{{<instance-fail `An integer value less than 10 is invalid`>}}
9
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

{{<schema `A schema that constrains number instances to be greater than the negative real number -2.1`>}}
{
  "$schema": "http://json-schema.org/draft-06/schema#",
  "exclusiveMinimum": -2.1
}
{{</schema>}}

{{<instance-pass `A number value greater than -2.1 is valid`>}}
-2.09
{{</instance-pass>}}

{{<instance-pass `An integer value greater than -2.1 is valid`>}}
-2
{{</instance-pass>}}

{{<instance-fail `A number value less than -2.1 is invalid`>}}
-2.11
{{</instance-fail>}}

{{<instance-fail `An integer value less than -2.1 is invalid`>}}
-3
{{</instance-fail>}}

{{<instance-fail `The real number value -2.1 is invalid`>}}
-2.1
{{</instance-fail>}}

{{<instance-pass `A non-number value is valid`>}}
"100000"
{{</instance-pass>}}
