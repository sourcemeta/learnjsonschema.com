---
keyword: "unevaluatedProperties"
signature: "Schema"
summary: "Validates object properties that did not successfully validate against other standard object applicators."
kind: [ "applicator", "annotation" ]
instance: [ "object" ]
specification: "https://json-schema.org/draft/2020-12/json-schema-core.html#section-11.3"
metaschema: "https://json-schema.org/draft/2020-12/meta/unevaluated"
introduced_in: 2019-09
interdependencies:
  - vocabulary: applicator
    keyword: properties
  - vocabulary: applicator
    keyword: patternProperties
  - vocabulary: applicator
    keyword: additionalProperties
  - vocabulary: validation
    keyword: minProperties
  - vocabulary: validation
    keyword: maxProperties
related:
  - vocabulary: unevaluated
    keyword: unevaluatedItems
---

Annotations
-----------

If this keyword is applied to any instance element, it produces an annotation value of `true`.

## Explanation

First, let's understand what evaluation means. `unevaluatedProperties` considers annotations from `properties`, `patternProperties`, and `additionalProperties`, both as adjacent keywords and in subschemas of adjacent keywords. Additionally, `unevaluatedProperties` is affected by other `unevaluatedProperties` in nested schemas (if present). Each of these keywords will produce an annotation of the properties that they've evaluated. For `properties`, it's just the listed keys intersected with what's in the instance; for `patternProperties`, it's the list of properties that matches at least one of the regexes; for `additionalProperties`, it's basically the rest of the properties. If any of these are in subschemas of adjacent keywords, and those subschemas fail validation, those annotations are dropped in that case. The effect is that those properties are not considered evaluated.

Validation with `unevaluatedProperties` applies only to the child values of instance names that do not appear in the `properties`, `patternProperties`, `additionalProperties`, or `unevaluatedProperties` annotation results that apply to the instance location being validated.

For all such properties, validation succeeds if the child instance validates against the `unevaluatedProperties` schema. This means that `properties`, `patternProperties`, `additionalProperties`, and all in-place applicators must be evaluated before this keyword can be evaluated.

- The value of `unevaluatedProperties` must be a valid JSON Schema.
- It considers annotations from `properties`, `patternProperties`, and `additionalProperties`, both as adjacent keywords and in subschemas of adjacent keywords.
- This annotation affects the behavior of `unevaluatedProperties` in parent schemas.
- `unevaluatedProperties` cannot see outside the schema to which it belongs.
- This keyword is similar to `additionalProperties` except that it can recognize properties declared in subschemas.
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
    "keywordLocation": "/allOf/patternProperties",
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
For the above two instances, the annotation result of `properties` is → [ "foo" ], and the annotation result of nested `patternProperties` is → [ "bar" ]. The `unevaluatedProperties` recognizes the annotations from `properties` as well as `patternProperties` (as it can see through adjacent and nested applicators) and ensures that 'fooBar' remains unevaluated and its subschema applies to 'fooBar'.
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

{{<instance-pass `An instance with no unevaluated proeprties is valid`>}}
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
    "keywordLocation": "/allOf/additionalProperties",
    "instanceLocation": "",
    "annotation": [ "foo" ]
  },
  // ...
]
{{</instance-annotation>}}

{{<instance-pass `An instance with no unevaluated proeprties is valid`>}}
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
    "keywordLocation": "/allOf/additionalProperties",
    "instanceLocation": "",
    "annotation": [ "foo", "bar" ]
  },
  // ...
]
{{</instance-annotation>}}

* In the first case, there are no unevaluated properties.
* In the second case, all the unevaluated properties are handled by nested `{ additionalProperties: true }`. So there's nothing left unevaluated.

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

{{<instance-pass `An instance with no unevaluated proeprties is valid`>}}
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

{{<instance-fail `An instance with unevaluated proeprties is invalid`>}}
{ "foo": "foo", "bar": "bar", "baz": "baz" }
{{</instance-fail>}}