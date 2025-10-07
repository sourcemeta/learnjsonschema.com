---
keyword: "if"
signature: "Schema"
value: This keyword must be set to a valid JSON Schema
summary: "This keyword declares a condition based on the validation result of the given schema."
kind: [ "applicator" ]
instance: [ "any" ]
specification: "https://json-schema.org/draft-07/draft-handrews-json-schema-validation-01#rfc.section.6.6.1"
metaschema: "http://json-schema.org/draft-07/schema#"
tests:
  - draft7/if-then-else.json
introduced_in: draft7
index: -1
affects:
  - vocabulary: validation
    keyword: then
  - vocabulary: validation
    keyword: else
related:
  - vocabulary: validation
    keyword: allOf
  - vocabulary: validation
    keyword: anyOf
  - vocabulary: validation
    keyword: oneOf
  - vocabulary: validation
    keyword: not
---

The [`if`]({{< ref "draft7/validation/if" >}}) keyword introduces a subschema
whose evaluation result restricts instances to validate against the
[`then`]({{< ref "draft7/validation/then" >}}) or [`else`]({{< ref
"draft7/validation/else" >}}) sibling subschemas (if present). Note that the
evaluation outcome of this subschema controls which other subschema to apply (if
any) but has no direct effect on the overall validation result.

{{<best-practice>}} The [`if`]({{< ref "draft7/validation/if" >}}),
[`then`]({{< ref "draft7/validation/then" >}}), and [`else`]({{< ref "draft7/validation/else" >}}) keywords can be thought of as imperative variants
of the [`anyOf`]({{< ref "draft7/validation/anyof" >}}) keyword, and both
approaches are equally capable of describing arbitrary conditions. Choose the
one that more elegantly describes your desired
constraints.{{</best-practice>}}

{{<learning-more>}} This keyword has no effect if neither the [`then`]({{< ref
"draft7/validation/then" >}}) nor [`else`]({{< ref "draft7/validation/else"
>}}) keywords are declared within the same subschema.{{</learning-more>}}

The [`if`]({{< ref "draft7/validation/if" >}}), [`then`]({{< ref
"draft7/validation/then" >}}), and [`else`]({{< ref "draft7/validation/else"
>}}) keywords are equivalent to the `?` and `:` ternary conditional operators
found in most programming languages. For example:

```c
bool valid = if_schema ? then_schema : else_schema;
```

JSON Schema is a [constraint-driven
language](https://modern-json-schema.com/json-schema-is-a-constraint-system).
Therefore, omitting either the [`then`]({{< ref "draft7/validation/then" >}})
or the [`else`]({{< ref "draft7/validation/else" >}}) keywords is equivalent to
setting the corresponding part of the ternary conditional operation to the
boolean true. In other words, undefined consequent or alternative paths lead to
success. For example:

```c
// If `then` is missing
bool valid = if_schema ? true : else_schema;
// If `else` is missing
bool valid = if_schema ? then_schema : true;
```

## Examples

{{<schema `A schema that constrains numeric instances to be positive when they are even numbers and negative otherwise`>}}
{
  "$schema": "http://json-schema.org/draft-07/schema#",
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
  "$schema": "http://json-schema.org/draft-07/schema#",
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
  "$schema": "http://json-schema.org/draft-07/schema#",
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

{{<schema `A conditional schema without a consequent or alternative`>}}
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "if": { "items": { "type": "string" } }
}
{{</schema>}}

{{<instance-pass `A value that matches the conditional subschema is valid`>}}
[ "foo", "bar", "baz" ]
{{</instance-pass>}}

{{<instance-pass `A value that does not match the conditional subschema is still valid`>}}
[ 1, 2, 3 ]
{{</instance-pass>}}
