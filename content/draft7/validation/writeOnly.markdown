---
keyword: "writeOnly"
signature: "Boolean"
value: This keyword must be set to a boolean value
summary: "This keyword indicates that the value is never present when the instance is retrieved from the owning authority."
kind: [ "annotation" ]
instance: [ "any" ]
specification: "https://json-schema.org/draft-07/draft-handrews-json-schema-validation-01#rfc.section.10.3"
metaschema: "http://json-schema.org/draft-07/schema#"
default:
  value: false
introduced_in: draft7
index: 9998
related:
  - vocabulary: validation
    keyword: readOnly
  - vocabulary: validation
    keyword: title
  - vocabulary: validation
    keyword: description
  - vocabulary: validation
    keyword: examples
  - vocabulary: validation
    keyword: default
---

The [`writeOnly`]({{< ref "draft7/validation/writeonly" >}}) keyword, when set
to `true`, signifies that an instance value (such as a specific object
property) can be modified or removed but not read, whatever that means in the
context of the system. For example, form generators may rely on this keyword to
mark the corresponding input as as a password field. This keyword provides
metadata for documentation purposes and does not affect validation.

{{<best-practice>}}

Avoid setting this keyword to the default value `false`. If an instance value
is not considered to be write only, the best practice is to omit the use of
this keyword altogether.

Also avoid simultaneously setting this keyword and the [`readOnly`]({{< ref "draft7/validation/readonly" >}}) keyword to `true` for the same instance
location, resulting in ambiguous semantics.

{{</best-practice>}}

{{<common-pitfall>}}

Tooling makers must be careful when statically traversing schemas in search of
occurrences of this keyword. It is possible for schemas to make use of this
keyword behind conditional operators, references, or any other type of keyword
that makes it hard or even impossible to correctly locate these values in all
cases.

For example, an instance property might only be write only under certain
conditions determined by a dynamic operator like [`anyOf`]({{< ref
"draft7/validation/anyof" >}}).

{{</common-pitfall>}}

## Examples

{{<schema `A schema that statically marks the password optional object property as write only`>}}
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "properties": {
    "username": { "type": "string" },
    "password": { "type": "string", "writeOnly": true }
  }
}
{{</schema>}}

{{<instance-pass `An object value that defines the write only property is valid`>}}
{ "username": "jviotti", "password": "mysupersecretpassword" }
{{</instance-pass>}}

{{<instance-pass `An object value that does not define the write only property is valid`>}}
{ "username": "jviotti" }
{{</instance-pass>}}

{{<instance-fail `An object value that does not match the schema is invalid`>}}
{ "password": null }
{{</instance-fail>}}

{{<schema `A schema that dynamically marks the password optional object property as write only based on the presence of the username property`>}}
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "properties": {
    "username": { "type": "string" },
    "password": { "type": "string" }
  },
  "dependencies": {
    "username": {
      "properties": { "password": { "writeOnly": true } }
    }
  }
}
{{</schema>}}

{{<instance-pass `An object value that defines both properties is valid`>}}
{ "username": "jviotti", "password": "mysupersecretpassword" }
{{</instance-pass>}}

{{<instance-pass `An object value that only defines the username property is valid`>}}
{ "username": "jviotti" }
{{</instance-pass>}}

{{<instance-pass `An object value that only defines the password property is valid`>}}
{ "password": "mysupersecretpassword" }
{{</instance-pass>}}

{{<instance-fail `An object value that does not match the schema is invalid`>}}
{ "password": null }
{{</instance-fail>}}
