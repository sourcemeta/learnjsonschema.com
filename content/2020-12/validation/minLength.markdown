---
keyword: "minLength"
signature: "Integer"
value: This keyword must be set to a zero or positive integer
summary: "A string instance is valid against this keyword if its length is greater than, or equal to, the value of this keyword."
kind: [ "assertion" ]
instance: [ "string" ]
specification: "https://json-schema.org/draft/2020-12/json-schema-validation.html#section-6.3.2"
metaschema: "https://json-schema.org/draft/2020-12/meta/validation"
default:
  value: 0
tests:
  - draft2020-12/minLength.json
index: -9999
introduced_in: draft1
related:
  - vocabulary: validation
    keyword: maxLength
  - vocabulary: validation
    keyword: pattern
  - vocabulary: format-annotation
    keyword: format
target_version: "mvp"
---

The `minLength` keyword is used to specify the minimum length of a string instance. It defines the minimum number of characters that a valid string must have to satisfy the schema.

* String length is counted in characters, not bytes.
* Validation succeeds if the string length is greater than or equal to the specified `minLength`.

## Examples

{{<schema `Schema requiring minimum string length of 5`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "string",
  "minLength": 5
}
{{</schema>}}

{{<instance-pass `An instance with a string length greater than or equal to 5 is valid`>}}
"This is a valid string"
{{</instance-pass>}}

{{<instance-fail `An instance with a string length less than 5 is invalid`>}}
"foo"
{{</instance-fail>}}

{{<schema `Schema which allows either a string with at least 3 characters or a numeric value`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": [ "string", "number" ],
  "minLength": 3
}

{{</schema>}}

{{<instance-pass `An instance with a string length greater than or equal to 3 is valid`>}}
"foo"
{{</instance-pass>}}

{{<instance-fail `An instance with a string length less than 3 is valid`>}}
"hi"
{{</instance-fail>}}

{{<instance-pass `An instance with a numeric value is valid`>}}
55
{{</instance-pass>}}
