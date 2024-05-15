---
keyword: "unevaluatedProperties"
signature: "Schema"
summary: "Validates object properties that did not successfully validate against other standard object applicators."
kind: [ "applicator", "annotation" ]
instance: [ "object" ]
specification: "https://json-schema.org/draft/2020-12/json-schema-core.html#section-11.3"
metaschema: "https://json-schema.org/draft/2020-12/meta/unevaluated"
tests:
  - draft2020-12/unevaluatedProperties.json
introduced_in: 2019-09
annotation:
   description: The set of instance property names validated by this keyword's subschema
   kind: [ "array" ]
interdependencies:
  - vocabulary: applicator
    keyword: properties
  - vocabulary: applicator
    keyword: patternProperties
  - vocabulary: applicator
    keyword: additionalProperties
related:
  - vocabulary: unevaluated
    keyword: unevaluatedItems
---

## Evaluation

Before delving into `unevaluatedProperties`, it's crucial to understand what evaluation means in this context.

`unevaluatedProperties` considers annotations from `properties`, `patternProperties`, and `additionalProperties`, both as adjacent keywords and in subschemas of adjacent keywords. Additionally, it is also affected by other `unevaluatedProperties` in nested schemas (if present).

- The keywords `properties`, `patternProperties`, `additionalProperties`, and `unevaluatedProperties` produce annotations for the properties they successfully validate against.
- If any of these keywords generate an annotation for a particular property at the same instance location (independently of the schema location), that property is considered as evaluated.
- By definition, the `unevaluatedProperties` subschema is always applied after `properties`, `patternProperties`, and `additionalProperties` subschemas.
- As its name implies, `unevaluatedProperties` applies to any object property that has not been previously evaluated.

## Explanation

Validation with `unevaluatedProperties` applies only to the child values of instance names that do not appear in the `properties`, `patternProperties`, `additionalProperties`, or `unevaluatedProperties` annotation results that apply to the instance location being validated. For all such properties, validation succeeds if the child instance validates against the `unevaluatedProperties` schema.

- The value of `unevaluatedProperties` must be a valid JSON Schema.
- The annotation result of this keyword is the set of instance property names validated by this keyword's subschema.

## Examples

