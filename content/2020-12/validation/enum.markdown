---
keyword: "enum"
signature: "Array<Any>"
value: This keyword must be set to a *non-empty* array of unique JSON values
summary: "Validation succeeds if the instance is equal to one of the elements in this keyword's array value."
kind: [ "assertion" ]
instance: [ "any" ]
specification: "https://json-schema.org/draft/2020-12/json-schema-validation.html#section-6.1.2"
metaschema: "https://json-schema.org/draft/2020-12/meta/validation"
tests:
  - draft2020-12/enum.json
index: -99998
introduced_in: draft1
related:
  - vocabulary: validation
    keyword: const
  - vocabulary: validation
    keyword: type
  - vocabulary: applicator
    keyword: anyOf
  - vocabulary: applicator
    keyword: oneOf
target_version: "mvp"
---

The `enum` keyword specifies a validation constraint for an instance, defining a set of permissible values. The validation succeeds if the value of the instance matches one of the elements in the `enum` array.

_**Note:** Using the `type` keyword along the `enum` keyword is considered an anti-pattern, as `enum` constraints instances tighter than `type`._

## Examples

{{<schema `Schema with string enum`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "enum": [ "red", "green", "blue" ]
}
{{</schema>}}

{{<instance-pass `Instance with value present in the enum is valid`>}}
"green"
{{</instance-pass>}}

{{<instance-fail `Instance with value not present in the enum is invalid`>}}
"black"
{{</instance-fail>}}

{{<schema `Schema with number enum`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "enum": [ 2, 45, 100 ]
}
{{</schema>}}

{{<instance-pass `Instance with value present in the enum is valid`>}}
45
{{</instance-pass>}}

{{<instance-fail `Instance with value not present in the enum is invalid`>}}
70
{{</instance-fail>}}

{{<instance-fail `Instance with value having different datatype is invalid`>}}
"2"
{{</instance-fail>}}

{{<schema `Schema with mixed-type enum`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "enum": [ "red", 123, true, { "foo": "bar" }, [ 1, 2 ], null ]
}
{{</schema>}}

{{<instance-pass `Instance with value present in the enum is valid`>}}
true
{{</instance-pass>}}

{{<instance-fail `Instance with value not present in the enum is invalid`>}}
{ "foo": "baz" }
{{</instance-fail>}}
-  _Without specifying a type, you can utilize enum to accept values of various types._
