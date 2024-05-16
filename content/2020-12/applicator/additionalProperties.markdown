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
target_version: "mvp"
---

## Explanation

The `additionalProperties` keyword is used to control the handling of properties whose names are not listed in the `properties` keyword or match any of the regular expressions in the `patternProperties` keyword. By default any additional properties are allowed.

The behavior of this keyword depends on the presence and annotation results of `properties` and `patternProperties` within the same schema object. Validation with `additionalProperties` applies only to the child values of instance names that do not appear in the annotation results of either `properties` or `patternProperties`.

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
[
  // ...
  {
    "valid": true,
    "keywordLocation": "/properties",
    "instanceLocation": "",
    "annotation": [ "foo" ]
  },
  // ...
]
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
[
  // ...
  {
    "valid": true,
    "keywordLocation": "/properties",
    "instanceLocation": "",
    "annotation": [ "name" ]
  },
  {
    "valid": true,
    "keywordLocation": "/additionalProperties",
    "instanceLocation": "",
    "annotation": [ "age" ]
  },
  // ...
]
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
[
  // ...
  {
    "valid": true,
    "keywordLocation": "/properties",
    "instanceLocation": "",
    "annotation": [ "name" ]
  },
  {
    "valid": true,
    "keywordLocation": "/patternProperties",
    "instanceLocation": "",
    "annotation": [ "Age" ]
  },
  {
    "valid": true,
    "keywordLocation": "/additionalProperties",
    "instanceLocation": "",
    "annotation": [ "email" ]
  },
  // ...
]
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
[
  // ...
  {
    "valid": true,
    "keywordLocation": "/properties",
    "instanceLocation": "",
    "annotation": [ "name" ]
  },
  {
    "valid": true,
    "keywordLocation": "/patternProperties",
    "instanceLocation": "",
    "annotation": [ "Age" ]
  },
  // ...
]
{{</instance-annotation>}}

 _**Note:** JSON Schema is a constraint language and if you don't limit keywords like this, then more keywords than what you defined in `properties`, etc would be allowed. If you don't define a property using `properties` or `patternProperties`, but don't disallow it with `additionalProperties`, it would still be valid with any value._
