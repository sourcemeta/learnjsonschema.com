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
occurrences of [`properties`]({{< ref "2020-12/applicator/properties" >}}),
[`patternProperties`]({{< ref "2020-12/applicator/patternproperties" >}}),
[`additionalProperties`]({{< ref "2020-12/applicator/additionalproperties"
>}}), and [`unevaluatedProperties`]({{< ref
"2020-12/unevaluated/unevaluatedproperties" >}}) itself, as long as the
evaluate path that led to [`unevaluatedProperties`]({{< ref
"2020-12/unevaluated/unevaluatedproperties" >}}) is a _prefix_ of the evaluate
path of the others.

Given its evaluation-dependent nature, this keyword is evaluated after every
other keyword from every other vocabulary.

{{<best-practice>}}

There are two common use cases for this keyword, both for reducing duplication:
(1) Elegantly describing additional object properties while declaring the
[`properties`]({{< ref "2020-12/applicator/properties" >}}) or
[`patternProperties`]({{< ref "2020-12/applicator/patternproperties" >}})
keywords behind conditional logic without duplicating the
[`additionalProperties`]({{< ref "2020-12/applicator/additionalproperties"
>}}) keyword in every possible branch. (2) Reusing
helpers that consist of the [`properties`]({{< ref
"2020-12/applicator/properties" >}}), [`patternProperties`]({{< ref
"2020-12/applicator/patternproperties" >}}), or [`additionalProperties`]({{<
ref "2020-12/applicator/additionalproperties" >}}) keywords, while specialising
the helpers as needed in specific locations without having to inline the entire
contents of the helper.

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

{{<schema `A schema that conditionally constrains object instances to define certain properties, with string additional properties in both cases`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "if": { "maxProperties": 2 },
  "then": { "properties": { "foo": true } },
  "else": { "patternProperties": { "^@": true } },
  "unevaluatedProperties": { "type": "string" }
}
{{</schema>}}

{{<instance-pass `An object value that defines a "foo" property and other string properties is valid`>}}
{ "foo": 1, "bar": "baz" }
{{</instance-pass>}}

{{<instance-annotation>}}
{ "keyword": "/then/properties", "instance": "", "value": [ "foo" ] }
{ "keyword": "/unevaluatedProperties", "instance": "", "value": [ "bar" ] }
{{</instance-annotation>}}

{{<instance-pass `An object value that defines multiple properties that start with "@" and other string properties is valid`>}}
{ "@foo": 1, "@bar": 2, "baz": "qux" }
{{</instance-pass>}}

{{<instance-annotation>}}
{ "keyword": "/else/patternProperties", "instance": "", "value": [ "@foo", "@bar" ] }
{ "keyword": "/unevaluatedProperties", "instance": "", "value": [ "baz" ] }
{{</instance-annotation>}}

{{<instance-fail `An object value that defines a "foo" property and other non-string properties is invalid`>}}
{ "foo": 1, "bar": 2 }
{{</instance-fail>}}

{{<instance-fail `An object value that defines multiple properties that start with "@" and other non-string properties is invalid`>}}
{ "@foo": 1, "@bar": 2, "baz": 3 }
{{</instance-fail>}}

{{<instance-pass `An empty object value is valid`>}}
{}
{{</instance-pass>}}

{{<instance-pass `A non-object value is valid`>}}
"Hello World"
{{</instance-pass>}}

{{<schema `A schema that constraints object instances to only allow extension keywords that start with "@" using a helper`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "properties": { "foo": true },
  "$ref": "#/$defs/allow-extensions",
  "unevaluatedProperties": false,
  "$defs": {
    "allow-extensions": {
      "patternProperties": { "^@": true }
    }
  }
}
{{</schema>}}

{{<instance-pass `An object value that only defines a "foo" property is valid`>}}
{ "foo": 1 }
{{</instance-pass>}}

{{<instance-annotation>}}
{ "keyword": "/properties", "instance": "", "value": [ "foo" ] }
{{</instance-annotation>}}

{{<instance-pass `An object value that only defines a "foo" property and other properties that start with "@" is valid`>}}
{ "foo": 1, "@bar": 2, "@baz": 3 }
{{</instance-pass>}}

{{<instance-annotation>}}
{ "keyword": "/properties", "instance": "", "value": [ "foo" ] }
{ "keyword": "/$defs/allow-extensions/patternProperties", "instance": "", "value": [ "@bar", "@baz" ] }
{{</instance-annotation>}}

{{<instance-pass `An object value that only defines properties that start with "@" is valid`>}}
{ "@foo": 1, "@bar": 2, "@baz": 3 }
{{</instance-pass>}}

{{<instance-annotation>}}
{ "keyword": "/$defs/allow-extensions/patternProperties", "instance": "", "value": [ "@foo", "@bar", "@baz" ] }
{{</instance-annotation>}}

{{<instance-fail `An object value that only defines a "foo" property and other properties that do not start with "@" is invalid`>}}
{ "foo": 1, "bar": 2 }
{{</instance-fail>}}

{{<instance-pass `An empty object value is valid`>}}
{}
{{</instance-pass>}}

{{<instance-pass `A non-object value is valid`>}}
"Hello World"
{{</instance-pass>}}

{{<schema `A schema that constraints object instances to not define any properties, as both object keywords are cousins`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "allOf": [
    { "properties": { "foo": true } },
    { "unevaluatedProperties": false }
  ]
}
{{</schema>}}

{{<instance-fail `An object value that only defines a "foo" property is invalid as the schema prohibits unevaluated properties`>}}
{ "foo": 1 }
{{</instance-fail>}}

{{<instance-fail `An object value that defines any other property is invalid as the schema prohibits unevaluated properties`>}}
{ "bar": 2 }
{{</instance-fail>}}

{{<instance-pass `An empty object value is valid`>}}
{}
{{</instance-pass>}}

{{<instance-pass `A non-object value is valid`>}}
"Hello World"
{{</instance-pass>}}

{{<schema `A schema that constraints object instances to define arbitrary properties`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "allOf": [ { "unevaluatedProperties": true } ],
  "unevaluatedProperties": false
}
{{</schema>}}

{{<instance-pass `An object value that defines any property is valid as the nested applicator takes precedence`>}}
{ "foo": 1, "bar": 2, "baz": 3 }
{{</instance-pass>}}

{{<instance-annotation>}}
{ "keyword": "/allOf/0/unevaluatedProperties", "instance": "", "value": [ "foo", "bar", "baz" ] }
{{</instance-annotation>}}

{{<instance-pass `An empty object value is valid`>}}
{}
{{</instance-pass>}}

{{<instance-pass `A non-object value is valid`>}}
"Hello World"
{{</instance-pass>}}
