---
keyword: "allOf"
signature: "Array<Schema>"
value: This keyword must be set to a *non-empty* array, where each item is a valid JSON Schema
summary: "An instance validates successfully against this keyword if it validates successfully against all schemas defined by this keyword's value."
kind: [ "applicator" ]
instance: [ "any" ]
specification: "https://json-schema.org/draft/2020-12/json-schema-core.html#section-10.2.1.1"
metaschema: "https://json-schema.org/draft/2020-12/meta/applicator"
default:
  logical_value: "[]"
tests:
  - draft2020-12/allOf.json
index: -99999
introduced_in: draft4
related:
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
  - vocabulary: applicator
    keyword: not
---

The {{<link keyword="allOf" vocabulary="applicator">}} keyword restricts
instances to validate against _every_ given subschema. This keyword can be
thought of as a [logical
conjunction](https://en.wikipedia.org/wiki/Logical_conjunction) (AND)
operation, as instances are valid if they satisfy every constraint of every
subschema (the intersection of the operands).

{{<common-pitfall>}} Wrapping a single instance of the [`$ref`](../../core/ref)
or [`$dynamicRef`](../../core/dynamicref) keyword in an `allOf` operator is an
anti-pattern.

This practice has historical roots. In JSON Schema [Draft 7](/draft7) and
earlier versions, any subschema declaring the `$ref` keyword was considered to
be a _reference object_ and any other sibling keyword was silently ignored. As
a consequence, subschemas with references that made use of other keywords had
to artificially wrap the reference into its own subschema.
{{</common-pitfall>}}

{{<best-practice>}}This keyword typically has a single use case: _combining
multiple schemas through the use of (internal or external) references_. If this
is not the case, prefer elevating the keywords of every subschema to the outer
schema and avoid using this keyword.  {{</best-practice>}}

## Examples

{{<schema `Schema with 'allOf' keyword containing only one subschema`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "object",
  "allOf": [
    {
      "properties": {
        "foo": { "type": "string" }
      },
      "required": [ "foo" ]
    }
  ]
}
{{</schema>}}

{{<instance-pass `An instance conforming to all the subschemas of 'allOf' is valid`>}}
{ "foo": "foo" }
{{</instance-pass>}}

{{<instance-fail `The value of 'foo' must be a string`>}}
{ "foo": [ "foo" ] }
{{</instance-fail>}}

{{<schema `Schema with 'allOf' keyword containing multiple subschemas`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "object",
  "allOf": [
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

{{<instance-pass `An instance conforming to all the subschemas of 'allOf' is valid`>}}
{ "foo": "foo", "bar": 33 }
{{</instance-pass>}}

{{<instance-fail `An instance that does not conform to both subschemas within 'allOf' is invalid`>}}
{ "foo": "foo" }
{{</instance-fail>}}

{{<schema `Schema with 'allOf' keyword containing some boolean subschemas`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "allOf": [
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

{{<instance-pass `An instance conforming to all the subschemas of 'allOf' is valid`>}}
{ "foo": "foo" }
{{</instance-pass>}}

{{<instance-fail `The value of 'foo' must be a string`>}}
{ "foo": true }
{{</instance-fail>}}

{{<schema `Schema with 'allOf' keyword containing some boolean subschemas`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "allOf": [
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

{{<instance-fail `An instance not conforming to the second subschema of 'allOf' is invalid`>}}
{ "foo": false }
{{</instance-fail>}}

{{<instance-fail `An instance conforming to the second subschema of 'allOf' is also invalid`>}}
{ "foo": "foo" }
{{</instance-fail>}}
* _Remember, if any subschema within the {{<link keyword="allOf" vocabulary="applicator">}} keyword fails validation or has a boolean `false` value, the entire validation will always fail._

{{<schema `Schema with nested 'allOf'`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "allOf": [
    {
      "allOf": [
        { "type": "number" }
      ]
    },
    {
      "allOf": [
        { "minimum": 18 }
      ]
    }
  ]
}
{{</schema>}}

{{<instance-pass `An instance conforming to all the subschemas including the nested 'allOf' is valid`>}}
25
{{</instance-pass>}}

{{<instance-fail `The validation fails due to the 2nd subschema of the top-level 'allOf'`>}}
10
{{</instance-fail>}}
