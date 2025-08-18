---
keyword: "additionalProperties"
signature: "Schema"
value: This keyword must be set to a valid JSON Schema
summary: "Validation succeeds if the schema validates against each value not matched by other object applicators in this vocabulary."
kind: [ "applicator", "annotation" ]
instance: [ "object" ]
specification: "https://json-schema.org/draft/2020-12/json-schema-core.html#section-10.3.2.3"
metaschema: "https://json-schema.org/draft/2020-12/meta/applicator"
tests:
  - draft2020-12/additionalProperties.json
default:
  value: "{}"
index: -998
introduced_in: draft0
annotation:
   description: The set of instance property names validated by this keyword's subschema
   kind: [ "array" ]
interdependencies:
  - vocabulary: applicator
    keyword: properties
  - vocabulary: applicator
    keyword: patternProperties
affects:
  - vocabulary: unevaluated
    keyword: unevaluatedProperties
related:
  - vocabulary: applicator
    keyword: dependentSchemas
  - vocabulary: applicator
    keyword: propertyNames
  - vocabulary: validation
    keyword: required
  - vocabulary: validation
    keyword: dependentRequired
  - vocabulary: validation
    keyword: minProperties
  - vocabulary: validation
    keyword: maxProperties
  - vocabulary: unevaluated
    keyword: unevaluatedProperties
---

The `additionalProperties` keyword restricts object instance properties not
described by the _sibling_ [`properties`]({{< ref
"2020-12/applicator/properties"
>}}) and [`patternProperties`]({{< ref "2020-12/applicator/patternproperties"
>}}) keywords (if any), to validate against the given subschema. Information
about the properties that this keyword was evaluated for is reported using
annotations.

{{<common-pitfall>}}The use of the [`properties`]({{< ref
"2020-12/applicator/properties" >}}) keyword **does not prevent the presence of
other properties** in the object instance and **does not enforce the presence
of the declared properties**. In other words, additional data that is not
explicitly prohibited is permitted by default. This is intended behaviour to
ease schema evolution (open schemas are backwards compatible by default) and to
enable highly-expressive constraint-driven schemas.

If you want to restrict instances to only contain the properties you declared,
you must set this keyword to the boolean schema `false`, and if you want to
enforce the presence of certain properties, you must use the [`required`]({{<
ref "2020-12/validation/required" >}}) keyword accordingly.
{{</common-pitfall>}}

{{<learning-more>}}While the most common use of this keyword is setting it to
the boolean schema `false` to prevent additional properties, it is possible to
set it to a satisfiable schema. Doing this, while omitting the
[`properties`]({{< ref "2020-12/applicator/properties" >}}) and
[`patternProperties`]({{< ref "2020-12/applicator/patternproperties" >}})
keywords, is an elegant way of describing how the value of every property in
the object instance must look like independently of its
name.{{</learning-more>}}

{{<constraint-warning `object`>}}

## Examples

{{<schema `A schema that constrains object instances to not define additional properties`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "properties": {
    "foo": { "type": "string" }
  },
  "patternProperties": {
    "^x-": { "type": "integer" }
  },
  "additionalProperties": false
}
{{</schema>}}

{{<instance-pass `An object value that defines properties that only match static and regular expression definitions is valid`>}}
{ "foo": "bar", "x-test": 2 }
{{</instance-pass>}}

{{<instance-annotation>}}
{ "keyword": "/properties", "instance": "", "value": [ "foo" ] }
{ "keyword": "/patternProperties", "instance": "", "value": [ "x-test" ] }
{{</instance-annotation>}}

{{<instance-fail `An object value that defines valid properties and also defines additional properties is invalid`>}}
{ "foo": "bar", "x-test": 2, "extra": true }
{{</instance-fail>}}

{{<instance-fail `An object value that only defines additional properties is invalid`>}}
{ "extra": true, "random": 1234 }
{{</instance-fail>}}

{{<instance-pass `An empty object value is valid`>}}
{}
{{</instance-pass>}}

{{<instance-pass `A non-object value is valid`>}}
"Hello World"
{{</instance-pass>}}

{{<schema `A schema that constrains object instances to only define integer properties`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "additionalProperties": { "type": "integer" }
}
{{</schema>}}

{{<instance-pass `An object value that only defines integer properties is valid`>}}
{ "foo": 1, "bar": 2, "baz": 3 }
{{</instance-pass>}}

{{<instance-annotation>}}
{ "keyword": "/additionalProperties", "instance": "", "value": [ "foo", "bar", "baz" ] }
{{</instance-annotation>}}

{{<instance-fail `An object value that defines at least one non-integer property is invalid`>}}
{ "foo": 1, "name": "John Doe" }
{{</instance-fail>}}

{{<instance-pass `An empty object value is valid`>}}
{}
{{</instance-pass>}}

{{<instance-pass `A non-object value is valid`>}}
"Hello World"
{{</instance-pass>}}

{{<schema `A schema that constrains object instances to define boolean additional properties`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "properties": {
    "foo": { "type": "string" }
  },
  "patternProperties": {
    "^x-": { "type": "integer" }
  },
  "additionalProperties": {
    "type": "boolean"
  }
}
{{</schema>}}

{{<instance-pass `An object value that defines valid properties and boolean additional properties is valid`>}}
{ "foo": "bar", "x-test": 2, "extra": true }
{{</instance-pass>}}

{{<instance-annotation>}}
{ "keyword": "/properties", "instance": "", "value": [ "foo" ] }
{ "keyword": "/patternProperties", "instance": "", "value": [ "x-test" ] }
{ "keyword": "/additionalProperties", "instance": "", "value": [ "extra" ] }
{{</instance-annotation>}}

{{<instance-fail `An object value that defines valid properties and also defines non-boolean additional properties is invalid`>}}
{ "foo": "bar", "x-test": 2, "extra": "should be a boolean" }
{{</instance-fail>}}

{{<instance-pass `An empty object value is valid`>}}
{}
{{</instance-pass>}}

{{<instance-pass `A non-object value is valid`>}}
"Hello World"
{{</instance-pass>}}
