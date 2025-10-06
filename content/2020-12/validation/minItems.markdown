---
keyword: "minItems"
signature: "Integer"
value: This keyword must be set to a zero or positive integer
summary: "An array instance is valid if its size is greater than, or equal to, the value of this keyword."
kind: [ "assertion" ]
instance: [ "array" ]
specification: "https://json-schema.org/draft/2020-12/json-schema-validation.html#section-6.4.2"
metaschema: "https://json-schema.org/draft/2020-12/meta/validation"
default:
  value: 0
tests:
  - draft2020-12/minItems.json
index: -9
introduced_in: draft1
related:
  - vocabulary: applicator
    keyword: prefixItems
  - vocabulary: applicator
    keyword: items
  - vocabulary: validation
    keyword: maxItems
  - vocabulary: applicator
    keyword: contains
---

The [`minItems`]({{< ref "2020-12/validation/minItems" >}}) keyword restricts array instances to consists of an inclusive
minimum numbers of items.

{{<common-pitfall>}} The presence of this keyword does not depend on the
presence of the [`items`]({{< ref "2020-12/applicator/items" >}}) keyword.
{{</common-pitfall>}}

{{<constraint-warning `array`>}}

## Examples

{{<schema `A schema that constrains array instances to contain at least 3 items`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "minItems": 3
}
{{</schema>}}

{{<instance-pass `An array value with more than 3 items is valid`>}}
[ 1, 2, 3, 4 ]
{{</instance-pass>}}

{{<instance-pass `An array value with 3 items is valid`>}}
[ 1, true, "hello" ]
{{</instance-pass>}}

{{<instance-fail `An array value with less than 3 items is invalid`>}}
[ false, "foo" ]
{{</instance-fail>}}

{{<instance-pass `A non-array value is valid`>}}
"Hello World"
{{</instance-pass>}}
