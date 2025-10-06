---
keyword: "required"
signature: "Array<String>"
value: This keyword must be set to an array of unique strings
summary: "An object instance is valid against this keyword if every item in the array is the name of a property in the instance."
kind: [ "assertion" ]
instance: [ "object" ]
specification: "https://json-schema.org/draft/2020-12/json-schema-validation.html#section-6.5.3"
metaschema: "https://json-schema.org/draft/2020-12/meta/validation"
default:
  value: "[]"
tests:
  - draft2020-12/required.json
index: -99
introduced_in: draft3
changed_in:
  - draft4
related:
  - vocabulary: validation
    keyword: dependentRequired
  - vocabulary: validation
    keyword: maxProperties
  - vocabulary: validation
    keyword: minProperties
---

The [`required`]({{< ref "2020-12/validation/required" >}}) keyword restricts object instances to define the given set of properties.

{{<common-pitfall>}} The presence of this keyword does not depend on the
presence of the [`properties`]({{< ref "2020-12/applicator/properties" >}})
keyword. The [`required`]({{< ref "2020-12/validation/required" >}}) keyword mandates that certain properties are present
(independently of their value), while the [`properties`]({{< ref
"2020-12/applicator/properties" >}}) keyword describes the value of such
properties when present.{{</common-pitfall>}}

{{<constraint-warning `object`>}}

## Examples

{{<schema `A schema that constrains object instances to define certain properties`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "required": [ "foo", "bar", "baz" ]
}
{{</schema>}}

{{<instance-pass `An object value that defines the required properties to any values is valid`>}}
{ "foo": 1, "bar": 2, "baz": 3 }
{{</instance-pass>}}

{{<instance-pass `An object value that defines a superset of the required properties is valid`>}}
{ "foo": 1, "bar": 2, "baz": 3, "extra": true }
{{</instance-pass>}}

{{<instance-fail `An object value that only defines a subset of the required properties is invalid`>}}
{ "foo": 1, "bar": 2, "extra": true }
{{</instance-fail>}}

{{<instance-fail `An empty object is invalid`>}}
{}
{{</instance-fail>}}

{{<instance-pass `A non-object value is valid`>}}
"Hello World"
{{</instance-pass>}}

{{<schema `A schema that constrains object instances to define certain properties and to describe their value`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "required": [ "name", "age" ],
  "properties": {
    "name": { "type": "string" },
    "age": { "type": "integer" }
  }
}
{{</schema>}}

{{<instance-pass `An object value that defines the required properties and matches their definition is valid`>}}
{ "name": "John Doe", "age": 30 }
{{</instance-pass>}}

{{<instance-annotation>}}
{ "keyword": "/properties", "instance": "", "value": [ "name", "age" ] }
{{</instance-annotation>}}

{{<instance-pass `An object value that defines a superset of the required properties and matches their definition is valid`>}}
{ "name": "John Doe", "age": 30, "extra": true }
{{</instance-pass>}}

{{<instance-annotation>}}
{ "keyword": "/properties", "instance": "", "value": [ "name", "age" ] }
{{</instance-annotation>}}

{{<instance-fail `An object value that only defines a subset of the required properties and matches their definition is invalid`>}}
{ "name": "John Doe" }
{{</instance-fail>}}

{{<instance-fail `An object value that defines the required properties but does not match their definition is invalid`>}}
{ "name": 123, "age": "foo" }
{{</instance-fail>}}

{{<instance-fail `An empty object is invalid`>}}
{}
{{</instance-fail>}}

{{<instance-pass `A non-object value is valid`>}}
"Hello World"
{{</instance-pass>}}
