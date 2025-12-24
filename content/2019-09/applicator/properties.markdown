---
keyword: "properties"
signature: "Object<String, Schema>"
value: This keyword must be set to an object where each value is a valid JSON Schema
summary: "Validation succeeds if, for each name that appears in both the instance and as a name within this keyword's value, the child instance for that name successfully validates against the corresponding schema."
kind: [ "applicator", "annotation" ]
instance: [ "object" ]
specification: "https://json-schema.org/draft/2019-09/draft-handrews-json-schema-02#rfc.section.9.3.2.1"
metaschema: "https://json-schema.org/draft/2019-09/meta/applicator"
default:
  value: "{}"
tests:
  - draft2019-09/properties.json
index: -999
introduced_in: draft1
annotation:
   description: The set of instance property names validated by this keyword's subschema
   kind: [ "array" ]
affects:
  - vocabulary: applicator
    keyword: additionalProperties
  - vocabulary: applicator
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
  - vocabulary: applicator
    keyword: unevaluatedProperties
---

The [`properties`]({{< ref "2019-09/applicator/properties" >}}) keyword
restricts properties of an object instance, when present, to match their
corresponding subschemas definitions. Information about the properties that this
keyword was evaluated for is reported using annotations.

{{<common-pitfall>}}The use of this keyword **does not prevent the presence of
other properties** in the object instance and **does not enforce the presence
of the declared properties**. In other words, additional data that is not
explicitly prohibited is permitted by default. This is intended behaviour to
ease schema evolution (open schemas are backwards compatible by default) and to
enable highly-expressive constraint-driven schemas.

If you want to restrict instances to only contain the properties you declared,
you must set the [`additionalProperties`]({{< ref
"2019-09/applicator/additionalproperties" >}}) keyword to the boolean schema
`false`, and if you want to enforce the presence of certain properties, you
must use the [`required`]({{< ref "2019-09/validation/required" >}}) keyword
accordingly.  {{</common-pitfall>}}

{{<learning-more>}}Setting properties defined by this keyword to the boolean
schema `false` is an common trick to express that such properties are
forbidden. This is considered more elegant (and usually more performant) than
using the [`not`]({{< ref "2019-09/applicator/not" >}}) applicator to negate
the [`required`]({{< ref "2019-09/validation/required" >}}) keyword. However,
setting properties defined by this keyword to the boolean `true` is considered
to be redundant and an anti-pattern, as additional properties are permitted by
default.  {{</learning-more>}}

{{<common-pitfall>}} This keyword is evaluated independently of the
[`patternProperties`]({{< ref "2019-09/applicator/patternproperties" >}})
keyword. If an object property is described by both keywords, then both schemas
must successfully validate against the given property for validation to
succeed.  {{</common-pitfall>}}

{{<best-practice>}} While JSON Schema allows property names to contain any
characters (including spaces, special characters, and even empty strings),
consider restricting property names to match the regular expression
`[A-Za-z_][A-Za-z0-9_]*`, as suggested by the [JSON Structure
specification](https://json-structure.github.io/core/draft-vasters-json-structure-core.html#section-3.6).
This makes it easier to convert your schemas into programming language type
definitions (such as classes or structs), database schemas (such as SQL
tables), and other systems that have stricter naming requirements.
{{</best-practice>}}

{{<constraint-warning `object`>}}

## Examples

{{<schema `A schema that constrains object instances to a string and integer property`>}}
{
  "$schema": "https://json-schema.org/draft/2019-09/schema",
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
  "$schema": "https://json-schema.org/draft/2019-09/schema",
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
