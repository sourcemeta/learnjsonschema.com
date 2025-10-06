---
keyword: "const"
signature: "Any"
value: This keyword must be set to a JSON value
summary: "Validation succeeds if the instance is equal to this keyword's value."
kind: [ "assertion" ]
instance: [ "any" ]
specification: "https://json-schema.org/draft/2019-09/draft-handrews-json-schema-validation-02#rfc.section.6.1.3"
metaschema: "https://json-schema.org/draft/2019-09/meta/validation"
tests:
  - draft2019-09/const.json
index: -99997
introduced_in: draft6
related:
  - vocabulary: validation
    keyword: enum
  - vocabulary: validation
    keyword: type
---

The [`const`]({{< ref "2019-09/validation/const" >}}) keyword (short for
"constant") restricts instances to a single specific JSON value of any type.

{{<best-practice>}} Constraining instances to a constant value by definition
implies the given JSON type. Therefore, combining this keyword with the
[`type`]({{< ref "2019-09/validation/type" >}}) keyword is redundant (or even
invalid if types don't agree), and considered an
anti-pattern.{{</best-practice>}}

{{<common-pitfall>}} There are programming languages, such as JavaScript, that
[cannot distinguish between integers and real
numbers](https://2ality.com/2012/04/number-encoding.html). To accommodate for
those cases, JSON Schema considers a real number with a zero fractional part to
be equal to the corresponding integer. For example, in JSON Schema, `1` is
considered to be equal to `1.0`.{{</common-pitfall>}}

## Examples

{{<schema `A schema that constrains instances to an integer constant value`>}}
{
  "$schema": "https://json-schema.org/draft/2019-09/schema",
  "const": 5
}
{{</schema>}}

{{<instance-pass `The desired integer value is valid`>}}
5
{{</instance-pass>}}

{{<instance-pass `The real value representation of the desired integer value is valid`>}}
5.0
{{</instance-pass>}}

{{<instance-fail `Any other number value is invalid`>}}
1234
{{</instance-fail>}}

{{<instance-fail `Any other non-number value is invalid`>}}
"Hello"
{{</instance-fail>}}

{{<schema `A schema that constrains instances to a complex object value`>}}
{
  "$schema": "https://json-schema.org/draft/2019-09/schema",
  "const": { "name": "John Doe", "age": 30 }
}
{{</schema>}}

{{<instance-pass `The object instance that equals the desired value is valid`>}}
{ "name": "John Doe", "age": 30 }
{{</instance-pass>}}

{{<instance-fail `Any other object value is invalid`>}}
{ "name": "Jane Doe", "age": 30 }
{{</instance-fail>}}

{{<instance-fail `Any other non-object value is invalid`>}}
30
{{</instance-fail>}}
