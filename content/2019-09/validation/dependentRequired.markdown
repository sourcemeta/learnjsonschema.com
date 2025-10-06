---
keyword: "dependentRequired"
signature: "Object<String, Array<String>>"
value: This keyword must be set to an object where each value is an array of unique strings
summary: "Validation succeeds if, for each name that appears in both the instance and as a name within this keyword's value, every item in the corresponding array is also the name of a property in the instance."
kind: [ "assertion" ]
instance: [ "object" ]
specification: "https://json-schema.org/draft/2019-09/draft-handrews-json-schema-validation-02#rfc.section.6.5.4"
metaschema: "https://json-schema.org/draft/2019-09/meta/validation"
default:
  value: "{}"
tests:
  - draft2019-09/dependentRequired.json
index: -99
introduced_in: 2019-09
related:
  - vocabulary: validation
    keyword: required
  - vocabulary: applicator
    keyword: dependentSchemas
  - vocabulary: applicator
    keyword: if
  - vocabulary: applicator
    keyword: then
  - vocabulary: applicator
    keyword: else
---

The `dependentRequired` keyword restricts object instances to define certain
properties if other properties are also defined.

{{<common-pitfall>}} Note that multiple potentially interrelated dependencies
can be declared at once, in which case every dependency must be transitively
fulfilled for the object instance to be valid. For example, if a schema marks
the property `B` as required if the property `A` is present and also marks
the property `C` as required if the property `B` is present, defining the
property `A` transitively requires _both_ the `B` and `C` properties to be
present in the object instance.  {{</common-pitfall>}}

{{<learning-more>}}The [`dependentSchemas`]({{< ref
"2019-09/applicator/dependentschemas" >}}) keyword is a generalisation of this
keyword to describe object dependencies beyond property
requirement.{{</learning-more>}}

{{<constraint-warning `object`>}}

## Examples

{{<schema `A schema that constrains object instances with a single property dependency`>}}
{
  "$schema": "https://json-schema.org/draft/2019-09/schema",
  "dependentRequired": {
    "foo": [ "bar", "baz" ]
  }
}
{{</schema>}}

{{<instance-pass `An object value that defines the dependency and all of the dependents is valid`>}}
{ "foo": 1, "bar": 2, "baz": 3 }
{{</instance-pass>}}

{{<instance-fail `An object value that defines the dependency and some of the dependents is invalid`>}}
{ "foo": 1, "bar": 2 }
{{</instance-fail>}}

{{<instance-fail `An object value that defines the dependency and none of the dependents is invalid`>}}
{ "foo": 1 }
{{</instance-fail>}}

{{<instance-pass `An object value that does not define the dependency is valid`>}}
{ "qux": 4 }
{{</instance-pass>}}

{{<instance-pass `An empty object value is valid as no dependencies apply`>}}
{}
{{</instance-pass>}}

{{<instance-pass `A non-object value is valid`>}}
"Hello World"
{{</instance-pass>}}

{{<schema `A schema that constrains object instances with a transitive property dependencies`>}}
{
  "$schema": "https://json-schema.org/draft/2019-09/schema",
  "dependentRequired": {
    "foo": [ "bar" ],
    "bar": [ "baz" ]
  }
}
{{</schema>}}

{{<instance-pass `An object value that satisfies the transitive dependency is valid`>}}
{ "foo": 1, "bar": 2, "baz": 3 }
{{</instance-pass>}}

{{<instance-fail `An object value that only satisfies the first part of the transitive dependency is invalid`>}}
{ "foo": 1, "bar": 2 }
{{</instance-fail>}}

{{<instance-pass `An object value that only satisfies the second part of the transitive dependency is valid`>}}
{ "bar": 2, "baz": 3 }
{{</instance-pass>}}

{{<instance-pass `An empty object value is valid as no dependencies apply`>}}
{}
{{</instance-pass>}}

{{<instance-pass `A non-object value is valid`>}}
"Hello World"
{{</instance-pass>}}
