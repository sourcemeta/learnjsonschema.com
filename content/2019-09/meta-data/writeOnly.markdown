---
keyword: "writeOnly"
signature: "Boolean"
value: This keyword must be set to a boolean value
summary: "This keyword indicates that the value is never present when the instance is retrieved from the owning authority."
kind: [ "annotation" ]
instance: [ "any" ]
specification: "https://json-schema.org/draft/2019-09/draft-handrews-json-schema-validation-02#rfc.section.9.4"
metaschema: "https://json-schema.org/draft/2019-09/meta/meta-data"
default:
  value: false
introduced_in: draft7
annotation:
   description: The boolean value set by this keyword
   kind: [ "boolean" ]
related:
  - vocabulary: meta-data
    keyword: readOnly
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

The `writeOnly` keyword, when set to `true`, signifies that an instance value
(such as a specific object property) can be modified or removed but not read,
whatever that means in the context of the system. For example, form generators
may rely on this keyword to mark the corresponding input as as a password
field. This keyword does not affect validation, but the evaluator will collect
its value as an annotation.

{{<best-practice>}}

Avoid setting this keyword to the default value `false`. If an instance value
is not considered to be write only, the best practice is to omit the use of
this keyword altogether. This prevents unnecessarily generating and collecting
an annotation that does not carry any additional meaning.

Also avoid simultaneously setting this keyword and the [`readOnly`]({{< ref
"2019-09/meta-data/readonly" >}}) keyword to `true` for the same instance
location, resulting in ambiguous semantics.

{{</best-practice>}}

{{<common-pitfall>}}

Tooling makers must be careful when statically traversing schemas in search of
occurences of this keyword. It is possible for schemas to make use of this
keyword behind conditional operators, references, or any other type of keyword
that makes it hard or even impossible to correctly locate these values without
fully evaluating the schema against an instance. The only bullet proof method
is through annotation collection.

For example, an instance property might only be write only under certain
conditions determined by a dynamic operator like [`anyOf`]({{< ref
"2019-09/applicator/anyof" >}}).

{{</common-pitfall>}}

## Examples

{{<schema `A schema that statically marks the password optional object property as write only`>}}
{
  "$schema": "https://json-schema.org/draft/2019-09/schema",
  "properties": {
    "username": { "type": "string" }
    "password": { "type": "string", "writeOnly": true },
  }
}
{{</schema>}}

{{<instance-pass `An object value that defines the write only property is valid but an annotation is emitted`>}}
{ "username": "jviotti", "password": "mysupersecretpassword" }
{{</instance-pass>}}

{{<instance-annotation>}}
{ "keyword": "/properties/password/writeOnly", "instance": "/password", "value": true }
{{</instance-annotation>}}

{{<instance-pass `An object value that does not define the write only property is valid and no annotation is emitted`>}}
{ "username": "jviotti" }
{{</instance-pass>}}

{{<instance-fail `An object value that does not match the schema is invalid and no annotations are emitted`>}}
{ "password": null }
{{</instance-fail>}}

{{<schema `A schema that dynamically marks the password optional object property as write only based on the presence of the username property`>}}
{
  "$schema": "https://json-schema.org/draft/2019-09/schema",
  "properties": {
    "username": { "type": "string" }
    "password": { "type": "string" },
  }
  "dependentSchemas": {
    "username": {
      "properties": { "password": { "writeOnly": true } }
    }
  }
}
{{</schema>}}

{{<instance-pass `An object value that defines both properties is valid but an annotation is emitted`>}}
{ "username": "jviotti", "password": "mysupersecretpassword" }
{{</instance-pass>}}

{{<instance-annotation>}}
{ "keyword": "/dependentSchemas/username/properties/password/writeOnly", "instance": "/password", "value": true }
{{</instance-annotation>}}

{{<instance-pass `An object value that only defines the username property is valid and no annotation is emitted`>}}
{ "username": "jviotti" }
{{</instance-pass>}}

{{<instance-pass `An object value that only defines the password property is valid and no annotation is emitted`>}}
{ "password": "mysupersecretpassword" }
{{</instance-pass>}}

{{<instance-fail `An object value that does not match the schema is invalid and no annotations are emitted`>}}
{ "password": null }
{{</instance-fail>}}
