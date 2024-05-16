---
keyword: "exclusiveMinimum"
signature: "Number"
value: This keyword must be set to a number
summary: "Validation succeeds if the numeric instance is greater than the given number."
kind: [ "assertion" ]
instance: [ "number" ]
specification: "https://json-schema.org/draft/2020-12/json-schema-validation.html#section-6.2.5"
metaschema: "https://json-schema.org/draft/2020-12/meta/validation"
tests:
  - draft2020-12/exclusiveMinimum.json
index: -999
introduced_in: draft3
related:
  - vocabulary: validation
    keyword: exclusiveMaximum
  - vocabulary: validation
    keyword: maximum
  - vocabulary: validation
    keyword: minimum
  - vocabulary: validation
    keyword: multipleOf
target_version: "mvp"
---

The `exclusiveMinimum` keyword is used to set an exclusive lower limit on numeric instances. It specifies that the numeric value being validated must be strictly greater than (not equal to) the provided minimum value.

* Applies only to number data types (integers and real numbers).
* Validation succeeds if the number is strictly greater than the specified `exclusiveMinimum`.

## Examples

{{<schema `Schema defining exclusive lower limit of 5 on numeric values`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "number",
  "exclusiveMinimum": 5
}
{{</schema>}}

{{<instance-fail `An instance with numeric value less than 5 is invalid`>}}
3
{{</instance-fail>}}

{{<instance-pass `An instance with numeric value greater than 5 is valid`>}}
9.5
{{</instance-pass>}}

{{<instance-fail `An instance with numeric value equal to 5 is invalid`>}}
5
{{</instance-fail>}}

{{<schema ` Schema allowing either a string value or a numeric value with an exclusive lower limit of 10.2`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": [ "string", "number" ],
  "exclusiveMinimum": 10.2
}
{{</schema>}}

{{<instance-pass `An instance with a numeric value greater than 10.2 is valid`>}}
15
{{</instance-pass>}}

{{<instance-fail `An instance with a boolean datatype is invalid`>}}
false
{{</instance-fail>}}

{{<instance-pass `An instance with a string value is valid`>}}
"Hello World!"
{{</instance-pass>}}

{{<instance-fail `An instance with a numeric value less than 10.2 is invalid`>}}
10.01
{{</instance-fail>}}

{{<schema `Schema with both 'minimum' and 'exclusiveMinimum' keywords`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "number",
  "exclusiveMinimum": 10,
  "minimum": 5
}
{{</schema>}}

{{<instance-pass `An instance with numeric value greater than 10 is valid`>}}
15
{{</instance-pass>}}

{{<instance-fail `An instance with numeric value less than or equal to 10 is invalid`>}}
9.5
{{</instance-fail>}}

* _**Note:** Here, the `exclusiveMinimum` takes precedence, even though `minimum` is 5. Only numbers greater than 10 are valid._
