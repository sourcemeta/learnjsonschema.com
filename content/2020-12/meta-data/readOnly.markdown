---
keyword: "readOnly"
signature: "Boolean"
value: This keyword must be set to a boolean value
summary: "This keyword indicates that the value of the instance is managed exclusively by the owning authority, and attempts by an application to modify the value of this property are expected to be ignored or rejected by that owning authority."
kind: [ "annotation" ]
instance: [ "any" ]
specification: "https://json-schema.org/draft/2020-12/json-schema-validation.html#section-9.4"
metaschema: "https://json-schema.org/draft/2020-12/meta/meta-data"
default:
  value: false
introduced_in: draft7
annotation:
   description: The boolean value set by this keyword
   kind: [ "boolean" ]
related:
  - vocabulary: meta-data
    keyword: writeOnly
  - vocabulary: meta-data
    keyword: title
  - vocabulary: meta-data
    keyword: description
  - vocabulary: meta-data
    keyword: examples
  - vocabulary: meta-data
    keyword: default
  - vocabulary: meta-data
    keyword: deprecated
---

The `readOnly` keyword, when set to `true`, signifies that an instance value
(such as a specific object property) cannot be modified or removed, whatever
that means in the context of the system. For example, form generators may rely
on this keyword to mark the corresponding input as read only. This keyword does
not affect validation, but the evaluator will collect its value as an
annotation.

{{<best-practice>}}

Avoid setting this keyword to the default value `false`. If an instance value
is not considered to be read only, the best practice is to omit the use of this
keyword altogether. This prevents unnecessarily generating and collecting an
annotation that does not carry any additional meaning.

Also avoid simultaneously setting this keyword and the [`writeOnly`]({{< ref
"2020-12/meta-data/writeonly" >}}) keyword to `true` for the same instance
location, resulting in ambiguous semantics.

{{</best-practice>}}

{{<common-pitfall>}}

Tooling makers must be careful when statically traversing schemas in search of
occurences of this keyword. It is possible for schemas to make use of this
keyword behind conditional operators, references, or any other type of keyword
that makes it hard or even impossible to correctly locate these values without
fully evaluating the schema against an instance. The only bullet proof method
is through annotation collection.

For example, an instance property might only be read only under certain
conditions determined by a dynamic operator like [`anyOf`]({{< ref
"2020-12/applicator/anyof" >}}).

{{</common-pitfall>}}

{{<metaschema-check-type `boolean`>}}

## Examples

{{<schema `A schema that statically marks the id optional object property as read only`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "properties": {
    "id": { "type": "integer", "readOnly": true },
    "value": { "type": "integer" }
  }
}
{{</schema>}}

{{<instance-pass `An object value that defines the read only property is valid but an annotation is emitted`>}}
{ "id": 1234, "value": 5 }
{{</instance-pass>}}

{{<instance-annotation>}}
{ "keyword": "/properties/id/readOnly", "instance": "/id", "value": true }
{{</instance-annotation>}}

{{<instance-pass `An object value that does not define the read only property is valid and no annotation is emitted`>}}
{ "value": 5 }
{{</instance-pass>}}

{{<instance-fail `An object value that does not match the schema is invalid and no annotations are emitted`>}}
{ "id": 1234, "value": null }
{{</instance-fail>}}

{{<schema `A schema that dynamically marks the id optional object property as read only based on the presence of the data property`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "properties": {
    "id": { "type": "integer" },
    "value": { "type": "integer" }
  },
  "dependentSchemas": {
    "value": {
      "properties": { "id": { "readOnly": true } }
    }
  }
}
{{</schema>}}

{{<instance-pass `An object value that defines both properties is valid but an annotation is emitted`>}}
{ "id": 1234, "value": 5 }
{{</instance-pass>}}

{{<instance-annotation>}}
{ "keyword": "/dependentSchemas/value/properties/id/readOnly", "instance": "/id", "value": true }
{{</instance-annotation>}}

{{<instance-pass `An object value that only defines the value property is valid and no annotation is emitted`>}}
{ "value": 5 }
{{</instance-pass>}}

{{<instance-pass `An object value that only defines the id property is valid and no annotation is emitted`>}}
{ "id": 1234 }
{{</instance-pass>}}

{{<instance-fail `An object value that does not match the schema is invalid and no annotations are emitted`>}}
{ "value": null }
{{</instance-fail>}}
