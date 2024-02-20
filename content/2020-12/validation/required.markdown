---
keyword: "required"
signature: "Array<String>"
summary: "An object instance is valid against this keyword if every item in the array is the name of a property in the instance."
kind: [ "assertion" ]
instance: [ "object" ]
specification: "https://json-schema.org/draft/2020-12/json-schema-validation.html#section-6.5.3"
metaschema: "https://json-schema.org/draft/2020-12/meta/validation"
index: -99
introduced_in: draft3
related:
  - vocabulary: validation
    keyword: dependentRequired
  - vocabulary: validation
    keyword: maxProperties
  - vocabulary: validation
    keyword: minProperties
---

The `required` keyword is used to specify which properties must be present within an object instance.
* The value of this keyword must be an array.
* Elements of this array, if any, must be strings, and must be unique.
* Omitting this keyword has the same behavior as an empty array.

## Examples

{{<schema>}}

{{</schema>}}

{{<instance-pass>}}
{{</instance-pass>}}

{{<instance-fail>}}
{{</instance-fail>}}