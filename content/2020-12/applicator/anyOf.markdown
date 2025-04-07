---
keyword: "anyOf"
signature: "Array<Schema>"
value: This keyword must be set to a *non-empty* array, where each item is a valid JSON Schema
summary: "An instance validates successfully against this keyword if it validates successfully against at least one schema defined by this keyword's value."
kind: [ "applicator" ]
instance: [ "any" ]
specification: "https://json-schema.org/draft/2020-12/json-schema-core.html#section-10.2.1.2"
metaschema: "https://json-schema.org/draft/2020-12/meta/applicator"
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
---

The {{<link keyword="anyOf" vocabulary="applicator">}} keyword restricts
instances to validate against _at least one_ (but potentially multiple) of the
given subschemas. This keyword can be thought of as a [logical
disjunction](https://en.wikipedia.org/wiki/Logical_disjunction) (OR) operation,
as instances are valid if they satisfy the constraints of one or more
subschemas (the union of the constraints).

{{<learning-more>}}Keep in mind that when collecting annotations, the
evaluator will need to exhaustively evaluate every subschema past the first
match instead of short-circuiting validation, potentially introducing
additional computational overhead.

For example, consider 3 subschemas where the instance validates against the
first. When not collecting annotations, validation will stop after evaluating
the first subschema. However, when collecting annotations, evaluation will have
to proceed past the first subschema in case the others emit
annotations.{{</learning-more>}}

This keyword is equivalent to the `||` operator found in most programming
languages. For example:

```js
const result = A || B || C;
```

As a reference, the following boolean [truth
table](https://en.wikipedia.org/wiki/Truth_table) considers the evaluation
result of this keyword given 3 subschemas: A, B, and C.

<table class="table table-borderless border">
  <thead>
    <tr class="table-light">
      <th><code>anyOf</code></th>
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
    <tr class="table-success">
      <td class="fw-bold"><i class="bi bi-check-circle-fill me-1"></i> Valid</td>
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
    <tr class="table-success">
      <td class="fw-bold"><i class="bi bi-check-circle-fill me-1"></i> Valid</td>
      <td><i class="bi bi-check-circle"></i> Valid</td>
      <td><i class="bi bi-x-circle"></i> Invalid</td>
      <td><i class="bi bi-check-circle"></i> Valid</td>
    </tr>
    <tr class="table-success">
      <td class="fw-bold"><i class="bi bi-check-circle-fill me-1"></i> Valid</td>
      <td><i class="bi bi-check-circle"></i> Valid</td>
      <td><i class="bi bi-check-circle"></i> Valid</td>
      <td><i class="bi bi-x-circle"></i> Invalid</td>
    </tr>
    <tr class="table-success">
      <td class="fw-bold"><i class="bi bi-check-circle-fill me-1"></i> Valid</td>
      <td><i class="bi bi-check-circle"></i> Valid</td>
      <td><i class="bi bi-check-circle"></i> Valid</td>
      <td><i class="bi bi-check-circle"></i> Valid</td>
    </tr>
  </tbody>
</table>

## Examples

{{<schema `A schema that constrains instances to require at least one of the given properties`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "anyOf": [
    { "required": [ "foo" ] },
    { "required": [ "bar" ] }
  ]
}
{{</schema>}}

{{<instance-pass `A value that only matches the first subschema is valid`>}}
{ "foo": 1 }
{{</instance-pass>}}

{{<instance-pass `A value that only matches the second subschema is valid`>}}
{ "bar": 2 }
{{</instance-pass>}}

{{<instance-pass `A value that matches every subschema is valid`>}}
{ "foo": 1, "bar": 2 }
{{</instance-pass>}}

{{<instance-fail `A value that does not match any of the subschemas is invalid`>}}
{ "extra": 4 }
{{</instance-fail>}}

{{<schema `A schema that constrains instances with logical disjunctions that emit annotations`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "anyOf": [
    { "title": "Branch #1", "type": "number" },
    { "title": "Branch #2", "type": "string" },
    { "title": "Branch #3", "type": "integer" }
  ]
}
{{</schema>}}

{{<instance-pass `A value that only matches the first subschema receives the first annotation`>}}
3.14
{{</instance-pass>}}

{{<instance-annotation>}}
{ "keyword": "/anyOf/0/title", "instance": "", "value": [ "Branch #1" ] }
{{</instance-annotation>}}

{{<instance-pass `A value that matches two subschemas receives both annotations`>}}
12345
{{</instance-pass>}}

{{<instance-annotation>}}
{ "keyword": "/anyOf/0/title", "instance": "", "value": [ "Branch #1" ] }
{ "keyword": "/anyOf/2/title", "instance": "", "value": [ "Branch #3" ] }
{{</instance-annotation>}}

{{<instance-fail `A value that does not match any of the subschemas is invalid and receives no annotations`>}}
{ "foo": 1 }
{{</instance-fail>}}
