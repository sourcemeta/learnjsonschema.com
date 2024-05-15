---
keyword: "if"
signature: "Schema"
summary: "This keyword declares a condition based on the validation result of the given schema."
kind: [ "applicator" ]
instance: [ "any" ]
specification: "https://json-schema.org/draft/2020-12/json-schema-core.html#section-10.2.2.1"
metaschema: "https://json-schema.org/draft/2020-12/meta/applicator"
tests:
  - draft2020-12/if-then-else.json
index: -9999
introduced_in: draft7
affects:
  - vocabulary: applicator
    keyword: then
  - vocabulary: applicator
    keyword: else
related:
  - vocabulary: applicator
    keyword: allOf
  - vocabulary: applicator
    keyword: anyOf
  - vocabulary: applicator
    keyword: oneOf
  - vocabulary: applicator
    keyword: not
---

The `if` keyword is used to conditionally apply a subschema based on whether a certain condition is met. It allows you to define different validation rules depending on whether an instance satisfies a condition or not. The validation outcome of this keyword's subschema has no direct effect on the overall validation result. Rather, it controls which of the `then` or `else` keywords are evaluated.

* The value of this keyword must be a valid JSON Schema.
* If an instance passes the validation against the `if` subschema, then it must also be validated against the `then` subschema, if present.
* If an instance fails the validation against the `if` subschema, then it must also be validated against the `else` subschema, if present.
* This keyword is meaningless without `then` and `else`.
* The annotations are collected from this keyword's subschema in the usual way, irrespective of whether `then` and `else` are present or not.

## Examples

{{<schema `Schema with 'if', 'then' and 'else' keyword`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "object",
  "properties": {
    "role": { "enum": [ "HOD", "professor" ] },
    "HOD_Id": { "type": "integer" },
    "professor_Id": { "type": "integer" }
  },
  "if": {
    "properties":
      { "role": { "const": "HOD" }
    }
  },
  "then": { "required": [ "HOD_Id" ] },
  "else": { "required": [ "professor_Id" ] }
}
{{</schema>}}

{{<instance-pass `An instance adhering to the schema is valid`>}}
{ "name": "John Doe", "role": "HOD", "HOD_Id": 2844 }
{{</instance-pass>}}

{{<instance-fail `'professor_Id' is required when the value of role is 'professor'`>}}
{ "role": "professor" }
{{</instance-fail>}}

{{<instance-pass `Any object instance without the 'role' property is valid`>}}
{ "professor_Id": 2899, "HOD_Id": 2844 }
{{</instance-pass>}}

{{<instance-fail `the value of 'HOD_Id' must be a string`>}}
{ "name": "John Doe", "role": "HOD", "HOD_Id": "2844" }
{{</instance-fail>}}

{{<schema `Schema with 'if' and 'then' without 'else'`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "if": {
    "properties":
      { "foo": { "const": "foo" }
    }
  },
  "then": { "required": [ "bar" ] }
}
{{</schema>}}

{{<instance-pass `An object instance conforming to the 'if' and 'then' subschemas is valid`>}}
{ "foo": "foo", "bar": "bar" }
{{</instance-pass>}}

{{<instance-fail `If an instance conforms to the 'if' subschema, then it must also conform to the 'then' subschema`>}}
{ "foo": "foo" }
{{</instance-fail>}}

{{<instance-pass `An object instance not conforming to the 'if' subschemas is always valid`>}}
{ "foo": "not foo", "baz": "baz" }
{{</instance-pass>}}

{{<schema `Schema with 'if' and 'else' without 'then'`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "if": {
    "properties":
      { "foo": { "const": "foo" }
    }
  },
  "else": { "required": [ "baz" ] }
}
{{</schema>}}

{{<instance-pass `An object instance that does not conform to the 'if' subschema but conforms to the 'else' subschemas is valid`>}}
{ "foo": "not foo", "baz": "baz" }
{{</instance-pass>}}

{{<instance-fail `If an instance does not conform to the 'if' subschema, then it must conform to the 'else' subschema`>}}
{ "foo": "not foo" }
{{</instance-fail>}}

{{<instance-pass `An object instance conforming to the 'if' subschemas is always valid`>}}
{ "foo": "foo", "baz": "baz" }
{{</instance-pass>}}
- _**Note:** If an instance passes the `if` subschema and the `then` subschema is not present, then the `then` subschema behaves as a boolean __true__ schema. Similarly, if an instance fails the `if` subschema and the `else` subschema is not present, then the `else` subschema behaves as a boolean __true__ schema._

{{<schema `Schema with 'if' without 'then' and 'else'`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "if": {
    "properties": {
      "foo": {
        "title": "This is foo!",
        "const": "foo"
      }
    }
  }
}
{{</schema>}}

{{<instance-pass>}}
{ "foo": "foo" }
{{</instance-pass>}}

{{<instance-annotation>}}
[
  // ...
  {
    "valid": true,
    "keywordLocation": "/if/properties",
    "instanceLocation": "",
    "annotation": [ "foo" ]
  },
  {
    "valid": true,
    "keywordLocation": "/if/properties/foo/title",
    "instanceLocation": "",
    "annotation": "This is foo!"
  },
  // ...
]
{{</instance-annotation>}}
* _Here, the annotations are collected from `if`’s subschema in the usual way, irrespective of whether `then` and `else` are present or not._
