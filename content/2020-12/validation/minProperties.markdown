---
keyword: "minProperties"
signature: "Integer"
summary: "An object instance is valid if its number of properties is greater than, or equal to, the value of this keyword."
kind: [ "assertion" ]
instance: [ "object" ]
specification: "https://json-schema.org/draft/2020-12/json-schema-validation.html#section-6.5.2"
metaschema: "https://json-schema.org/draft/2020-12/meta/validation"
index: -99
introduced_in: draft4
related:
  - vocabulary: validation
    keyword: maxProperties
  - vocabulary: applicator
    keyword: properties
  - vocabulary: applicator
    keyword: patternProperties
  - vocabulary: applicator
    keyword: additionalProperties
---

The `minProperties` keyword is used to specify the minimum number of properties allowed in an object instnace. If the number of properties in the object is less than the value specified by `minProperties`, the validation fails.
* It applies specifically to object instances.
* The value of this keyword must be a non-negative integer (0 or greater).
* Omitting this keyword has the same behavior as a value of 0.

## Examples

{{<schema `Schema with 'minProperties' keyword`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "minProperties": 1
}
{{</schema>}}

{{<instance-pass `An instance with 1 or more properties is valid`>}}
{ "foo": 3, "bar": "hi" }
{{</instance-pass>}}

{{<instance-fail `An empty instance is invalid`>}}
{}
{{</instance-fail>}}

{{<instance-pass `'minProperties' has no effect on values other than objects`>}}
false
{{</instance-pass>}}

{{<schema `Schema with 'minProperties' and 'properties' keywords`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "object",
  "properties": {
    "name": { "type": "string" },
    "age": { "type": "integer" },
    "address": { "type": "string" }
  },
  "minProperties": 2
}
{{</schema>}}

{{<instance-pass `An instance with 2 or more properties is valid`>}}
{ "name": "John", "age": 2 }
{{</instance-pass>}}

{{<instance-fail `An instance with less than 2 properties is invalid`>}}
{ "name": "John" }
{{</instance-fail>}}

{{<schema `Schema with 'minProperties', 'patternProperties' and 'additionalProperties' keywords`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "object",
  "patternProperties": {
    "^[Aa]ge$": { "type": "integer" }
  },
  "additionalProperties": { "type": "string" },
  "minProperties": 2
}
{{</schema>}}

{{<instance-pass `An instance with 2 or more properties is valid`>}}
{ "Age": 22, "name": "John" }
{{</instance-pass>}}

{{<instance-fail `An instance with less than 2 properties is invalid`>}}
{ "Age": 67 }
{{</instance-fail>}}

{{<instance-pass `An instance with additional properties conforming to the 'additionalProperties' schema is valid`>}}
{ "myAge": "22", "name": "John" }
{{</instance-pass>}}

{{<instance-fail `An instance with additional properties not conforming to the 'additionalProperties' schema is invalid`>}}
{ "myAge": 22, "name": "John" }
{{</instance-fail>}}