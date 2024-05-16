---
keyword: "maximum"
signature: "Number"
value: This keyword must be set to a number
summary: "Validation succeeds if the numeric instance is less than or equal to the given number."
kind: [ "assertion" ]
instance: [ "number" ]
specification: "https://json-schema.org/draft/2020-12/json-schema-validation.html#section-6.2.2"
metaschema: "https://json-schema.org/draft/2020-12/meta/validation"
tests:
  - draft2020-12/maximum.json
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
target_version: "mvp"
---

The `maximum` keyword is used to set the upper limit on numeric instances. It specifies that the numeric value being validated must be less than or equal to the provided maximum value.

* Applies only to number data types (integers and floats).
* Validation succeeds if the number is less than or equal to the specified `maximum`.

## Examples

{{<schema `Schema defining the upper limit of 10 on numeric values`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "number",
  "maximum": 10
}
{{</schema>}}

{{<instance-pass `An instance with a numeric value less than 10 is valid`>}}
9.5
{{</instance-pass>}}

{{<instance-fail `An instance with a numeric value greater than 10 is invalid`>}}
15
{{</instance-fail>}}

{{<instance-pass `An instance with a numeric value equal to 10 is valid`>}}
10
{{</instance-pass>}}

{{<schema ` Schema allowing either a boolean value or a numeric value with an upper limit of 20.99`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": [ "boolean", "number" ],
  "maximum": 20.99
}
{{</schema>}}

{{<instance-pass `An instance with a numeric value less than 20.99 is valid`>}}
15
{{</instance-pass>}}

{{<instance-fail `An instance with a string datatype is invalid`>}}
"Hello World!"
{{</instance-fail>}}

{{<instance-pass `An instance with a boolean value is valid`>}}
true
{{</instance-pass>}}
