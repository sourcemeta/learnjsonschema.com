---
keyword: "required"
signature: "Array<String>"
value: This keyword must be set to an array of unique strings
summary: "An object instance is valid against this keyword if every item in the array is the name of a property in the instance."
kind: [ "assertion" ]
instance: [ "object" ]
specification: "https://json-schema.org/draft-06/draft-wright-json-schema-validation-01#rfc.section.6.17"
metaschema: "http://json-schema.org/draft-06/schema#"
default:
  value: "[]"
tests:
  - draft6/required.json
introduced_in: draft3
index: -7
changed_in:
  - draft4
related:
  - vocabulary: validation
    keyword: dependencies
  - vocabulary: validation
    keyword: maxProperties
  - vocabulary: validation
    keyword: minProperties
---


The [`required`]({{< ref "draft6/validation/required" >}}) keyword restricts
object instances to define the given set of properties.

{{<common-pitfall>}} The presence of this keyword does not depend on the
presence of the [`properties`]({{< ref "draft6/validation/properties" >}})
keyword. The [`required`]({{< ref "draft6/validation/required" >}}) keyword
mandates that certain properties are present (independently of their value),
while the [`properties`]({{< ref "draft6/validation/properties" >}}) keyword
describes the value of such properties when present.{{</common-pitfall>}}

{{<constraint-warning `object`>}}

## Examples

{{<schema `A schema that constrains object instances to define certain properties`>}}
{
  "$schema": "http://json-schema.org/draft-06/schema#",
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
  "$schema": "http://json-schema.org/draft-06/schema#",
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

{{<instance-pass `An object value that defines a superset of the required properties and matches their definition is valid`>}}
{ "name": "John Doe", "age": 30, "extra": true }
{{</instance-pass>}}

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
