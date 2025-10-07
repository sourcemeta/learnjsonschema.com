---
keyword: "uniqueItems"
signature: "Boolean"
value: This keyword must be set to a boolean value
summary: "If this keyword is set to the boolean value `true`, the instance validates successfully if all of its elements are unique."
kind: [ "assertion" ]
instance: [ "array" ]
specification: "https://json-schema.org/draft-04/draft-fge-json-schema-validation-00#rfc.section.5.3.4"
metaschema: "http://json-schema.org/draft-04/schema#"
default:
  value: false
tests:
  - draft4/uniqueItems.json
introduced_in: draft2
index: -95
related:
  - vocabulary: validation
    keyword: items
  - vocabulary: validation
    keyword: additionalItems
---


When set to `true`, the [`uniqueItems`]({{< ref "draft4/validation/uniqueitems" >}}) keyword restricts array instances to
items that only occur once in the array. Note that empty arrays and arrays that
consist of a single item satisfy uniqueness by definition.

{{<common-pitfall>}} Keep in mind that depending on the size and complexity of
arrays, this keyword may introduce significant validation overhead. The paper
[JSON: data model, query languages and schema
specification](https://arxiv.org/abs/1701.02221) also noted how the presence of
this keyword can negatively impact satisfiability analysis of
schemas.{{</common-pitfall>}}

{{<constraint-warning `array`>}}

## Examples

{{<schema `A schema that constrains array instances to not contain duplicate items`>}}
{
  "$schema": "http://json-schema.org/draft-04/schema#",
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
  "$schema": "http://json-schema.org/draft-04/schema#",
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
