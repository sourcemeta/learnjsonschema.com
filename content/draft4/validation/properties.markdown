---
keyword: "properties"
signature: "Object<String, Schema> | Boolean"
value: This keyword must be set to an object where each value is a valid JSON Schema
summary: "Validation succeeds if, for each name that appears in both the instance and as a name within this keyword's value, the child instance for that name successfully validates against the corresponding schema."
kind: [ "applicator" ]
instance: [ "object" ]
specification: "https://json-schema.org/draft-04/draft-fge-json-schema-validation-00#rfc.section.5.4.4"
metaschema: "http://json-schema.org/draft-04/schema#"
default:
  value: "{}"
tests:
  - draft4/properties.json
introduced_in: draft1
index: -6
affects:
  - vocabulary: validation
    keyword: additionalProperties
related:
  - vocabulary: validation
    keyword: patternProperties
  - vocabulary: validation
    keyword: dependencies
  - vocabulary: validation
    keyword: required
  - vocabulary: validation
    keyword: minProperties
  - vocabulary: validation
    keyword: maxProperties
---


The [`properties`]({{< ref "draft4/validation/properties" >}}) keyword
restricts properties of an object instance, when present, to match their
corresponding subschemas definitions.

{{<common-pitfall>}}The use of this keyword **does not prevent the presence of
other properties** in the object instance and **does not enforce the presence
of the declared properties**. In other words, additional data that is not
explicitly prohibited is permitted by default. This is intended behaviour to
ease schema evolution (open schemas are backwards compatible by default) and to
enable highly-expressive constraint-driven schemas.

If you want to restrict instances to only contain the properties you declared,
you must set the [`additionalProperties`]({{< ref "draft4/validation/additionalproperties" >}}) keyword to the boolean schema
`false`, and if you want to enforce the presence of certain properties, you
must use the [`required`]({{< ref "draft4/validation/required" >}}) keyword
accordingly.  {{</common-pitfall>}}

{{<learning-more>}}Setting properties defined by this keyword to the boolean
schema `false` is an common trick to express that such properties are
forbidden. This is considered more elegant (and usually more performant) than
using the [`not`]({{< ref "draft4/validation/not" >}}) applicator to negate
the [`required`]({{< ref "draft4/validation/required" >}}) keyword. However,
setting properties defined by this keyword to the boolean `true` is considered
to be redundant and an anti-pattern, as additional properties are permitted by
default.  {{</learning-more>}}

{{<common-pitfall>}} This keyword is evaluated independently of the
[`patternProperties`]({{< ref "draft4/validation/patternproperties" >}})
keyword. If an object property is described by both keywords, then both schemas
must successfully validate against the given property for validation to
succeed.  {{</common-pitfall>}}

{{<constraint-warning `object`>}}

## Examples

{{<schema `A schema that constrains object instances to a string and integer property`>}}
{
  "$schema": "http://json-schema.org/draft-04/schema#",
  "properties": {
    "name": { "type": "string" },
    "age": { "type": "integer" }
  }
}
{{</schema>}}

{{<instance-pass `An object value that defines both declared properties and matches the corresponding schemas is valid`>}}
{ "name": "John Doe", "age": 50 }
{{</instance-pass>}}

{{<instance-pass `An object value that defines one of the declared properties and matches the corresponding schema is valid`>}}
{ "name": "John Doe" }
{{</instance-pass>}}

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
  "$schema": "http://json-schema.org/draft-04/schema#",
  "properties": {
    "forbidden": false,
    "permitted": true
  }
}
{{</schema>}}

{{<instance-pass `An object value that only defines the permitted property is valid`>}}
{ "permitted": "anything is valid" }
{{</instance-pass>}}

{{<instance-pass `An object value that defines any additional property is valid as additional properties are permitted by default`>}}
{ "foo": "bar", "baz": 2 }
{{</instance-pass>}}

{{<instance-fail `An object value that only defines the forbidden property is invalid`>}}
{ "forbidden": 1 }
{{</instance-fail>}}

{{<instance-fail `An object value that defines the forbidden property alongside other properties is invalid`>}}
{ "forbidden": 1, "permitted": 2 }
{{</instance-fail>}}
