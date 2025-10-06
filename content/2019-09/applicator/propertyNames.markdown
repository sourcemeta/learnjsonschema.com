---
keyword: "propertyNames"
signature: "Schema"
value: This keyword must be set to a valid JSON Schema
summary: "Validation succeeds if the schema validates against every property name in the instance."
kind: [ "applicator" ]
instance: [ "object" ]
specification: "https://json-schema.org/draft/2019-09/draft-handrews-json-schema-02#rfc.section.9.3.2.5"
metaschema: "https://json-schema.org/draft/2019-09/meta/applicator"
default:
  value: "{}"
tests:
  - draft2019-09/propertyNames.json
index: -997
introduced_in: draft6
related:
  - vocabulary: applicator
    keyword: patternProperties
  - vocabulary: applicator
    keyword: additionalProperties
  - vocabulary: applicator
    keyword: dependentSchemas
  - vocabulary: validation
    keyword: required
  - vocabulary: validation
    keyword: dependentRequired
  - vocabulary: validation
    keyword: minProperties
  - vocabulary: validation
    keyword: maxProperties
  - vocabulary: applicator
    keyword: unevaluatedProperties
---

The [`propertyNames`]({{< ref "2019-09/applicator/propertynames" >}}) keyword
restricts object instances to only define properties whose names match the given
schema. This keyword is evaluated against _every_ property of the object
instance, independently of keywords that indirectly introduce property names
such as [`properties`]({{< ref "2019-09/applicator/properties" >}}) and
[`patternProperties`]({{< ref "2019-09/applicator/patternproperties" >}}).
Annotations coming from inside this keyword are dropped.

{{<common-pitfall>}} As per the JSON grammar, the name of an object property
must be a string. Therefore, setting this keyword to a schema that makes use
of keywords that only apply to types other than strings (such as the
[`properties`]({{< ref "2019-09/applicator/properties" >}}) keyword) is
either meaningless or leads to unsatisfiable schemas. Conversely, explicitly
setting the [`type`]({{< ref "2019-09/validation/type" >}}) keyword to
`string` is redundant.  {{</common-pitfall>}}

{{<best-practice>}} This keyword is useful when describing JSON objects whose
properties cannot be known in advance. For example, allowing extensions that
must adhere to a certain name convention. If that's not the case, prefer
explicitly listing every permitted property using the [`properties`]({{< ref
"2019-09/applicator/properties" >}}) or [`patternProperties`]({{< ref
"2019-09/applicator/patternproperties" >}}) keywords, and potentially closing
the object by setting the [`additionalProperties`]({{< ref
"2019-09/applicator/additionalproperties" >}}) keyword to `false`.
{{</best-practice>}}

{{<constraint-warning `object`>}}

## Examples

{{<schema `A schema that constrains object instances to define lowercase properties`>}}
{
  "$schema": "https://json-schema.org/draft/2019-09/schema",
  "propertyNames": { "pattern": "^[a-z]*$" }
}
{{</schema>}}

{{<instance-pass `An object value with lowercase properties is valid`>}}
{ "foo": "bar" }
{{</instance-pass>}}

{{<instance-pass `An empty object value is valid`>}}
{}
{{</instance-pass>}}

{{<instance-fail `An object value with uppercase or alphanumeric properties is invalid`>}}
{ "CamelCase": true, "alphanumeric123": false }
{{</instance-fail>}}

{{<instance-pass `A non-object value is valid`>}}
"Hello World"
{{</instance-pass>}}

{{<schema `A schema that incorrecly constrains object property names to an impossible type`>}}
{
  "$schema": "https://json-schema.org/draft/2019-09/schema",
  "propertyNames": { "type": "array" }
}
{{</schema>}}

{{<instance-fail `Any non-empty object value is invalid`>}}
{ "foo": "bar" }
{{</instance-fail>}}

{{<instance-pass `An empty object value is valid`>}}
{}
{{</instance-pass>}}

{{<instance-pass `A non-object value is valid`>}}
"Hello World"
{{</instance-pass>}}

{{<schema `A schema with a property name unsatisfiable collision between keywords`>}}
{
  "$schema": "https://json-schema.org/draft/2019-09/schema",
  "propertyNames": { "pattern": "^b" },
  "properties": {
    "foo": { "type": "integer" },
    "bar": { "type": "integer" }
  }
}
{{</schema>}}

{{<instance-fail `An object value with a defined property that does not match every name constraint is invalid`>}}
{ "foo": 1 }
{{</instance-fail>}}

{{<instance-fail `An object value with a property that matches every name constraint but does not match its declaration is invalid`>}}
{ "bar": "should have been an integer" }
{{</instance-fail>}}

{{<instance-pass `An object value with a non-defined property that matches every name constraint is valid`>}}
{ "baz": "qux" }
{{</instance-pass>}}
