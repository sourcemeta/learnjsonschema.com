---
keyword: "then"
signature: "Schema"
summary: "When `if` is present, and the instance successfully validates against its subschema, then validation succeeds against this keyword if the instance also successfully validates against this keyword's subschema."
kind: [ "applicator" ]
instance: [ "any" ]
specification: "https://json-schema.org/draft/2020-12/json-schema-core.html#section-10.2.2.2"
metaschema: "https://json-schema.org/draft/2020-12/meta/applicator"
default:
  value: "{}"
tests:
  - draft2020-12/if-then-else.json
index: -9999
introduced_in: draft7
interdependencies:
  - vocabulary: applicator
    keyword: if
related:
  - vocabulary: applicator
    keyword: else
  - vocabulary: applicator
    keyword: allOf
  - vocabulary: applicator
    keyword: anyOf
  - vocabulary: applicator
    keyword: oneOf
  - vocabulary: applicator
    keyword: not
---

The `then` keyword is used in conjunction with `if` to define a schema to be applied when a condition specified in the `if` keyword is true. It allows you to apply additional validation logic based on whether certain conditions are met.

* The value of this keyword must be a valid JSON Schema.
* This keyword has no effect when `if` is absent.
* This keyword has no effect when the instance fails validation against the `if` subschema.

## Examples

{{<schema `Schema with 'if', 'then' and 'else' keyword`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "if": {
    "properties":
      { "foo": { "const": "foo" }
    }
  },
  "then": { "required": [ "bar" ] },
  "else": { "required": [ "baz" ] }
}
{{</schema>}}

{{<instance-pass `An object instance that conforms to both the 'if' and 'then' subschemas is valid`>}}
{ "foo": "foo", "bar": "bar" }
{{</instance-pass>}}

{{<instance-fail `An object instance conforming to the 'if' subschema and not conforming to the 'then' subschema is invalid`>}}
{ "foo": "foo" }
{{</instance-fail>}}

{{<instance-pass `An object instance not conforming to the 'if' subschema but conforming to the 'else' subschema is valid`>}}
{ "foo": "not foo", "baz": "baz" }
{{</instance-pass>}}

{{<instance-fail `An object instance that does not conform to both the 'if' and 'else' subschemas is invalid`>}}
{ "foo": "not foo" }
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

{{<instance-pass `An object instance conforming to both the 'if' and 'then' subschemas is valid`>}}
{ "foo": "foo", "bar": "bar" }
{{</instance-pass>}}

{{<instance-fail `If an instance conforms to the 'if' subschema, then it must also conform to the 'then' subschema`>}}
{ "foo": "foo" }
{{</instance-fail>}}

{{<instance-pass `An object instance not conforming to the 'if' subschemas is always valid`>}}
{ "foo": "not foo", "baz": "baz" }
{{</instance-pass>}}
