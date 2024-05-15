---
keyword: "not"
signature: "Schema"
summary: "An instance is valid against this keyword if it fails to validate successfully against the schema defined by this keyword."
kind: [ "applicator" ]
instance: [ "any" ]
specification: "https://json-schema.org/draft/2020-12/json-schema-core.html#section-10.2.1.4"
metaschema: "https://json-schema.org/draft/2020-12/meta/applicator"
default:
  value: "false"
tests:
  - draft2020-12/not.json
index: -9997
introduced_in: draft4
related:
  - vocabulary: applicator
    keyword: allOf
  - vocabulary: applicator
    keyword: anyOf
  - vocabulary: applicator
    keyword: oneOf
  - vocabulary: applicator
    keyword: if
  - vocabulary: applicator
    keyword: then
  - vocabulary: applicator
    keyword: else
---

The `not` keyword is used to declare that an instance only validates if it doesn't validate against the given subschema. It is essentially a way to define a rule that an instance should not match.

* The value of this keyword must be a valid JSON Schema.
* The boolean `false` schema, can be thought as an alias to `{ not: {} }`.

Annotations are dropped when an instance fails. Therefore, in the case of `not`, annotations are always dropped because:

1. If the subschema of `not` passes (producing annotations), then not itself fails, resulting in the annotations being dropped.
2. If the subschema of `not` fails, no annotations are produced, and there is nothing for not to pass on.

## Examples

{{<schema `Schema with 'not' keyword`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "not": {
    "type": "string"
  }
}
{{</schema>}}

{{<instance-pass `An instance with values other than string is valid`>}}
77
{{</instance-pass>}}

{{<instance-fail `An instance with a string value is invalid`>}}
"foo"
{{</instance-fail>}}

{{<schema `Schema with 'not' set to false`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "not": false
}
{{</schema>}}

{{<instance-pass `Any instance is valid against the above schema`>}}
{ "foo": "bar" }
{{</instance-pass>}}
* _Since the boolean `false` schema is equivalent to `{ "not": {} }`, the overall schema translates to `{ "not": { "not": {} } }`, which is equivalent to an empty object schema (`{}`). Therefore, every instance passes against the above schema._
