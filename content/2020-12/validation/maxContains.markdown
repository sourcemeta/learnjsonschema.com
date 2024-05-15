---
keyword: "maxContains"
signature: "Integer"
summary: "The number of times that the [`contains`](/2020-12/applicator/contains) keyword (if set) successfully validates against the instance must be less than or equal to the given integer."
kind: [ "assertion" ]
instance: [ "array" ]
specification: "https://json-schema.org/draft/2020-12/json-schema-validation.html#section-6.4.4"
metaschema: "https://json-schema.org/draft/2020-12/meta/validation"
tests:
  - draft2020-12/maxContains.json
introduced_in: 2019-09
interdependencies:
  - vocabulary: applicator
    keyword: contains
related:
  - vocabulary: validation
    keyword: minContains
  - vocabulary: applicator
    keyword: prefixItems
  - vocabulary: applicator
    keyword: items
---

The `maxContains` keyword is used in conjunction with the `contains` keyword to specify the maximum number of items in an array instance that must validate against the `contains` subschema.
* This keyword applies only to arrays.
* The value of this keyword must be a non-negative integer.
* If `contains` is not present within the same schema object, then this keyword has no effect.

## Examples

{{<schema `Schema with the 'maxContains' and 'contains' keyword`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "array",
  "contains": { "type": "string" },
  "maxContains": 2
}
{{</schema>}}

{{<instance-pass `An array instance with 2 or less items successfully validating against the 'contains' subschema is valid`>}}
[ "Car", "Bus", 1, 2 ]
{{</instance-pass>}}

{{<instance-fail `An array instance with more than 2 items successfully validating against the 'contains' subschema is invalid`>}}
[ "Car", "Bus", 1, 2, "Bike" ]
{{</instance-fail>}}

{{<schema `Schema with the 'maxContains' keyword`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "array",
  "maxContains": 2
}
// If contains is not present, 'maxContains' has no effect on validation.
{{</schema>}}

{{<instance-pass `An array instance with any items is valid`>}}
[ "John", false, 29, { "foo": "bar" }, [ 5, 7 ] ]
{{</instance-pass>}}

{{<instance-pass `An empty array is also valid`>}}
[]
{{</instance-pass>}}
