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
related:
  - vocabulary: validation
    keyword: exclusiveMinimum
  - vocabulary: validation
    keyword: maximum
  - vocabulary: validation
    keyword: minimum
  - vocabulary: validation
    keyword: multipleOf
target_version: "mvp"
---

The `exclusiveMaximum` keyword is used to set an exclusive upper limit on numeric instances. It specifies that the numeric value being validated must be strictly less than (not equal to) the provided maximum value.

* Applies only to number data types (integers and real numbers).
* Validation succeeds if the number is strictly less than the specified `exclusiveMaximum`.

## Examples

{{<schema `Schema defining exclusive upper limit of 10 on numeric values`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "number",
  "exclusiveMaximum": 10
}
{{</schema>}}

{{<instance-fail `An instance with numeric value greater than 10 is invalid`>}}
15
{{</instance-fail>}}

{{<instance-pass `An instance with numeric value less than 10 is valid`>}}
9.5
{{</instance-pass>}}

{{<instance-fail `An instance with numeric value equal to 10 is invalid`>}}
10
{{</instance-fail>}}

{{<schema ` Schema allowing either a string value or a numeric value with an exclusive upper limit of 20.99`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": [ "string", "number" ],
  "exclusiveMaximum": 20.99
}
{{</schema>}}

{{<instance-pass `An instance with a numeric value less than 20.99 is valid`>}}
15.67
{{</instance-pass>}}

{{<instance-fail `An instance with a boolean datatype is invalid`>}}
true
{{</instance-fail>}}

{{<instance-pass `An instance with a string value is valid`>}}
"Hello World!"
{{</instance-pass>}}

{{<instance-fail `An instance with a numeric value greater than 20.99 is invalid`>}}
29
{{</instance-fail>}}

{{<schema `Schema with both 'maximum' and 'exclusiveMaximum' keywords`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "number",
  "exclusiveMaximum": 10,
  "maximum": 20
}
{{</schema>}}

{{<instance-pass `An instance with numeric value less than 10 is valid`>}}
9.5
{{</instance-pass>}}

{{<instance-fail `An instance with numeric value greater than or equal to 10 is invalid`>}}
15
{{</instance-fail>}}

* _**Note:** Here, the `exclusiveMaximum` takes precedence, even though `maximum` is 20. Only numbers less than 10 are valid._
