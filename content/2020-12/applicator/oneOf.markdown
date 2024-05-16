---
keyword: "oneOf"
signature: "Array<Schema>"
value: This keyword must be set to a *non-empty* array, where each item is a valid JSON Schema
summary: "An instance validates successfully against this keyword if it validates successfully against exactly one schema defined by this keyword's value."
kind: [ "applicator" ]
instance: [ "any" ]
specification: "https://json-schema.org/draft/2020-12/json-schema-core.html#section-10.2.1.3"
metaschema: "https://json-schema.org/draft/2020-12/meta/applicator"
default:
  logical_value: "[]"
tests:
  - draft2020-12/oneOf.json
index: -99999
introduced_in: draft4
related:
  - vocabulary: applicator
    keyword: allOf
  - vocabulary: applicator
    keyword: anyOf
  - vocabulary: applicator
    keyword: if
  - vocabulary: applicator
    keyword: then
  - vocabulary: applicator
    keyword: else
  - vocabulary: applicator
    keyword: not
target_version: "mvp"
---

The `oneOf` keyword allows you to specify that exactly one of the provided subschemas must validate successfully against a given instance. It ensures that the instance validates against one and only one of the defined subschemas within the `oneOf` array. This behavior is akin to a logical "XOR" (exclusive OR) operation, where only one condition needs to be met for validation to pass.

## Examples

{{<schema `Schema with 'oneOf' keyword containing only one subschema`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "object",
  "oneOf": [
    {
      "properties": {
        "foo": { "type": "string" }
      },
      "required": [ "foo" ]
    }
  ]
}
{{</schema>}}

{{<instance-pass `An instance conforming to only one subschema of 'oneOf' is valid`>}}
{ "foo": "foo" }
{{</instance-pass>}}

{{<instance-fail `The value of 'foo' must be a string`>}}
{ "foo": [ "foo" ] }
{{</instance-fail>}}

{{<schema `Schema with 'oneOf' keyword containing multiple subschemas`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "object",
  "oneOf": [
    {
      "properties": {
        "foo": { "type": "string" }
      },
      "required": [ "foo" ]
    },
    {
      "properties": {
        "bar": { "type": "number" }
      },
      "required": [ "bar" ]
    }
  ]
}
{{</schema>}}

{{<instance-pass `An instance conforming to only one of the subschemas of 'oneOf' is valid`>}}
{ "foo": "foo" }
{{</instance-pass>}}

{{<instance-fail `An instance that does not conform to any of the subschemas of 'oneOf' is invalid`>}}
{ "foo": 33, "bar": "bar" }
{{</instance-fail>}}

{{<instance-fail `An instance conforming to all the subschemas of 'oneOf' is also invalid`>}}
{ "foo": "foo", "bar": 33 }
{{</instance-fail>}}

{{<schema `Schema with 'oneOf' keyword containing some boolean subschemas`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "oneOf": [
    false,
    {
      "properties": {
        "foo": { "type": "string" }
      },
      "required": [ "foo" ]
    }
  ]
}
{{</schema>}}

{{<instance-pass `An instance conforming to the second subschema of 'oneOf' is valid`>}}
{ "foo": "foo" }
{{</instance-pass>}}

{{<instance-fail `An instance not conforming to the second subschema of 'oneOf' is invalid`>}}
{ "foo": false }
{{</instance-fail>}}

{{<schema `Schema with 'oneOf' keyword containing some boolean subschemas`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "oneOf": [
    true,
    {
      "properties": {
        "foo": { "type": "string" }
      },
      "required": [ "foo" ]
    }
  ]
}
{{</schema>}}

{{<instance-fail `An instance conforming to the second subschema of 'oneOf' is invalid`>}}
{ "foo": "foo" }
{{</instance-fail>}}

{{<instance-pass `An instance not conforming to the second subschema of 'oneOf' is valid`>}}
{ "foo": true }
{{</instance-pass>}}
* _Remember, if any subschema within the `oneOf` keyword passes validation or has a boolean `true` value, the all the other subschemas within `oneOf` must fail the validation for the overall validation of the `oneOf` keyword to be true._

{{<schema `Schema with nested 'oneOf'`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "oneOf": [
    {
      "oneOf": [
        { "type": "number" }
      ]
    },
    {
      "oneOf": [
        { "type": "string" }
      ]
    }
  ]
}
{{</schema>}}

{{<instance-pass `An instance conforming to only the first subschema within 'oneOf' is valid`>}}
25
{{</instance-pass>}}

{{<instance-pass `An instance conforming to only the second subschema within 'oneOf' is valid`>}}
"25"
{{</instance-pass>}}

{{<instance-fail `An instance not conforming to any of the subschemas within 'oneOf' is invalid`>}}
[ "25" ]
{{</instance-fail>}}
