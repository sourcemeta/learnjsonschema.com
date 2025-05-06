---
keyword: "unevaluatedProperties"
signature: "Schema"
value: This keyword must be set to a valid JSON Schema
summary: "Validates object properties that did not successfully validate against other standard object applicators."
kind: [ "applicator", "annotation" ]
instance: [ "object" ]
specification: "https://json-schema.org/draft/2020-12/json-schema-core.html#section-11.3"
metaschema: "https://json-schema.org/draft/2020-12/meta/unevaluated"
default:
  value: "{}"
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

The [`unevaluatedProperties`]({{< ref
"2020-12/unevaluated/unevaluatedproperties" >}}) keyword is a generalisation of
the [`additionalProperties`]({{< ref "2020-12/applicator/additionalproperties"
>}}) keyword that considers related keywords even when they are not direct
siblings of this keyword. More specifically, this keyword is affected by
occurences of [`properties`]({{< ref "2020-12/applicator/properties" >}}),
[`patternProperties`]({{< ref "2020-12/applicator/patternproperties" >}}),
[`additionalProperties`]({{< ref "2020-12/applicator/additionalproperties"
>}}), and [`unevaluatedProperties`]({{< ref
"2020-12/unevaluated/unevaluatedproperties" >}}) itself as long as the evaluate
path that led to [`unevaluatedProperties`]({{< ref
"2020-12/unevaluated/unevaluatedproperties" >}}) is a prefix of the evaluate
path of the others.

{{<best-practice>}}

There are two common use cases for this keyword, both for reducing duplication:
(1) Elegantly describing _additional_ object properties while declaring the
[`properties`]({{< ref "2020-12/applicator/properties" >}}) or
[`patternProperties`]({{< ref "2020-12/applicator/patternproperties" >}})
keywords behind conditional logic without duplicating the
[`additionalProperties`]({{< ref "2020-12/applicator/additionalproperties"
>}}) keyword in every possible branch. (2) Re-using 
the [`properties`]({{< ref "2020-12/applicator/properties" >}}) and
[`patternProperties`]({{< ref "2020-12/applicator/patternproperties" >}})
keywords, or the [`additionalProperties`]({{< ref
"2020-12/applicator/additionalproperties" >}}) keyword, as helpers while
specialising the helpers with other related keywords as needed in specific
locations without having to inline the entire helper.

{{</best-practice>}}

{{<learning-more>}}

The JSON Schema specification defines the relationship between this keyword and
the ones that affect it in terms of annotations. However, in practice, most
implementations avoid the use of annotations for performance reasons, as
emitting annotations and checking the annotation values of other keywords often
involves significant memory allocation and complex data structure traversals.

The paper [Elimination of annotation dependencies in validation for Modern JSON
Schema](https://arxiv.org/abs/2503.11288) is a comprehensive mathematical study
of how applicators can be automatically re-written to avoid annotation
dependencies, leading to schemas that are simpler to evaluate.

{{</learning-more>}}

{{<constraint-warning `object`>}}

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
{ "keyword": "/unevaluatedProperties", "instance": "", "value": [ "foo", "baz" ] }
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
{ "keyword": "/properties", "instance": "", "value": [ "foo" ] }
{ "keyword": "/patternProperties", "instance": "", "value": [ "bar" ] }
{{</instance-annotation>}}

* For the first instance, the annotation result of `properties` is [ "foo" ], and the annotation result of `patternProperties` is [ "bar" ]. However, the 'fooBar' property remains unevaluated, so the `unevaluatedProperties` subschema applies to it. This subschema fails (as any instance against a false schema is always invalid), leading to the failure of the entire schema.
* For the second instance, the annotation result of `properties` is [ "foo" ], and the annotation result of `patternProperties` is [ "bar" ]. No properties remain unevaluated; hence, the instance is considered valid.

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
{ "keyword": "/properties", "instance": "", "value": [ "foo" ] }
{ "keyword": "/patternProperties", "instance": "", "value": [ "bar" ] }
{{</instance-annotation>}}

{{<instance-pass `An instance with unevaluated properties that conform to the 'unevaluatedProperties' subschema is valid`>}}
{ "foo": "foo", "bar": 36, "fooBar": false }
{{</instance-pass>}}

{{<instance-annotation>}}
{ "keyword": "/properties", "instance": "", "value": [ "foo" ] }
{ "keyword": "/patternProperties", "instance": "", "value": [ "bar" ] }
{ "keyword": "/unevaluatedProperties", "instance": "", "value": [ "fooBar" ] }
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
{ "keyword": "/properties", "instance": "", "value": [ "foo" ] }
{ "keyword": "/allOf/0/patternProperties", "instance": "", "value": [ "foo" ] }
{ "keyword": "/unevaluatedProperties", "instance": "", "value": [ "fooBar" ] }
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
{ "keyword": "/properties", "instance": "", "value": [ "foo" ] },
{ "keyword": "/allOf/0/additionalProperties", "instance": "", "value": [ "foo" ] }
{{</instance-annotation>}}

{{<instance-pass `An instance with no unevaluated properties is valid`>}}
{ "foo": "foo", "bar": "bar" }
{{</instance-pass>}}

{{<instance-annotation>}}
{ "keyword": "/properties", "instance": "", "value": [ "foo" ] }
{ "keyword": "/allOf/0/additionalProperties", "instance": "", "value": [ "foo", "bar" ] }
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
{ "keyword": "/properties", "instance": "", "value": [ "foo" ] }
{ "keyword": "/$ref/properties", "instance": "", "value": [ "bar" ] }
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
{ "keyword": "/properties", "instance": "", "value": [ "foo" ] }
{ "keyword": "/allOf/0/unevaluatedProperties", "instance": "", "value": [ "foo", "bar" ] }
{{</instance-annotation>}}
