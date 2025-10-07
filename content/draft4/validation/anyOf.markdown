---
keyword: "anyOf"
signature: "Array<Schema>"
value: This keyword must be set to a *non-empty* array, where each item is a valid JSON Schema
summary: "An instance validates successfully against this keyword if it validates successfully against at least one schema defined by this keyword's value."
kind: [ "applicator" ]
instance: [ "any" ]
specification: "https://json-schema.org/draft-04/draft-fge-json-schema-validation-00#rfc.section.5.5.4"
metaschema: "http://json-schema.org/draft-04/schema#"
tests:
  - draft4/anyOf.json
index: 7
introduced_in: draft4
related:
  - vocabulary: validation
    keyword: allOf
  - vocabulary: validation
    keyword: oneOf
  - vocabulary: validation
    keyword: not
---

The [`anyOf`]({{< ref "draft4/validation/anyof" >}}) keyword restricts
instances to validate against _at least one_ (but potentially multiple) of the
given subschemas. This keyword represents a [logical
disjunction](https://en.wikipedia.org/wiki/Logical_disjunction) (OR)
operation, as instances are valid if they satisfy the constraints of one or
more subschemas (the union of the constraints).


This keyword is equivalent to the `||` operator found in most programming
languages. For example:

```c
bool valid = A || B || C;
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

{{<schema `A schema that constrains object instances to require at least one of the given properties`>}}
{
  "$schema": "http://json-schema.org/draft-04/schema#",
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
