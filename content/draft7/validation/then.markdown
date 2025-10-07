---
keyword: "then"
signature: "Schema"
value: This keyword must be set to a valid JSON Schema
summary: "When [`if`](/draft7/validation/if) is present, and the instance successfully validates against its subschema, then validation succeeds if the instance also successfully validates against this keyword's subschema."
kind: [ "applicator" ]
instance: [ "any" ]
specification: "https://json-schema.org/draft-07/draft-handrews-json-schema-validation-01#rfc.section.6.6.2"
metaschema: "http://json-schema.org/draft-07/schema#"
default:
  value: "{}"
tests:
  - draft7/if-then-else.json
introduced_in: draft7
interdependencies:
  - vocabulary: validation
    keyword: if
related:
  - vocabulary: validation
    keyword: else
  - vocabulary: validation
    keyword: allOf
  - vocabulary: validation
    keyword: anyOf
  - vocabulary: validation
    keyword: oneOf
  - vocabulary: validation
    keyword: not
---

The [`then`]({{< ref "draft7/validation/then" >}}) keyword restricts instances
to validate against the given subschema if the [`if`]({{< ref
"draft7/validation/if" >}}) sibling keyword successfully validated against the
instance.

{{<common-pitfall>}} This keyword has no effect if the [`if`]({{< ref "draft7/validation/if" >}}) keyword is not declared within the same
subschema. {{</common-pitfall>}}

{{<best-practice>}} The [`if`]({{< ref "draft7/validation/if" >}}),
[`then`]({{< ref "draft7/validation/then" >}}), and [`else`]({{< ref "draft7/validation/else" >}}) keywords can be thought of as imperative variants
of the [`anyOf`]({{< ref "draft7/validation/anyof" >}}) keyword, and both
approaches are equally capable of describing arbitrary conditions. Choose the
one that more elegantly describes your desired
constraints.{{</best-practice>}}

## Examples

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

{{<instance-pass `A non-number value is valid`>}}
"Hello World"
{{</instance-pass>}}

{{<schema `A schema that uses a title for even numbers`>}}
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "if": { "multipleOf": 2 },
  "then": { "title": "The value is an even number" }
}
{{</schema>}}

{{<instance-pass `An even number value is valid`>}}
10
{{</instance-pass>}}

{{<instance-pass `An odd number value is valid`>}}
5
{{</instance-pass>}}