{{<schema `Schema with 'unevaluatedProperties' set to boolean true`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "unevaluatedProperties": true
}
{{</schema>}}

{{<instance-pass `All object instances pass against the true schema`>}}
{ "foo": "bar", "baz": 33 }
{{</instance-pass>}}

{{<instance-pass `'unevaluatedProperties' does not have any effect on instances other than an object`>}}
"John Doe"
{{</instance-pass>}}

{{<instance-annotation>}}
[
  // ...
  {
    "valid": true,
    "keywordLocation": "/unevaluatedProperties",
    "instanceLocation": "",
    "annotation": [ "foo", "baz" ]
  },
  // ...
]
{{</instance-annotation>}}

* Here, no properties are defined in the above schema. Consequently, all properties in an object instance are considered unevaluated, and the `unevaluatedProperties` subschema applies to them. Since the subschema here is a boolean true, an instance with unevaluated properties, regardless of their value, is considered valid.

{{<schema `Schema with 'unevaluatedProperties' set to boolean false`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "unevaluatedProperties": false
}
{{</schema>}}

{{<instance-fail `All object instances fail against the false schema`>}}
{ "foo": "bar" }
{{</instance-fail>}}

{{<instance-pass `'unevaluatedProperties' does not have any effect on instances other than an object`>}}
[ "John", 46, false ]
{{</instance-pass>}}

{{<schema `Schema with 'unevaluatedProperties', 'properties', and 'patternProperties', with unevaluatedProperties set to boolean false`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "properties": {
    "foo": { "type": "string" }
  },
  "patternProperties": {
    "^b": { "type": "number" }
  },
  "unevaluatedProperties": false
}
{{</schema>}}

{{<instance-fail `An instance with unevaluated properties is invalid`>}}
{ "foo": "foo", "bar": 36, "fooBar": false }
{{</instance-fail>}}

{{<instance-pass `An instance with no unevaluated properties is valid`>}}
{ "foo": "foo", "bar": 36 }
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
  {
    "valid": true,
    "keywordLocation": "/patternProperties",
    "instanceLocation": "",
    "annotation": [ "bar" ]
  },
  // ...
]
{{</instance-annotation>}}

* For the first instace, the annotation result of `properties` is [ "foo" ], and the annotation result of `patternProperties` is [ "bar" ]. However, the 'fooBar' property remains unevaluated, so the `unevaluatedProperties` subschema applies to it. This subschema fails (as any instance against a false schema is always invalid), leading to the failure of the entire schema.
* For the second instace, the annotation result of `properties` is [ "foo" ], and the annotation result of `patternProperties` is [ "bar" ]. No properties remain unevaluated; hence, the instance is considered valid.

{{<schema `Schema with 'unevaluatedProperties', 'properties', and 'patternProperties', with unevaluatedProperties set to an object subschema`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "properties": {
    "foo": { "type": "string" }
  },
  "patternProperties": {
    "^b": { "type": "number" }
  },
  "unevaluatedProperties": { "type": "boolean" }
}
{{</schema>}}

{{<instance-pass `An instance with no unevaluated properties is valid`>}}
{ "foo": "foo", "bar": 36 }
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
  {
    "valid": true,
    "keywordLocation": "/patternProperties",
    "instanceLocation": "",
    "annotation": [ "bar" ]
  },
  // ...
]
{{</instance-annotation>}}

{{<instance-pass `An instance with unevaluated properties that conform to the 'unevaluatedProperties' subschema is valid`>}}
{ "foo": "foo", "bar": 36, "fooBar": false }
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
  {
    "valid": true,
    "keywordLocation": "/patternProperties",
    "instanceLocation": "",
    "annotation": [ "bar" ]
  },
  {
    "valid": true,
    "keywordLocation": "/unevaluatedProperties",
    "instanceLocation": "",
    "annotation": [ "fooBar" ]
  },
  // ...
]
{{</instance-annotation>}}

{{<instance-fail `An instance with unevaluated properties that do not conform to the 'unevaluatedProperties' subschema is invalid`>}}
{ "foo": "foo", "bar": 36, "fooBar": "string" }
{{</instance-fail>}}
* For the first instance, there are no unevaluated properties.
* For the second instance, 'fooBar' is unevaluated, and the `unevaluatedProperties` subschema applies to it. 'fooBar' conforms to this subschema, and hence the instance is valid. The annotations produced by applicators are: `properties` → [ "foo" ], `patternProperties` → [ "bar" ], and `unevaluatedProperties` → [ "fooBar" ].

{{<schema `Schema with 'unevaluatedProperties' and 'allOf' keyword`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "properties": {
    "foo": { "type": "string" }
  },
  "allOf": [
    {
      "patternProperties": {
        "^b": { "type": "number" }
      }
    }
  ],
  "unevaluatedProperties": { "type": "boolean" }
}
{{</schema>}}

{{<instance-pass `An instance with unevaluated properties that conform to the 'unevaluatedProperties' subschema is valid`>}}
{ "foo": "foo", "bar": 36, "fooBar": false }
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
  {
    "valid": true,
    "keywordLocation": "/allOf/0/patternProperties",
    "instanceLocation": "",
    "annotation": [ "foo" ]
  },
  {
    "valid": true,
    "keywordLocation": "/unevaluatedProperties",
    "instanceLocation": "",
    "annotation": [ "fooBar" ]
  },
  // ...
]
{{</instance-annotation>}}

{{<instance-fail `An instance with unevaluated properties that do not conform to the 'unevaluatedProperties' subschema is invalid`>}}
{ "foo": "foo", "bar": 36, "fooBar": "string" }
{{</instance-fail>}}
For the above two instances, the annotation result of `properties` is [ "foo" ], and the annotation result of nested `patternProperties` is [ "bar" ]. The `unevaluatedProperties` recognizes the annotations from `properties` as well as `patternProperties` (as it can see through adjacent and nested applicators as only the produced annotations matter, not the schema structure) and ensures that 'fooBar' remains unevaluated and its subschema applies to 'fooBar'.
* The first instance passes as it conforms to the unevaluated subschema.
* The second instance fails as it does not conform to the unevaluated subschema.

{{<schema `Schema with 'unevaluatedProperties' and 'allOf' keyword`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "properties": {
    "foo": { "type": "string" }
  },
  "allOf": [
    {
      "additionalProperties": true
    }
  ],
  "unevaluatedProperties": false
}
{{</schema>}}

{{<instance-pass `An instance with no unevaluated properties is valid`>}}
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
  {
    "valid": true,
    "keywordLocation": "/allOf/0/additionalProperties",
    "instanceLocation": "",
    "annotation": [ "foo" ]
  },
  // ...
]
{{</instance-annotation>}}

{{<instance-pass `An instance with no unevaluated properties is valid`>}}
{ "foo": "foo", "bar": "bar" }
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
  {
    "valid": true,
    "keywordLocation": "/allOf/0/additionalProperties",
    "instanceLocation": "",
    "annotation": [ "foo", "bar" ]
  },
  // ...
]
{{</instance-annotation>}}

* In the first case, there are no unevaluated properties.
* In the second case, the nested `{ additionalProperties: true }` evaluated all the remaining properties. So there's nothing left unevaluated.

{{<schema `Schema with 'unevaluatedProperties' and '#ref' keyword`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "properties": {
      "foo": { "type": "string" }
  },
  "$ref": "#/$defs/bar",
  "unevaluatedProperties": false,
  "$defs": {
    "bar": {
      "properties": {
        "bar": { "type": "string" }
      }
    }
  }
}
{{</schema>}}

{{<instance-pass `An instance with no unevaluated properties is valid`>}}
{ "foo": "foo", "bar": "bar" }
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
  {
    "valid": true,
    "keywordLocation": "/$ref/properties",
    "instanceLocation": "",
    "annotation": [ "bar" ]
  },
  // ...
]
{{</instance-annotation>}}

{{<instance-fail `An instance with unevaluated properties is invalid`>}}
{ "foo": "foo", "bar": "bar", "baz": "baz" }
{{</instance-fail>}}

{{<schema `Schema with nested 'unevaluatedProperties' keyword`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "properties": {
    "foo": { "type": "string" }
  },
  "allOf": [
    {
      "unevaluatedProperties": true
    }
  ],
  "unevaluatedProperties": false
}
{{</schema>}}

{{<instance-pass `No properties remain unevaluated for the top-level 'unevaluatedProperties'`>}}
{ "foo": "foo", "bar": 101 }
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
  {
    "valid": true,
    "keywordLocation": "/allOf/0/unevaluatedProperties",
    "instanceLocation": "",
    "annotation": [ "foo", "bar" ]
  },
  // ...
]
{{</instance-annotation>}}
