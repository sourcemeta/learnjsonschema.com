---
keyword: "maxProperties"
signature: "Integer"
summary: "An object instance is valid if its number of properties is less than, or equal to, the value of this keyword."
kind: [ "assertion" ]
instance: [ "object" ]
specification: "https://json-schema.org/draft/2020-12/json-schema-validation.html#section-6.5.1"
metaschema: "https://json-schema.org/draft/2020-12/meta/validation"
index: -99
introduced_in: draft4
related:
  - vocabulary: validation
    keyword: minProperties
  - vocabulary: applicator
    keyword: properties
  - vocabulary: applicator
    keyword: patternProperties
  - vocabulary: applicator
    keyword: additionalProperties
---

The `maxProperties` keyword is used to specify the maximum number of properties allowed in an object instnace. It is typically used to enforce constraints on the number of properties an object instance can have. If the number of properties in the object exceeds the value specified by `maxProperties`, the validation fails.
* It applies specifically to object instances.
* The value of this keyword must be a non-negative integer (0 or greater).
* Setting `maxProperties` to 0 enforces an empty object instance.

## Examples

{{<schema `Schema with 'maxProperties' keyword`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "maxProperties": 2
}
{{</schema>}}

{{<instance-pass `An instance with 2 or less properties is valid`>}}
{ "foo": 3, "bar": "hi" }
{{</instance-pass>}}

{{<instance-pass `'minProperties' has no effect on values other than objects`>}}
false
{{</instance-pass>}}

{{<instance-fail `An instance with more than 2 properties is invalid`>}}
{ "foo": 3, "bar": "hi", "baz": true }
{{</instance-fail>}}

{{<schema `Schema with 'maxProperties' and 'properties' keywords`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "object",
  "properties": {
    "name": { "type": "string" },
    "age": { "type": "integer" },
    "address": { "type": "string" }
  },
  "maxProperties": 2
}
{{</schema>}}

{{<instance-pass `An instance with 2 or less properties is valid`>}}
{ "name": "John", "age": 2 }
{{</instance-pass>}}

{{<instance-fail `An instance with more than 2 properties is invalid`>}}
{ "name": "John", "age": 2, "address": "22/3, GCET Road, Ahmedabad, Gujarat" }
{{</instance-fail>}}

{{<schema `Schema with 'maxProperties', 'patternProperties' and 'additionalProperties' keywords`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "object",
  "patternProperties": {
    "^[Aa]ge$": { "type": "integer" }
  },
  "additionalProperties": { "type": "boolean" },
  "maxProperties": 2
}
{{</schema>}}

{{<instance-pass `An instance with 2 or less properties is valid`>}}
{ "Age": 22 }
{{</instance-pass>}}

{{<instance-fail `The value of 'eligible' property must be a boolean`>}}
{ "Age": 21, "eligible": "yes" }
{{</instance-fail>}}

{{<instance-pass `An instance with 2 or less properties is valid`>}}
{ "Age": 21, "eligible": true }
{{</instance-pass>}}

{{<instance-fail `An instance with more than 2 properties is invalid`>}}
{ "Age": 21, "eligible": true, "isGraduated": true }
{{</instance-fail>}}

{{<schema `Schema with 'maxProperties' and 'required' keywords`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "object",
  "properties": {
    "name": { "type": "string" },
    "age": { "type": "integer" },
    "address": { "type": "string" }
  },
  "required": [ "name", "age", "address" ],
  "maxProperties": 2
}
{{</schema>}}

{{<instance-fail `An instance without 'address' property is invalid`>}}
{ "name": "John", "age": 42 }
{{</instance-fail>}}

{{<instance-fail `An instance with more than 2 properties is invalid`>}}
{ "name": "John", "age": 42, "address": "some address" }
{{</instance-fail>}}
* _It is important to note that one should be cautious when using the `required` and `maxProperties` keywords together in a schema because it can create a situation where the instance will always fail the validation, as shown in the above example._

{{<schema `Schema with 'maxProperties' and 'minProperties' keywords`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "object",
  "maxProperties": 2,
  "minProperties": 4
}
{{</schema>}}

{{<instance-fail `All object instances are invalid against the above schema`>}}
{ "name": "John", "age": 42 }
{{</instance-fail>}}

{{<instance-pass `Any instance with a value other than an object is valid`>}}
{ "name": "John", "age": 42 }
{{</instance-pass>}}
* _When using `maxProperties` and `minProperties` together in a schema to add extra constraints on the instance, one must make sure that the value of `minProperties` is not greater than `maxProperties`; otherwise, no object instance will be valid against that schema._