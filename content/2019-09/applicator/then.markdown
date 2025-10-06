---
keyword: "then"
signature: "Schema"
value: This keyword must be set to a valid JSON Schema
summary: "When [`if`](/2019-09/applicator/if) is present, and the instance successfully validates against its subschema, then validation succeeds if the instance also successfully validates against this keyword's subschema."
kind: [ "applicator" ]
instance: [ "any" ]
specification: "https://json-schema.org/draft/2019-09/draft-handrews-json-schema-02#rfc.section.9.2.2.2"
metaschema: "https://json-schema.org/draft/2019-09/meta/applicator"
default:
  value: "{}"
tests:
  - draft2019-09/if-then-else.json
index: -9999
introduced_in: draft7
interdependencies:
  - vocabulary: applicator
    keyword: if
related:
  - vocabulary: applicator
    keyword: else
  - vocabulary: applicator
    keyword: allOf
  - vocabulary: applicator
    keyword: anyOf
  - vocabulary: applicator
    keyword: oneOf
  - vocabulary: applicator
    keyword: not
---

The {{<link keyword="then" vocabulary="applicator">}} keyword restricts
instances to validate against the given subschema if the {{<link keyword="if"
vocabulary="applicator">}} sibling keyword successfully validated against the
instance.

{{<common-pitfall>}} This keyword has no effect if the [`if`]({{< ref
"2019-09/applicator/if" >}}) keyword is not declared within the same
subschema. {{</common-pitfall>}}

{{<best-practice>}} The [`if`]({{< ref "2019-09/applicator/if" >}}),
`then`, and [`else`]({{< ref "2019-09/applicator/else" >}}) keywords can be
thought of as imperative variants of the [`anyOf`]({{< ref
"2019-09/applicator/anyof" >}}) keyword, and both approaches are equally
capable of describing arbitrary conditions. Choose the one that more elegantly
describes your desired constraints.{{</best-practice>}}

## Examples

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

{{<instance-pass `A non-number value is valid`>}}
"Hello World"
{{</instance-pass>}}

{{<schema `A schema that emits a simple annotation when a numeric value is even`>}}
{
  "$schema": "https://json-schema.org/draft/2019-09/schema",
  "if": { "multipleOf": 2 },
  "then": { "title": "The value is an even number" }
}
{{</schema>}}

{{<instance-pass `An even number value is valid and emits an annotation`>}}
10
{{</instance-pass>}}

{{<instance-annotation>}}
{ "keyword": "/then/title", "instance": "", "value": [ "The value is an even number" ] }
{{</instance-annotation>}}

{{<instance-pass `An odd number value is valid but does not emit an annotation`>}}
5
{{</instance-pass>}}
