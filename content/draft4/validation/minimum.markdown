---
keyword: "minimum"
signature: "Number"
value: This keyword must be set to a number
summary: "Validation succeeds if the numeric instance is greater than or greater than or equal to the given number, depending on the value of [`exclusiveMinimum`](/draft4/validation/exclusiveMinimum), if any"
kind: [ "assertion" ]
instance: [ "number" ]
specification: "https://json-schema.org/draft-04/draft-fge-json-schema-validation-00#rfc.section.5.1.3"
metaschema: "http://json-schema.org/draft-04/schema#"
tests:
  - draft4/minimum.json
introduced_in: draft1
index: -9996
interdependencies:
  - vocabulary: validation
    keyword: exclusiveMinimum
related:
  - vocabulary: validation
    keyword: maximum
  - vocabulary: validation
    keyword: exclusiveMaximum
  - vocabulary: validation
    keyword: exclusiveMinimum
  - vocabulary: validation
    keyword: multipleOf
---


The [`minimum`]({{< ref "draft4/validation/minimum" >}}) keyword restricts number instances to be greater than or equal to
the given number.

{{<constraint-warning `number`>}}

## Examples

{{<schema `A schema that constrains number instances to be greater than or equal to the positive integer 10`>}}
{
  "$schema": "http://json-schema.org/draft-04/schema#",
  "minimum": 10
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

{{<instance-pass `The real representation of the integer value 10 is valid`>}}
10.0
{{</instance-pass>}}

{{<instance-pass `The integer value 10 is valid`>}}
10
{{</instance-pass>}}

{{<instance-pass `A non-number value is valid`>}}
"100000"
{{</instance-pass>}}

{{<schema `A schema that constrains number instances to be greater than or equal to the negative real number -2.1`>}}
{
  "$schema": "http://json-schema.org/draft-04/schema#",
  "minimum": -2.1
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

{{<instance-pass `The real number value -2.1 is valid`>}}
-2.1
{{</instance-pass>}}

{{<instance-pass `A non-number value is valid`>}}
"100000"
{{</instance-pass>}}
