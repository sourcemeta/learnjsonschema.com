---
keyword: "minContains"
signature: "Integer"
summary: "The number of times that the [`contains`](/2020-12/applicator/contains) keyword (if set) successfully validates against the instance must be greater than or equal to the given integer."
kind: [ "assertion" ]
instance: [ "array" ]
specification: "https://json-schema.org/draft/2020-12/json-schema-validation.html#section-6.4.5"
metaschema: "https://json-schema.org/draft/2020-12/meta/validation"
default:
  value: 0
tests:
  - draft2020-12/minContains.json
introduced_in: 2019-09
interdependencies:
  - vocabulary: applicator
    keyword: contains
related:
  - vocabulary: validation
    keyword: maxContains
  - vocabulary: applicator
    keyword: prefixItems
  - vocabulary: applicator
    keyword: items
---

The `minContains` keyword is used in conjunction with the `contains` keyword to specify the minimum number of items in an array instance that must validate against the `contains` subschema.
* This keyword applies only to arrays.
* The value of this keyword must be a non-negative integer.
* If `contains` is not present within the same schema object, then this keyword has no effect.

## Examples

{{<schema `Schema with the 'minContains' and 'contains' keyword`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "array",
  "contains": { "type": "string" },
  "minContains": 2
}
{{</schema>}}

{{<instance-pass `An array instance with 2 or more items successfully validating against the 'contains' subschema is valid`>}}
[ "Car", "Bus", 1, 2, "Bike" ]
{{</instance-pass>}}

{{<instance-fail `An array instance with less than 2 items successfully validating against the 'contains' subschema is invalid`>}}
[ "Car", 1 ]
{{</instance-fail>}}

{{<instance-fail `An empty array is invalid`>}}
[]
{{</instance-fail>}}

{{<schema `Schema with the 'minContains' keyword`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "array",
  "minContains": 2
}
// If contains is not present, 'minContains' has no effect on validation.
{{</schema>}}

{{<instance-pass `An array instance with any items is valid`>}}
[ "John", false, 29, { "foo": "bar" }, [ 5, 7 ] ]
{{</instance-pass>}}

{{<instance-pass `An empty array is also valid`>}}
[]
{{</instance-pass>}}

{{<schema `Schema with the 'minContains' and 'contains' keyword`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "array",
  "contains": { "type": "string" },
  "minContains": 0
}
{{</schema>}}

{{<instance-pass `An array instance with any items is valid`>}}
[ "John", false, 29, { "foo": "bar" }, [ 5, 7 ] ]
{{</instance-pass>}}

{{<instance-pass `An empty array is also valid`>}}
[]
{{</instance-pass>}}
* _It is important to note that the `contains` keyword requires at least one item of the array instance to validate against its subschema. However, when `minContains` is set to 0, the schema would behave as if it does not have the `contains` keyword, as shown in the above example._
