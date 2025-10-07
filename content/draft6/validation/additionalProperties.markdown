---
keyword: "additionalProperties"
signature: "Schema"
value: This keyword must be set to a valid JSON Schema
summary: "Validation succeeds if the schema validates against each value not matched by other object applicators in this vocabulary."
kind: [ "applicator" ]
instance: [ "object" ]
specification: "https://json-schema.org/draft-06/draft-wright-json-schema-validation-01#rfc.section.6.20"
metaschema: "http://json-schema.org/draft-06/schema#"
tests:
  - draft6/additionalProperties.json
default:
  value: "{}"
introduced_in: draft0
index: -4
interdependencies:
  - vocabulary: validation
    keyword: properties
  - vocabulary: validation
    keyword: patternProperties
related:
  - vocabulary: validation
    keyword: dependencies
  - vocabulary: validation
    keyword: propertyNames
  - vocabulary: validation
    keyword: required
  - vocabulary: validation
    keyword: minProperties
  - vocabulary: validation
    keyword: maxProperties
---

The [`additionalProperties`]({{< ref "draft6/validation/additionalproperties"
>}}) keyword restricts object instance properties not described by the
_sibling_ [`properties`]({{< ref "draft6/validation/properties" >}}) and
[`patternProperties`]({{< ref "draft6/validation/patternproperties" >}})
keywords (if any), to validate against the given subschema.

{{<common-pitfall>}}The use of the [`properties`]({{< ref
"draft6/validation/properties" >}}) keyword **does not prevent the presence of
other properties** in the object instance and **does not enforce the presence
of the declared properties**. In other words, additional data that is not
explicitly prohibited is permitted by default. This is intended behaviour to
ease schema evolution (open schemas are backwards compatible by default) and to
enable highly-expressive constraint-driven schemas.

If you want to restrict instances to only contain the properties you declared,
you must set this keyword to the boolean schema `false`, and if you want to
enforce the presence of certain properties, you must use the [`required`]({{<
ref "draft6/validation/required" >}}) keyword accordingly.
{{</common-pitfall>}}

{{<learning-more>}}While the most common use of this keyword is setting it to
the boolean schema `false` to prevent additional properties, it is possible to
set it to a satisfiable schema. Doing this, while omitting the
[`properties`]({{< ref "draft6/validation/properties" >}}) and
[`patternProperties`]({{< ref "draft6/validation/patternproperties" >}})
keywords, is an elegant way of describing how the value of every property in
the object instance must look like independently of its
name.{{</learning-more>}}

{{<constraint-warning `object`>}}

## Examples

{{<schema `A schema that constrains object instances to not define additional properties`>}}
{
  "$schema": "http://json-schema.org/draft-06/schema#",
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
  "$schema": "http://json-schema.org/draft-06/schema#",
  "additionalProperties": { "type": "integer" }
}
{{</schema>}}

{{<instance-pass `An object value that only defines integer properties is valid`>}}
{ "foo": 1, "bar": 2, "baz": 3 }
{{</instance-pass>}}

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
  "$schema": "http://json-schema.org/draft-06/schema#",
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

{{<instance-fail `An object value that defines valid properties and also defines non-boolean additional properties is invalid`>}}
{ "foo": "bar", "x-test": 2, "extra": "should be a boolean" }
{{</instance-fail>}}

{{<instance-pass `An empty object value is valid`>}}
{}
{{</instance-pass>}}

{{<instance-pass `A non-object value is valid`>}}
"Hello World"
{{</instance-pass>}}
