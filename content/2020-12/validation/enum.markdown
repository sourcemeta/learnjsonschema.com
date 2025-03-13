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
---

The `enum` keyword restricts instances to a finite set of possible values,
which may be of different types.

{{<best-practice>}} Constraining instances to a set of possible values by
definition implies the given JSON types. Therefore, combining this keyword with
the [`type`]({{< ref "2020-12/validation/type" >}}) keyword is redundant (or
even invalid if types don't agree), and considered an
anti-pattern.{{</best-practice>}}

{{<common-pitfall>}} There are programming languages, such as JavaScript, that
[cannot distinguish between integers and real
numbers](https://2ality.com/2012/04/number-encoding.html). To accomodate for
those cases, JSON Schema considers a real number with a zero fractional part to
be equal to the corresponding integer. For example, in JSON Schema, `1` is
considered to be equal to `1.0`.{{</common-pitfall>}}

## Examples

{{<schema `A schema that constrains instances to an homogeneous string enumeration`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "enum": [ "red", "green", "blue" ]
}
{{</schema>}}

{{<instance-pass `A string value that equals a value in the enumeration is valid`>}}
"green"
{{</instance-pass>}}

{{<instance-fail `A string value that does not equal a value in the enumeration is invalid`>}}
"black"
{{</instance-fail>}}

{{<instance-fail `Any other value is invalid`>}}
2
{{</instance-fail>}}

{{<schema `A schema that constrains instances to an homogeneous numeric enumeration`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "enum": [ 1, 2.0, 3 ]
}
{{</schema>}}

{{<instance-pass `An integer value that equals a value in the enumeration is valid`>}}
1
{{</instance-pass>}}

{{<instance-pass `An integer representation of a real value that equals a value in the enumeration is valid`>}}
2
{{</instance-pass>}}

{{<instance-fail `Any other number value is invalid`>}}
5
{{</instance-fail>}}

{{<instance-fail `Any other non-number value is invalid`>}}
"Hello"
{{</instance-fail>}}

{{<schema `A schema that constrains instances to an heterogeneous enumeration`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "enum": [ "red", 123, true, { "foo": "bar" }, [ 1, 2 ], null ]
}
{{</schema>}}

{{<instance-pass `A boolean value that equals a value in the enumeration is valid`>}}
true
{{</instance-pass>}}

{{<instance-pass `An object value that equals a value in the enumeration is valid`>}}
{ "foo": "bar" }
{{</instance-pass>}}

{{<instance-fail `An object value that does not equal a value in the enumeration is invalid`>}}
{ "foo": "baz" }
{{</instance-fail>}}
