---
keyword: "minimum"
signature: "Number"
value: This keyword must be set to a number
summary: "Validation succeeds if the numeric instance is greater than or equal to the given number."
kind: [ "assertion" ]
instance: [ "number" ]
specification: "https://json-schema.org/draft/2020-12/json-schema-validation.html#section-6.2.4"
metaschema: "https://json-schema.org/draft/2020-12/meta/validation"
tests:
  - draft2020-12/minimum.json
index: -999
introduced_in: draft1
related:
  - vocabulary: validation
    keyword: maximum
  - vocabulary: validation
    keyword: exclusiveMaximum
  - vocabulary: validation
    keyword: exclusiveMinimum
  - vocabulary: validation
    keyword: multipleOf
target_version: "mvp"
---

The `minimum` keyword is used to set the lower limit on numeric instances. It specifies that the numeric value being validated must be greater than or equal to the provided minimum value.

* Validation succeeds if the number is greater than or equal to the specified `minimum`.

## Examples

{{<schema `Schema defining the lower limit of 6 on numeric values`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "number",
  "minimum": 6
}
{{</schema>}}

{{<instance-pass `An instance with a numeric value greater than 6 is valid`>}}
8.1
{{</instance-pass>}}

{{<instance-fail `An instance with a numeric value less than 6 is invalid`>}}
4
{{</instance-fail>}}

{{<instance-pass `An instance with a numeric value equal to 6 is valid`>}}
6
{{</instance-pass>}}

{{<schema ` Schema allowing either a null value or a numeric value with a lower limit of 10.99`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": [ "null", "number" ],
  "minimum": 10.99
}
{{</schema>}}

{{<instance-pass `An instance with a numeric value greater than or equal to 10.99 is valid`>}}
15
{{</instance-pass>}}

{{<instance-fail `An instance with a string datatype is invalid`>}}
"Hello World!"
{{</instance-fail>}}

{{<instance-pass `An instance with a null value is valid`>}}
null
{{</instance-pass>}}
