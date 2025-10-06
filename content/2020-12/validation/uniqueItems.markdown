---
keyword: "uniqueItems"
signature: "Boolean"
value: This keyword must be set to a boolean value
summary: "If this keyword is set to the boolean value `true`, the instance validates successfully if all of its elements are unique."
kind: [ "assertion" ]
instance: [ "array" ]
specification: "https://json-schema.org/draft/2020-12/json-schema-validation.html#section-6.4.3"
metaschema: "https://json-schema.org/draft/2020-12/meta/validation"
default:
  value: false
tests:
  - draft2020-12/uniqueItems.json
introduced_in: draft2
related:
  - vocabulary: applicator
    keyword: prefixItems
  - vocabulary: applicator
    keyword: items
  - vocabulary: applicator
    keyword: contains
---

When set to `true`, the [`uniqueItems`]({{< ref "2020-12/validation/uniqueItems" >}}) keyword restricts array instances to
items that only occur once in the array. Note that empty arrays and arrays that
consist of a single item satisfy uniqueness by definition.

{{<common-pitfall>}} Keep in mind that depending on the size and complexity of
arrays, this keyword may introduce significant validation overhead. The paper
[JSON: data model, query languages and schema
specification](https://arxiv.org/abs/1701.02221) also noted how the presence of
this keyword can negatively impact satisfiability analysis of
schemas.{{</common-pitfall>}}

{{<learning-more>}} While the official vocabularies do not offer a way to
ensure uniqueness of array items based a given key, the
[json-everything](https://json-everything.net) project defines a third-party
[Extended Validation of
Arrays](https://docs.json-everything.net/schema/vocabs/array-ext/) vocabulary
that introduces a
[`uniqueKeys`](https://docs.json-everything.net/schema/vocabs/array-ext/#uniquekeys)
keyword for this purpose. However, keep in mind that third-party vocabularies
are often not widely supported by implementations.{{</learning-more>}}

{{<constraint-warning `array`>}}

## Examples

{{<schema `A schema that constrains array instances to not contain duplicate items`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "uniqueItems": true
}
{{</schema>}}

{{<instance-pass `An array value without duplicate items is valid`>}}
[ 1, "hello", true, { "name": "John" } ]
{{</instance-pass>}}

{{<instance-fail `An array value with duplicate elements is invalid`>}}
[ { "name": "John" }, 1, "hello", true, { "name": "John" } ]
{{</instance-fail>}}

{{<instance-pass `An empty array value is valid`>}}
[]
{{</instance-pass>}}

{{<instance-pass `A non-array value is valid`>}}
"Hello World"
{{</instance-pass>}}

{{<schema `A schema that allows array instances to contain duplicate items`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "uniqueItems": false
}
{{</schema>}}

{{<instance-pass `An array value without duplicate items is valid`>}}
[ 1, "hello", true, { "name": "John" } ]
{{</instance-pass>}}

{{<instance-pass `An array value with duplicate elements is valid`>}}
[ { "name": "John" }, 1, "hello", true, { "name": "John" } ]
{{</instance-pass>}}

{{<instance-pass `An empty array value is valid`>}}
[]
{{</instance-pass>}}

{{<instance-pass `A non-array value is valid`>}}
"Hello World"
{{</instance-pass>}}
