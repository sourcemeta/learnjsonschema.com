---
keyword: "properties"
signature: "Object<String, Schema>"
value: This keyword must be set to an object where each value is a valid JSON Schema
summary: "Validation succeeds if, for each name that appears in both the instance and as a name within this keyword's value, the child instance for that name successfully validates against the corresponding schema."
kind: [ "applicator", "annotation" ]
instance: [ "object" ]
specification: "https://json-schema.org/draft/2020-12/json-schema-core.html#section-10.3.2.1"
metaschema: "https://json-schema.org/draft/2020-12/meta/applicator"
default:
  value: "{}"
tests:
  - draft2020-12/properties.json
index: -999
introduced_in: draft1
annotation:
   description: The set of instance property names validated by this keyword's subschema
   kind: [ "array" ]
affects:
  - vocabulary: applicator
    keyword: additionalProperties
  - vocabulary: unevaluated
    keyword: unevaluatedProperties
related:
  - vocabulary: applicator
    keyword: patternProperties
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

The `properties` keyword restricts properties of an object instance, when
present, to match their corresponding schemas definitions.  Information about
the properties from the object instance that were evaluated is reported using
annotations.

{{<common-pitfall>}}The use of this keyword **does not prevent the presence of
other properties** in the object instance and **does not enforce the presence
of the declared properties**. In other words, additional data that is not
explicitly prohibited is permitted by default. This is intended behaviour to
ease schema evolution (open schemas are backwards compatible by default) and to
enable highly-expressive constraint-driven schemas.

If you want to restrict instances to only contain the properties you declared,
you must set the [`additionalProperties`]({{< ref
"2020-12/applicator/additionalproperties" >}}) keyword to `false`, and if you
want to enforce the presence of certain properties, you must use the
[`required`]({{< ref "2020-12/validation/required" >}}) keyword accordingly.
{{</common-pitfall>}}

{{<learning-more>}}Setting properties defined by this keyword to the boolean
schema `false` is an common trick to express that such properties are
forbidden. This is considered more elegant (and usually more performant) than
using the [`not`]({{< ref "2020-12/applicator/not" >}}) applicator to negate
the [`required`]({{< ref "2020-12/validation/required"
>}}) keyword. However, setting properties defined by this keyword to the
boolean `true` is considered to be redundant and an anti-pattern, as additional
properties are permitted by default.  {{</learning-more>}}

{{<common-pitfall>}} This keyword is evaluated independently of the
[`patternProperties`]({{< ref "2020-12/applicator/patternproperties" >}})
keyword. If an object property is described by both keywords, then both schemas
must successfully validate against the given property for validation to
succeed.  {{</common-pitfall>}}

{{<constraint-warning `object`>}}

## Examples

{{<schema `A schema that constrains object instances to a string and integer property`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "properties": {
    "name": { "type": "string" },
    "age": { "type": "integer" }
  }
}
{{</schema>}}

{{<instance-pass `An object value that defines both declared properties and matches the corresponding schemas is valid`>}}
{ "name": "John Doe", "age": 50 }
{{</instance-pass>}}

{{<instance-annotation>}}
{ "keyword": "/properties", "instance": "", "value": [ "name", "age" ] }
{{</instance-annotation>}}

{{<instance-pass `An object value that defines one of the declared properties and matches the corresponding schema is valid`>}}
{ "name": "John Doe" }
{{</instance-pass>}}

{{<instance-annotation>}}
{ "keyword": "/properties", "instance": "", "value": [ "name" ] }
{{</instance-annotation>}}

{{<instance-pass `An empty object value is valid as properties are optional by default`>}}
{}
{{</instance-pass>}}

{{<instance-fail `An object value that defines both declared properties but does not match one of the corresponding schemas is invalid`>}}
{ "name": "John Doe", "age": "this should have been an integer" }
{{</instance-fail>}}

{{<instance-fail `An object value that defines one of the declared properties but does not match its corresponding schema is invalid`>}}
{ "name": 999 }
{{</instance-fail>}}

{{<instance-pass `A non-object value is valid`>}}
"Hello World"
{{</instance-pass>}}

{{<schema `A schema that constrains object instances to forbid a specific property`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "properties": {
    "forbidden": false,
    "permitted": true
  }
}
{{</schema>}}

{{<instance-pass `An object value that only defines the permitted property is valid`>}}
{ "permitted": "anything is valid" }
{{</instance-pass>}}

{{<instance-annotation>}}
{ "keyword": "/properties", "instance": "", "value": [ "foo", "permitted" ] }
{{</instance-annotation>}}

{{<instance-pass `An object value that defines any additional property is valid as additional properties are permitted by default`>}}
{ "foo": "bar", "baz": 2 }
{{</instance-pass>}}

{{<instance-annotation>}}
{ "keyword": "/properties", "instance": "", "value": [ "foo", "baz" ] }
{{</instance-annotation>}}

{{<instance-fail `An object value that only defines the forbidden property is invalid`>}}
{ "forbidden": 1 }
{{</instance-fail>}}

{{<instance-fail `An object value that defines the forbidden property alongside other properties is invalid`>}}
{ "forbidden": 1, "permitted": 2 }
{{</instance-fail>}}
