---
keyword: "required"
signature: "Array<String>"
summary: "An object instance is valid against this keyword if every item in the array is the name of a property in the instance."
kind: [ "assertion" ]
instance: [ "object" ]
specification: "https://json-schema.org/draft/2020-12/json-schema-validation.html#section-6.5.3"
metaschema: "https://json-schema.org/draft/2020-12/meta/validation"
index: -99
introduced_in: draft3
related:
  - vocabulary: validation
    keyword: dependentRequired
  - vocabulary: validation
    keyword: maxProperties
  - vocabulary: validation
    keyword: minProperties
---

The `required` keyword is used in conjunction with the `properties` keyword to specify which properties must be present within an object instance.
* The value of this keyword must be an array.
* Elements of this array, if any, must be strings, and must be unique.
* Omitting this keyword has the same behavior as an empty array.
* The `required` keyword can also be used within nested object schemas.

## Examples

{{<schema `Schema with the 'required' keyword`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "object",
  "properties": {
    "name": { "type": "string" },
    "age": { "type": "number" }
  },
  "required": [ "name", "age" ]
}
{{</schema>}}

{{<instance-pass `An instance with all the required properties is valid`>}}
{ "name": "John", "age": 65 }
{{</instance-pass>}}

{{<instance-fail `An instance with missing required properties is invalid`>}}
{ "name": "Doe" }
{{</instance-fail>}}

{{<schema `Schema with the 'required' keyword in nested subschemas`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "object",
  "properties": {
    "name": { "type": "string" },
    "address": {
      "type": "object",
      "properties": {
        "city": { "type": "string" },
        "country": { "type": "string" }
      },
      "required": [ "city", "country" ]
    }
  },
  "required": [ "address" ]
}
{{</schema>}}

{{<instance-pass `An instance with all the required properties is valid`>}}
{
  "name": "John",
  "address": {
    "city": "New York",
    "country": "USA"
  }
}
{{</instance-pass>}}

{{<instance-fail `'name' property is missing in the root object`>}}
{
  "address": {
    "city": "Hyderabad",
    "country": "India"
  }
}
{{</instance-fail>}}

{{<instance-fail `'country' property is missing in the nested object`>}}
{
  "name": "Doe",
  "address": {
    "city": "Dallas"
  }
}
{{</instance-fail>}}