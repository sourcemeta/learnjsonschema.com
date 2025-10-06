---
keyword: "readOnly"
signature: "Boolean"
value: This keyword must be set to a boolean value
summary: "This keyword indicates that the value of the instance is managed exclusively by the owning authority, and attempts by an application to modify the value of this property are expected to be ignored or rejected by that owning authority."
kind: [ "annotation" ]
instance: [ "any" ]
specification: "https://json-schema.org/draft-07/draft-handrews-json-schema-validation-01#rfc.section.10.3"
metaschema: "http://json-schema.org/draft-07/schema#"
default:
  value: false
introduced_in: draft7
index: 9997
related:
  - vocabulary: validation
    keyword: writeOnly
  - vocabulary: validation
    keyword: title
  - vocabulary: validation
    keyword: description
  - vocabulary: validation
    keyword: examples
  - vocabulary: validation
    keyword: default
---

The [`readOnly`]({{< ref "draft7/validation/readonly" >}}) keyword, when set to `true`, signifies that an instance value
(such as a specific object property) cannot be modified or removed, whatever
that means in the context of the system. For example, form generators may rely
on this keyword to mark the corresponding input as read only. This keyword provides metadata for documentation purposes and does not affect validation.

{{<best-practice>}}

Avoid setting this keyword to the default value `false`. If an instance value
is not considered to be read only, the best practice is to omit the use of this
keyword altogether.

Also avoid simultaneously setting this keyword and the [`writeOnly`]({{< ref "draft7/validation/writeonly" >}}) keyword to `true` for the same instance
location, resulting in ambiguous semantics.

{{</best-practice>}}

{{<common-pitfall>}}

Tooling makers must be careful when statically traversing schemas in search of
occurrences of this keyword. It is possible for schemas to make use of this
keyword behind conditional operators, references, or any other type of keyword
that makes it hard or even impossible to correctly locate these values in all
cases.

For example, an instance property might only be read only under certain
conditions determined by a dynamic operator like [`anyOf`]({{< ref "draft7/validation/anyof" >}}).

{{</common-pitfall>}}

## Examples

{{<schema `A schema that statically marks the id optional object property as read only`>}}
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "properties": {
    "id": { "type": "integer", "readOnly": true },
    "value": { "type": "integer" }
  }
}
{{</schema>}}

{{<instance-pass `An object value that defines the read only property is valid`>}}
{ "id": 1234, "value": 5 }
{{</instance-pass>}}

{{<instance-pass `An object value that does not define the read only property is valid`>}}
{ "value": 5 }
{{</instance-pass>}}

{{<instance-fail `An object value that does not match the schema is invalid`>}}
{ "id": 1234, "value": null }
{{</instance-fail>}}

{{<schema `A schema that dynamically marks the id optional object property as read only based on the presence of the data property`>}}
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "properties": {
    "id": { "type": "integer" },
    "value": { "type": "integer" }
  },
  "dependencies": {
    "value": {
      "properties": { "id": { "readOnly": true } }
    }
  }
}
{{</schema>}}

{{<instance-pass `An object value that defines both properties is valid`>}}
{ "id": 1234, "value": 5 }
{{</instance-pass>}}

{{<instance-pass `An object value that only defines the value property is valid`>}}
{ "value": 5 }
{{</instance-pass>}}

{{<instance-pass `An object value that only defines the id property is valid`>}}
{ "id": 1234 }
{{</instance-pass>}}

{{<instance-fail `An object value that does not match the schema is invalid`>}}
{ "value": null }
{{</instance-fail>}}
