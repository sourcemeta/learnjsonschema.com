---
keyword: "properties"
signature: "Object<String, Schema>"
summary: "Validation succeeds if, for each name that appears in both the instance and as a name within this keyword's value, the child instance for that name successfully validates against the corresponding schema."
kind: [ "applicator", "annotation" ]
instance: [ "object" ]
specification: "https://json-schema.org/draft/2020-12/json-schema-core.html#section-10.3.2.1"
metaschema: "https://json-schema.org/draft/2020-12/meta/applicator"
index: -999
introduced_in: draft1
related:
  - vocabulary: applicator
    keyword: patternProperties
  - vocabulary: applicator
    keyword: additionalProperties
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

Annotations
-----------

The annotation result of this keyword is the set of instance property names matched by this keyword.

## Explanation

The `properties` keyword is used to define the properties (keys) that an object instance must or may contain. It allows you to specify the expected value of a property in an object instance. Each property within the `properties` object is defined by its name and a subschema describing the value expected for that property.

The annotation result of this keyword is the set of instance property names matched by this keyword. This annotation affects the behavior of `additionalProperties` and `unevaluatedProperties`.

* The value of `properties` must be an object.
* Each value of this object must be a valid JSON Schema.
* Each key within `properties` represents a property name in the object instance.
* The value associated with each key is a JSON Schema that defines validation rules for that property.
* Omitting this keyword has the same assertion behavior as an empty object.


{{<schema `Schema with 'proeprties' keyword`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "object",
  "properties": {
    "name": { "type": "string" },
    "age": { "type": "number" }
  }
}
{{</schema>}}

{{<instance-pass `An object instance with properties conforming to the schema is valid`>}}
{ "name": "John Doe", "age": 21 }
{{</instance-pass>}}

{{<instance-annotation>}}
{
  ...
  "annotations": {
    "properties": [ "name", "age" ]
  }
}
{{</instance-annotation>}}

{{<instance-fail `An object instance with properties not conforming to the schema is invalid`>}}
{ "name": "John Doe", "age": "21" }
{{</instance-fail>}}
* _Annotations are not produced when validation fails._

{{<schema `Schema with no properties defined`>}}
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

{{<instance-pass `An object instance with properties conforming to the schema is valid`>}}
{
  "name": "John Doe",
  "Age": 21,
  "email": [ "foo", "@", "bar", "com" ]
}
{{</instance-pass>}}

{{<instance-annotation>}}
{
  ...
  "annotations": {
    "properties": [ "name" ],
    "patternProperties": [ "Age" ]
  }
}
{{</instance-annotation>}}

* _If you don't define a property using `properties` or `patternProperties`, but don't disallow it with `additionalProperties`, it would still be valid with any value._

{{<schema `Schema with 'proeprties', 'patternProperties' and 'additionalProperties' keyword`>}}
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
{
  ...
  "annotations": {
    "properties": [ "name" ],
    "patternProperties": [ "Age" ],
    "additionalProperties": [ "email" ]
  }
}
{{</instance-annotation>}}
* _Property names not present in `properties` or `patternProperties` are evaluated against `additionalProperties`._