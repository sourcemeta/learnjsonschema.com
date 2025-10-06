---
keyword: "oneOf"
signature: "Array<Schema>"
value: This keyword must be set to a *non-empty* array, where each item is a valid JSON Schema
summary: "An instance validates successfully against this keyword if it validates successfully against exactly one schema defined by this keyword's value."
kind: [ "applicator" ]
instance: [ "any" ]
specification: "https://json-schema.org/draft-07/draft-handrews-json-schema-validation-01#rfc.section.6.7.3"
metaschema: "http://json-schema.org/draft-07/schema#"
tests:
  - draft7/oneOf.json
index: 8
introduced_in: draft4
related:
  - vocabulary: validation
    keyword: allOf
  - vocabulary: validation
    keyword: anyOf
  - vocabulary: validation
    keyword: if
  - vocabulary: validation
    keyword: then
  - vocabulary: validation
    keyword: else
  - vocabulary: validation
    keyword: not
---

The [`oneOf`]({{< ref "draft7/validation/oneof" >}}) keyword restricts
instances to validate against _exactly one_ (and only one) of the given
subschemas and fail on the rest. This keyword represents a [logical exclusive
disjunction](https://en.wikipedia.org/wiki/Exclusive_or) (XOR) operation.  In
practice, the vast majority of schemas don't require exclusive disjunction
semantics but a simple disjunction. If you are not sure, the [`anyOf`]({{< ref
"draft7/validation/anyof" >}}) keyword is probably a better fit.

{{<common-pitfall>}}

Avoid this keyword unless you absolutely need exclusive disjunction
semantics, which is rarely the case. As its name implies, this keyword
enforces the instance to be valid against **only one of its subschemas**.
Therefore, a JSON Schema implementation will exhaustively evaluate every
subschema to make sure the rest fails, potentially introducing unnecessary
computational overhead.

{{</common-pitfall>}}

This keyword is equivalent to the following complex boolean construct that
combines the `||`, `&&`, and `!` operators found in most programming
languages:

```c
bool valid = (A && !B && !C) || (!A && B && !C) || (!A && !B && C);
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

{{<schema `A schema that constrains object instances to require only one of the given properties`>}}
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "oneOf": [
    { "required": [ "foo" ] },
    { "required": [ "bar" ] },
    { "required": [ "baz" ] }
  ]
}
{{</schema>}}

{{<instance-pass `A value that only matches the first subschema is valid`>}}
{ "foo": 1 }
{{</instance-pass>}}

{{<instance-pass `A value that only matches the second subschema is valid`>}}
{ "bar": 2 }
{{</instance-pass>}}

{{<instance-fail `A value that matches more than one subschema is invalid`>}}
{ "foo": 1, "bar": 2 }
{{</instance-fail>}}

{{<instance-fail `A value that matches every subschema is invalid`>}}
{ "foo": 1, "bar": 2, "baz": 3 }
{{</instance-fail>}}

{{<instance-fail `A value that does not match any of the subschemas is invalid`>}}
{ "extra": 4 }
{{</instance-fail>}}
