---
keyword: "oneOf"
signature: "Array<Schema>"
value: This keyword must be set to a *non-empty* array, where each item is a valid JSON Schema
summary: "An instance validates successfully against this keyword if it validates successfully against exactly one schema defined by this keyword's value."
kind: [ "applicator" ]
instance: [ "any" ]
specification: "https://json-schema.org/draft/2020-12/json-schema-core.html#section-10.2.1.3"
metaschema: "https://json-schema.org/draft/2020-12/meta/applicator"
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
---

The {{<link keyword="oneOf" vocabulary="applicator">}} keyword restricts
instances to validate against _exactly one_ (and only one) of the given
subschemas and fail on the rest. This keyword can be thought of as a [logical
exclusive disjunction](https://en.wikipedia.org/wiki/Exclusive_or) (XOR)
operation. In practice, the vast majority of schemas don't require exclusive
disjunction semantics but a simple disjunction. If you are not sure, the
{{<link keyword="anyOf" vocabulary="applicator">}} keyword is probably a better
fit.

{{<common-pitfall>}}

Avoid this keyword unless you absolutely need exclusive disjunction
semantics, which is rarely the case.
As its name implies, this keyword enforces the instance to
be valid against **only one of its subschemas**. Therefore, a JSON Schema
implementation will exhaustively evaluate every subschema to make sure the rest
fails, potentially introducing unnecessary computational overhead.

{{</common-pitfall>}}

This keyword is equivalent to the following complex boolean construct that
combines the `||`, `&&`, and `!` operators found in most programming languages:

```js
const result = (A && !B && !C) || (!A && B && !C) || (!A && !B && C);
```

As a reference, the following boolean [truth
table](https://en.wikipedia.org/wiki/Truth_table) considers the evaluation
result of this keyword given 3 subschemas: A, B, and C.

<table class="table table-borderless border">
  <thead>
    <tr class="table-light">
      <th><code>oneOf</code></th>
      <th>Subschema A</th>
      <th>Subschema B</th>
      <th>Subschema C</th>
    </tr>
  </thead>
  <tbody>
    <tr class="table-danger">
      <td class="fw-bold"><i class="bi bi-x-circle-fill me-1"></i> Invalid</td>
      <td><i class="bi bi-x-circle"></i> Invalid</td>
      <td><i class="bi bi-x-circle"></i> Invalid</td>
      <td><i class="bi bi-x-circle"></i> Invalid</td>
    </tr>
    <tr class="table-success">
      <td class="fw-bold"><i class="bi bi-check-circle-fill me-1"></i> Valid</td>
      <td><i class="bi bi-x-circle"></i> Invalid</td>
      <td><i class="bi bi-x-circle"></i> Invalid</td>
      <td><i class="bi bi-check-circle"></i> Valid</td>
    </tr>
    <tr class="table-success">
      <td class="fw-bold"><i class="bi bi-check-circle-fill me-1"></i> Valid</td>
      <td><i class="bi bi-x-circle"></i> Invalid</td>
      <td><i class="bi bi-check-circle"></i> Valid</td>
      <td><i class="bi bi-x-circle"></i> Invalid</td>
    </tr>
    <tr class="table-danger">
      <td class="fw-bold"><i class="bi bi-x-circle-fill me-1"></i> Invalid</td>
      <td><i class="bi bi-x-circle"></i> Invalid</td>
      <td><i class="bi bi-check-circle"></i> Valid</td>
      <td><i class="bi bi-check-circle"></i> Valid</td>
    </tr>
    <tr class="table-success">
      <td class="fw-bold"><i class="bi bi-check-circle-fill me-1"></i> Valid</td>
      <td><i class="bi bi-check-circle"></i> Valid</td>
      <td><i class="bi bi-x-circle"></i> Invalid</td>
      <td><i class="bi bi-x-circle"></i> Invalid</td>
    </tr>
    <tr class="table-danger">
      <td class="fw-bold"><i class="bi bi-x-circle-fill me-1"></i> Invalid</td>
      <td><i class="bi bi-check-circle"></i> Valid</td>
      <td><i class="bi bi-x-circle"></i> Invalid</td>
      <td><i class="bi bi-check-circle"></i> Valid</td>
    </tr>
    <tr class="table-danger">
      <td class="fw-bold"><i class="bi bi-x-circle-fill me-1"></i> Invalid</td>
      <td><i class="bi bi-check-circle"></i> Valid</td>
      <td><i class="bi bi-check-circle"></i> Valid</td>
      <td><i class="bi bi-x-circle"></i> Invalid</td>
    </tr>
    <tr class="table-danger">
      <td class="fw-bold"><i class="bi bi-x-circle-fill me-1"></i> Invalid</td>
      <td><i class="bi bi-check-circle"></i> Valid</td>
      <td><i class="bi bi-check-circle"></i> Valid</td>
      <td><i class="bi bi-check-circle"></i> Valid</td>
    </tr>
  </tbody>
</table>

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
* _Remember, if any subschema within the `oneOf` keyword passes validation or has a boolean `true` value, all the other subschemas within `oneOf` must fail the validation for the overall validation of the `oneOf` keyword to be true._

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
