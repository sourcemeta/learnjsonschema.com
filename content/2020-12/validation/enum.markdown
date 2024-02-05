---
keyword: "enum"
signature: "Array<Any>"
summary: "Validation succeeds if the instance is equal to one of the elements in this keyword's array value."
kind: [ "assertion" ]
instance: [ "any" ]
specification: "https://json-schema.org/draft/2020-12/json-schema-validation.html#section-6.1.2"
metaschema: "https://json-schema.org/draft/2020-12/meta/validation"
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
---

The `enum` keyword specifies a validation constraint for an instance, defining a set of permissible values. The value of the `enum` keyword must be an array containing at least one element, and these elements should be unique. The validation succeeds if the value of the instance matches one of the elements in the `enum` array.

_**Note:** When using  `enum`, it's recommended not to include `type` as it is redundant. While it's not mandatory to exclude `type` with `enum`, combining `enum` and `type` is considered an anti-pattern, so it's better to avoid doing so._

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
"enum": [ 2, 46, 100 ]
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
