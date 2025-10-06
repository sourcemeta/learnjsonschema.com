---
keyword: "dependentSchemas"
signature: "Object<String, Schema>"
value: This keyword must be set to an object where each value is a valid JSON Schema
summary: "This keyword specifies subschemas that are evaluated if the instance is an object and contains a certain property."
kind: [ "applicator" ]
instance: [ "object" ]
specification: "https://json-schema.org/draft/2020-12/json-schema-core.html#section-10.2.2.4"
metaschema: "https://json-schema.org/draft/2020-12/meta/applicator"
default:
  value: "{}"
tests:
  - draft2020-12/dependentSchemas.json
index: -997
introduced_in: 2019-09
related:
  - vocabulary: validation
    keyword: required
  - vocabulary: validation
    keyword: dependentRequired
---

The [`dependentSchemas`]({{< ref "2020-12/applicator/dependentSchemas" >}}) keyword
restricts object instances to validate against one or more of the given
subschemas if the corresponding properties are defined.  Note that the given
subschemas are evaluated against the object that defines the property
dependency.

{{<learning-more>}}The [`dependentRequired`]({{< ref
"2020-12/validation/dependentrequired" >}}) keyword is a specialisation of this
keyword to describe object dependencies that only consist in property
requirement.{{</learning-more>}}

{{<constraint-warning `object`>}}

## Examples

{{<schema `A schema that constrains object instances with a single property schema dependency`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "dependentSchemas": {
    "foo": { "maxProperties": 2 }
  }
}
{{</schema>}}

{{<instance-pass `An object value that defines the property dependency and matches the dependent schema is valid`>}}
{ "foo": 1, "bar": 2 }
{{</instance-pass>}}

{{<instance-fail `An object value that defines the property dependency but does not match the dependent schema is invalid`>}}
{ "foo": 1, "bar": 2, "baz": 3 }
{{</instance-fail>}}

{{<instance-pass `An object value that does not define the property dependency is valid`>}}
{ "firstName": "John", "lastName": "Doe", "age": 50 }
{{</instance-pass>}}

{{<instance-pass `An empty object value is valid as no dependencies apply`>}}
{}
{{</instance-pass>}}

{{<instance-pass `A non-object value is valid`>}}
"Hello World"
{{</instance-pass>}}

{{<schema `A schema that constrains object instances with multiple property schema dependencies`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "dependentSchemas": {
    "foo": { "maxProperties": 2 },
    "bar": { "minProperties": 2 }
  }
}
{{</schema>}}

{{<instance-pass `An object value that defines both property dependencies and has exactly 2 properties is valid`>}}
{ "foo": 1, "bar": 2 }
{{</instance-pass>}}

{{<instance-fail `An object value that defines both property dependencies but has more than 2 properties is invalid`>}}
{ "foo": 1, "bar": 2, "extra": true }
{{</instance-fail>}}

{{<instance-pass `An object value that defines the first property dependency and has less than 2 properties is valid`>}}
{ "foo": 1 }
{{</instance-pass>}}

{{<instance-fail `An object value that defines the first property dependency and has more than 2 properties is invalid`>}}
{ "foo": 1, "name": "John Doe", "age": 50 }
{{</instance-fail>}}

{{<instance-fail `An object value that defines the second property dependency and has less than 2 properties is invalid`>}}
{ "bar": 2 }
{{</instance-fail>}}

{{<instance-pass `An empty object value is valid as no dependencies apply`>}}
{}
{{</instance-pass>}}

{{<instance-pass `A non-object value is valid`>}}
"Hello World"
{{</instance-pass>}}
