---
keyword: "exclusiveMaximum"
signature: "Boolean"
value: This keyword must be set to a boolean value
summary: "When [`maximum`](/draft4/validation/maximum) is present and this keyword is set to true, the numeric instance must be less than the value in [`maximum`](/draft4/validation/maximum)."
kind: [ "assertion" ]
instance: [ "number" ]
specification: "https://json-schema.org/draft-04/draft-fge-json-schema-validation-00#rfc.section.5.1.2"
metaschema: "http://json-schema.org/draft-04/schema#"
default:
  value: "false"
tests:
  - draft4/maximum.json
introduced_in: draft3
changed_in:
  - draft6
index: -9997
affects:
  - vocabulary: validation
    keyword: maximum
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

The [`exclusiveMaximum`]({{< ref "draft4/validation/exclusivemaximum" >}})
keyword is a boolean modifier for the [`maximum`]({{< ref
"draft4/validation/maximum" >}}) keyword. When set to `true`, it changes the
validation behavior of the [`maximum`]({{< ref "draft4/validation/maximum" >}})
keyword from _less than or equal to_ to _strictly less than_. This keyword has
no effect if the [`maximum`]({{< ref "draft4/validation/maximum" >}}) keyword
is not present in the same schema.

{{<constraint-warning `number`>}}

## Examples

{{<schema `A schema that constrains number instances to be less than 10`>}}
{
  "$schema": "http://json-schema.org/draft-04/schema#",
  "maximum": 10,
  "exclusiveMaximum": true
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

{{<schema `A schema with exclusive semantics but no upper bound`>}}
{
  "$schema": "http://json-schema.org/draft-04/schema#",
  "exclusiveMaximum": true
}
{{</schema>}}

{{<instance-pass `Any number value is valid`>}}
10
{{</instance-pass>}}

{{<instance-pass `Any number value is valid`>}}
999999999
{{</instance-pass>}}

{{<schema `A schema that explicitly constrains number instances to be less than or equal to 10`>}}
{
  "$schema": "http://json-schema.org/draft-04/schema#",
  "maximum": 10,
  "exclusiveMaximum": false
}
{{</schema>}}

{{<instance-pass `The integer value 10 is valid`>}}
10
{{</instance-pass>}}

{{<instance-pass `The real representation of the integer value 10 is valid`>}}
10.0
{{</instance-pass>}}

{{<instance-pass `A number value less than 10 is valid`>}}
9.9
{{</instance-pass>}}

{{<instance-fail `A number value greater than 10 is invalid`>}}
10.1
{{</instance-fail>}}
