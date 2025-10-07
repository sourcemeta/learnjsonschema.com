---
keyword: "exclusiveMinimum"
signature: "Boolean"
value: This keyword must be set to a boolean value
summary: "When [`minimum`](/draft4/validation/minimum) is present and this keyword is set to true, the numeric instance must be greater than the value in [`minimum`](/draft4/validation/minimum)."
kind: [ "assertion" ]
instance: [ "number" ]
specification: "https://json-schema.org/draft-04/draft-fge-json-schema-validation-00#rfc.section.5.1.3"
metaschema: "http://json-schema.org/draft-04/schema#"
default:
  value: "false"
tests:
  - draft4/minimum.json
introduced_in: draft3
changed_in:
  - draft6
index: -9995
affects:
  - vocabulary: validation
    keyword: minimum
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

The [`exclusiveMinimum`]({{< ref "draft4/validation/exclusiveminimum" >}})
keyword is a boolean modifier for the [`minimum`]({{< ref
"draft4/validation/minimum" >}}) keyword. When set to `true`, it changes the
validation behavior of the [`minimum`]({{< ref "draft4/validation/minimum" >}})
keyword from _greater than or equal to_ to _strictly greater than_. This
keyword has no effect if the [`minimum`]({{< ref "draft4/validation/minimum"
>}}) keyword is not present in the same schema.

{{<constraint-warning `number`>}}

## Examples

{{<schema `A schema that constrains number instances to be greater than 10 (exclusive)`>}}
{
  "$schema": "http://json-schema.org/draft-04/schema#",
  "minimum": 10,
  "exclusiveMinimum": true
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

{{<schema `A schema with exclusive semantics but no lower bound`>}}
{
  "$schema": "http://json-schema.org/draft-04/schema#",
  "exclusiveMinimum": true
}
{{</schema>}}

{{<instance-pass `Any number value is valid when minimum is not present`>}}
10
{{</instance-pass>}}

{{<instance-pass `Any number value is valid when minimum is not present`>}}
-999999999
{{</instance-pass>}}

{{<schema `A schema that explicitly constrains number instances to be greater than or equal to 10`>}}
{
  "$schema": "http://json-schema.org/draft-04/schema#",
  "minimum": 10,
  "exclusiveMinimum": false
}
{{</schema>}}

{{<instance-pass `The integer value 10 is valid`>}}
10
{{</instance-pass>}}

{{<instance-pass `The real representation of the integer value 10 is valid`>}}
10.0
{{</instance-pass>}}

{{<instance-pass `A number value greater than 10 is valid`>}}
10.1
{{</instance-pass>}}

{{<instance-fail `A number value less than 10 is invalid`>}}
9.9
{{</instance-fail>}}
