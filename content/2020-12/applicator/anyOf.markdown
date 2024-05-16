---
keyword: "anyOf"
signature: "Array<Schema>"
value: This keyword must be set to a *non-empty* array, where each item is a valid JSON Schema
summary: "An instance validates successfully against this keyword if it validates successfully against at least one schema defined by this keyword's value."
kind: [ "applicator" ]
instance: [ "any" ]
specification: "https://json-schema.org/draft/2020-12/json-schema-core.html#section-10.2.1.2"
metaschema: "https://json-schema.org/draft/2020-12/meta/applicator"
default:
  logical_value: "[]"
tests:
  - draft2020-12/anyOf.json
index: -99999
introduced_in: draft4
related:
  - vocabulary: applicator
    keyword: allOf
  - vocabulary: applicator
    keyword: oneOf
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

The `anyOf` keyword in JSON Schema is used to specify that an instance must validate against at least one of the schemas provided in an array. It allows you to define multiple schemas, and if the data validates against any one of them, the validation passes.

## Examples

{{<schema `Schema with 'anyOf' keyword containing only one subschema`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "object",
  "anyOf": [
    {
      "properties": {
        "foo": { "type": "string" }
      },
      "required": [ "foo" ]
    }
  ]
}
{{</schema>}}

{{<instance-pass `An instance conforming to at least one subschemas of 'anyOf' is valid`>}}
{ "foo": "foo" }
{{</instance-pass>}}

{{<instance-fail `The value of 'foo' must be a string`>}}
{ "foo": [ "foo" ] }
{{</instance-fail>}}

{{<schema `Schema with 'anyOf' keyword containing multiple subschemas`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "object",
  "anyOf": [
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

{{<instance-pass `An instance conforming to at least one of the subschemas of 'anyOf' is valid`>}}
{ "foo": "foo" }
{{</instance-pass>}}

{{<instance-fail `An instance that does not conform to any of the subschemas of 'anyOf' is invalid`>}}
{ "foo": 33, "bar": "bar" }
{{</instance-fail>}}

{{<instance-pass `An instance conforming to all the subschemas of 'anyOf' is also valid`>}}
{ "foo": "foo", "bar": 33 }
{{</instance-pass>}}

{{<schema `Schema with 'anyOf' keyword containing some boolean subschemas`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "anyOf": [
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

{{<instance-pass `An instance conforming to the second subschema of 'anyOf' is valid`>}}
{ "foo": "foo" }
{{</instance-pass>}}

{{<instance-fail `An instance not conforming to the second subschema of 'anyOf' is invalid`>}}
{ "foo": false }
{{</instance-fail>}}

{{<schema `Schema with 'anyOf' keyword containing some boolean subschemas`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "anyOf": [
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

{{<instance-pass `An instance conforming to all the subschemas of 'anyOf' is valid`>}}
{ "foo": "foo" }
{{</instance-pass>}}

{{<instance-pass `An instance not conforming to the second subschema of 'anyOf' is also valid`>}}
{ "foo": true }
{{</instance-pass>}}
* _Remember, if any subschema within the `anyOf` keyword passes validation or has a boolean `true` value, the overall result of `anyOf` is considered valid._

{{<schema `Schema with nested 'anyOf'`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "anyOf": [
    {
      "anyOf": [
        { "type": "number" }
      ]
    },
    {
      "anyOf": [
        { "minimum": 18 }
      ]
    }
  ]
}
{{</schema>}}

{{<instance-pass `An instance conforming to all the subschemas including the nested 'anyOf' is valid`>}}
25
{{</instance-pass>}}

{{<instance-pass `An instance not conforming to the second subschema of top-level 'anyOf' is also valid`>}}
10
{{</instance-pass>}}
* _For the first instance above, validation passes against the first subschema within `anyOf`, thereby making the `anyOf` keyword valid, regardless of the validation result against the second subschema._

* _Similarly, for the second instance above, validation passes against the first subschema within `anyOf`. Even though the instance does not conform to the second subschema, validation does not proceed to validate against it, as it has already been successfully validated against the first subschema. Thus, the validation stops at that point, rendering the `anyOf` valid, despite the instance not conforming to the second subschema within the `anyOf`._

{{<alert `Important note on performance`>}}
* When running validation only, a JSON Schema implementation may stop validating `anyOf` when it encounters a successful one. However, when collecting annotations, it must evaluate all of them.
* The process of collecting annotations can impact runtime performance. For instance, if you collect annotations on a JSON Schema utilizing the `anyOf` applicator, the implementation is forced to evaluate the instance against every disjunction in the `anyOf` applicator. Conversely, if annotations are not collected, implementations may stop evaluation as soon as one `anyOf` subschema successfully validates against the instance.
* In the interest of runtime efficiency, we recommend collecting annotations only if your specific use case demands it.

{{</alert>}}
