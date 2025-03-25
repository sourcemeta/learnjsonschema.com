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
introduced_in: draft1
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
described by the [`properties`]({{< ref "2020-12/applicator/properties" >}})
and [`patternProperties`]({{< ref "2020-12/applicator/patternproperties" >}})
keywords (if any), to validate against the given subschema. Information about
the properties that this keyword was evaluated for is reported using
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

{{<schema `Schema with 'additionalProperties' set to boolean false`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "properties": {
    "foo": { "type": "string" }
  },
  "additionalProperties": false
}
{{</schema>}}

{{<instance-pass `An instance with no additional properties is valid`>}}
{ "foo": "foo" }
{{</instance-pass>}}

{{<instance-annotation>}}
{ "keyword": "/properties", "instance": "", "value": [ "foo" ] }
{{</instance-annotation>}}

{{<instance-fail `An instance with additional properties is invalid`>}}
{ "foo": "foo", "bar": "bar" }
{{</instance-fail>}}
* _When `additionalProperties` is set to false, all the instance properties must either be present in the `properties` or match any regex within `patternProperties`; otherwise, the validaion will fail._

{{<schema `Schema with 'additionalProperties' set to an object schema`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "properties": {
    "name": { "type": "string" }
  },
  "additionalProperties": {
    "type": "number"
  }
}
{{</schema>}}

{{<instance-pass `An object instance with properties conforming to the schema is valid`>}}
{ "name": "John Doe", "age": 21 }
{{</instance-pass>}}

{{<instance-annotation>}}
{ "keyword": "/properties", "instance": "", "value": [ "name" ] },
{ "keyword": "/additionalProperties", "instance": "", "value": [ "age" ] }
{{</instance-annotation>}}

{{<instance-fail `The value of 'age' must be a number`>}}
{ "name": "John Doe", "age": "21" }
{{</instance-fail>}}
* _The value of `additionalProperties` can either be a boolean schema or an object schema._

{{<schema `Schema with 'patternProperties', 'properties' and 'additionalProperties' keyword`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "object",
  "properties": {
    "name": { "type": "string" }
  },
  "patternProperties": {
    "[Aa]ge$": { "type": "number" }
  },
  "additionalProperties": true
}
{{</schema>}}

{{<instance-fail `The value of the 'name' property must be a string`>}}
{
  "name": [ "John", "Doe" ],
  "Age": 21,
  "email": "foo@bar.com"
}
{{</instance-fail>}}

{{<instance-pass `An object instance with properties conforming to the schema is valid`>}}
{
  "name": "John Doe",
  "Age": 21,
  "email": "foo@bar.com"
}
{{</instance-pass>}}

{{<instance-annotation>}}
{ "keyword": "/properties", "instance": "", "value": [ "name" ] }
{ "keyword": "/patternProperties", "instance": "", "value": [ "Age" ] }
{ "keyword": "/additionalProperties", "instance": "", "value": [ "email" ] }
{{</instance-annotation>}}
* _Instance properties (keys) not present in `properties` or not matching any regex within `patternProperties` are evaluated against `additionalProperties`._

{{<schema `Schema with no 'additionalProperties' defined`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "object",
  "properties": {
    "name": { "type": "string" }
  },
  "patternProperties": {
    "[Aa]ge$": { "type": "number" }
  }
}
{{</schema>}}

{{<instance-pass `An object instance with properties conforming to the schema is valid`>}}
{
  "name": "John Doe",
  "Age": 21,
  "email": "foo@bar.com"
}
{{</instance-pass>}}

{{<instance-fail `The value of 'Age' must be a number`>}}
{
  "name": "John Doe",
  "Age": "21",
  "email": "foo@bar.com"
}
{{</instance-fail>}}

{{<instance-pass `An object instance with additional properties is valid`>}}
{
  "name": "John Doe",
  "Age": 21,
  "email": [ "foo", "@", "bar", "com" ]
}
{{</instance-pass>}}

{{<instance-annotation>}}
{ "keyword": "/properties", "instance": "", "value": [ "name" ] }
{ "keyword": "/patternProperties", "instance": "", "value": [ "Age" ] }
{{</instance-annotation>}}

 _**Note:** JSON Schema is a constraint language and if you don't limit keywords like this, then more keywords than what you defined in `properties`, etc would be allowed. If you don't define a property using `properties` or `patternProperties`, but don't disallow it with `additionalProperties`, it would still be valid with any value._
