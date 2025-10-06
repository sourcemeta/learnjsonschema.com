---
keyword: "allOf"
signature: "Array<Schema>"
value: This keyword must be set to a *non-empty* array, where each item is a valid JSON Schema
summary: "An instance validates successfully against this keyword if it validates successfully against all schemas defined by this keyword's value."
kind: [ "applicator" ]
instance: [ "any" ]
specification: "https://json-schema.org/draft-07/draft-handrews-json-schema-validation-01#rfc.section.6.7.1"
metaschema: "http://json-schema.org/draft-07/schema#"
default:
  logical_value: "[]"
tests:
  - draft7/allOf.json
index: 6
introduced_in: draft4
related:
  - vocabulary: validation
    keyword: anyOf
  - vocabulary: validation
    keyword: oneOf
  - vocabulary: validation
    keyword: if
  - vocabulary: validation
    keyword: then
  - vocabulary: validation
    keyword: else
  - vocabulary: validation
    keyword: not
---

The [`allOf`]({{< ref "draft7/validation/allof" >}}) keyword restricts
instances to validate against _every_ given subschema. This keyword can be
thought of as a [logical
conjunction](https://en.wikipedia.org/wiki/Logical_conjunction) (AND)
operation, as instances are valid if they satisfy every constraint of every
subschema (the intersection of the constraints).

{{<best-practice>}}This keyword typically has a single use case: serving as an
artificial wrapper for [`$ref`]({{< ref "draft7/core/ref" >}}) keywords, to
avoid references overriding sibling keywords. If this is not the case, prefer
elevating the keywords of every subschema to the outer schema and avoid using
this keyword.  {{</best-practice>}}

This keyword is equivalent to the `&&` operator found in most programming
languages. For example:

```c
bool valid = A && B && C;
```

As a reference, the following boolean [truth
table](https://en.wikipedia.org/wiki/Truth_table) considers the evaluation
result of this keyword given 3 subschemas: A, B, and C.

<table class="table table-borderless border">
  <thead>
    <tr class="table-light">
      <th><code>allOf</code></th>
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
    <tr class="table-danger">
      <td class="fw-bold"><i class="bi bi-x-circle-fill me-1"></i> Invalid</td>
      <td><i class="bi bi-x-circle"></i> Invalid</td>
      <td><i class="bi bi-x-circle"></i> Invalid</td>
      <td><i class="bi bi-check-circle"></i> Valid</td>
    </tr>
    <tr class="table-danger">
      <td class="fw-bold"><i class="bi bi-x-circle-fill me-1"></i> Invalid</td>
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
    <tr class="table-danger">
      <td class="fw-bold"><i class="bi bi-x-circle-fill me-1"></i> Invalid</td>
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
    <tr class="table-success">
      <td class="fw-bold"><i class="bi bi-check-circle-fill me-1"></i> Valid</td>
      <td><i class="bi bi-check-circle"></i> Valid</td>
      <td><i class="bi bi-check-circle"></i> Valid</td>
      <td><i class="bi bi-check-circle"></i> Valid</td>
    </tr>
  </tbody>
</table>

## Examples

{{<schema `A schema that constrains instances with two internally referenced schemas`>}}
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "allOf": [
    { "$ref": "#/definitions/foo" },
    { "$ref": "#/definitions/bar" }
  ],
  "definitions": {
    "foo": { "type": "number" },
    "bar": { "type": "integer" }
  }
}
{{</schema>}}

{{<instance-pass `A value that matches both subschemas is valid`>}}
12345
{{</instance-pass>}}

{{<instance-fail `A value that only matches one of the subschemas is invalid`>}}
3.14
{{</instance-fail>}}

{{<instance-fail `A value that does not match any of the subschemas is invalid`>}}
"Hello World"
{{</instance-fail>}}
