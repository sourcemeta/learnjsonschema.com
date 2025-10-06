---
keyword: "if"
signature: "Schema"
value: This keyword must be set to a valid JSON Schema
summary: "This keyword declares a condition based on the validation result of the given schema."
kind: [ "applicator" ]
instance: [ "any" ]
specification: "https://json-schema.org/draft/2019-09/draft-handrews-json-schema-02#rfc.section.9.2.2.1"
metaschema: "https://json-schema.org/draft/2019-09/meta/applicator"
tests:
  - draft2019-09/if-then-else.json
index: -9999
introduced_in: draft7
affects:
  - vocabulary: applicator
    keyword: then
  - vocabulary: applicator
    keyword: else
related:
  - vocabulary: applicator
    keyword: allOf
  - vocabulary: applicator
    keyword: anyOf
  - vocabulary: applicator
    keyword: oneOf
  - vocabulary: applicator
    keyword: not
---

The {{<link keyword="if" vocabulary="applicator">}} keyword introduces a
subschema whose evaluation result restricts instances to validate against the
{{<link keyword="then" vocabulary="applicator">}} or {{<link keyword="else"
vocabulary="applicator">}} sibling subschemas (if present). Note that the
evaluation outcome of this subschema controls which other subschema to apply
(if any) but has no direct effect on the overall validation result.

{{<best-practice>}} The `if`, [`then`]({{< ref "2019-09/applicator/then"
>}}), and [`else`]({{< ref "2019-09/applicator/else" >}}) keywords can be
thought of as imperative variants of the [`anyOf`]({{< ref
"2019-09/applicator/anyof" >}}) keyword, and both approaches are equally
capable of describing arbitrary conditions. Choose the one that more elegantly
describes your desired constraints.{{</best-practice>}}

{{<learning-more>}} This keyword has no effect if neither the [`then`]({{< ref
"2019-09/applicator/then" >}}) nor [`else`]({{< ref
"2019-09/applicator/else" >}}) keywords are declared within the same subschema.
However, when collecting annotations, the JSON Schema implementation will still
need to evaluate the `if` keyword in case its subschema emits annotations.
{{</learning-more>}}

The {{<link keyword="if" vocabulary="applicator">}}, {{<link keyword="then"
vocabulary="applicator">}}, and {{<link keyword="else"
vocabulary="applicator">}} keywords are equivalent to the `?` and `:` ternary
conditional operators found in most programming languages. For example:

```c
bool valid = if_schema ? then_schema : else_schema;
```

JSON Schema is a [constraint-driven
language](https://modern-json-schema.com/json-schema-is-a-constraint-system).
Therefore, omitting either the {{<link keyword="then"
vocabulary="applicator">}} or the {{<link keyword="else"
vocabulary="applicator">}} keywords is equivalent to setting the
corresponding part of the ternary conditional operation to the boolean true.
In other words, undefined consequent or alternative paths lead to success.
For example:

```c
// If `then` is missing
bool valid = if_schema ? true : else_schema;
// If `else` is missing
bool valid = if_schema ? then_schema : true;
```

## Examples

{{<schema `A schema that constrains numeric instances to be positive when they are even numbers and negative otherwise`>}}
{
  "$schema": "https://json-schema.org/draft/2019-09/schema",
  "if": { "multipleOf": 2 },
  "then": { "minimum": 0 },
  "else": { "exclusiveMaximum": 0 }
}
{{</schema>}}

{{<instance-pass `An even number value that is positive is valid`>}}
10
{{</instance-pass>}}

{{<instance-fail `An even number value that is negative is invalid`>}}
-2
{{</instance-fail>}}

{{<instance-fail `An odd number value that is positive is invalid`>}}
7
{{</instance-fail>}}

{{<instance-pass `An odd number value that is negative is valid`>}}
-3
{{</instance-pass>}}

{{<instance-pass `A non-number value is valid`>}}
"Hello World"
{{</instance-pass>}}

{{<schema `A schema that constrains numeric instances to be positive when they are even numbers`>}}
{
  "$schema": "https://json-schema.org/draft/2019-09/schema",
  "if": { "multipleOf": 2 },
  "then": { "minimum": 0 }
}
{{</schema>}}

{{<instance-pass `An even number value that is positive is valid`>}}
10
{{</instance-pass>}}

{{<instance-fail `An even number value that is negative is invalid`>}}
-2
{{</instance-fail>}}

{{<instance-pass `An odd number value that is positive is valid`>}}
7
{{</instance-pass>}}

{{<instance-pass `An odd number value that is negative is valid`>}}
-3
{{</instance-pass>}}

{{<schema `A schema that constrains numeric instances to be positive when they are odd numbers`>}}
{
  "$schema": "https://json-schema.org/draft/2019-09/schema",
  "if": { "multipleOf": 2 },
  "else": { "minimum": 0 }
}
{{</schema>}}

{{<instance-pass `An even number value that is positive is valid`>}}
10
{{</instance-pass>}}

{{<instance-pass `An even number value that is negative is valid`>}}
-2
{{</instance-pass>}}

{{<instance-pass `An odd number value that is positive is valid`>}}
7
{{</instance-pass>}}

{{<instance-fail `An odd number value that is negative is invalid`>}}
-3
{{</instance-fail>}}

{{<schema `A conditional schema that emits an annotation without a consequent or alternative`>}}
{
  "$schema": "https://json-schema.org/draft/2019-09/schema",
  "if": { "items": { "type": "string" } }
}
{{</schema>}}

{{<instance-pass `A value that matches the conditional subschema is valid and receives the annotation`>}}
[ "foo", "bar", "baz" ]
{{</instance-pass>}}

{{<instance-annotation>}}
{ "keyword": "/if/items", "instance": "", "value": true }
{{</instance-annotation>}}

{{<instance-pass `A value that does not match the conditional subschema is still valid but receives no annotation`>}}
[ 1, 2, 3 ]
{{</instance-pass>}}
