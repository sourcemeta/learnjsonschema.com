---
keyword: "maxItems"
signature: "Integer"
value: This keyword must be set to a zero or positive integer
summary: "An array instance is valid if its size is less than, or equal to, the value of this keyword."
kind: [ "assertion" ]
instance: [ "array" ]
specification: "https://json-schema.org/draft/2019-09/draft-handrews-json-schema-validation-02#rfc.section.6.4.1"
metaschema: "https://json-schema.org/draft/2019-09/meta/validation"
tests:
  - draft2019-09/maxItems.json
index: -9
introduced_in: draft1
related:
  - vocabulary: applicator
    keyword: items
  - vocabulary: applicator
    keyword: additionalItems
  - vocabulary: validation
    keyword: minItems
  - vocabulary: applicator
    keyword: contains
---

The `maxItems` keyword restricts array instances to consists of an inclusive
maximum numbers of items.

{{<common-pitfall>}} The presence of this keyword does not depend on the
presence of the [`items`]({{< ref "2019-09/applicator/items" >}}) keyword.
{{</common-pitfall>}}

{{<best-practice>}}To restrict array instances to the empty array, prefer using
the [`const`]({{< ref "2019-09/validation/const" >}}) keyword instead of
setting this keyword to `0`. {{</best-practice>}}

{{<constraint-warning `array`>}}

## Examples

{{<schema `A schema that constrains array instances to contain at most 3 items`>}}
{
  "$schema": "https://json-schema.org/draft/2019-09/schema",
  "maxItems": 3
}
{{</schema>}}

{{<instance-fail `An array value with more than 3 items is invalid`>}}
[ 1, 2, 3, 4 ]
{{</instance-fail>}}

{{<instance-pass `An array value with 3 items is valid`>}}
[ 1, true, "hello" ]
{{</instance-pass>}}

{{<instance-pass `An array value with less than 3 items is valid`>}}
[ false, "foo" ]
{{</instance-pass>}}

{{<instance-pass `A non-array value is valid`>}}
"Hello World"
{{</instance-pass>}}
