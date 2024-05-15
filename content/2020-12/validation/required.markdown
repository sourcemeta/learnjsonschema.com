---
keyword: "required"
signature: "Array<String>"
summary: "An object instance is valid against this keyword if every item in the array is the name of a property in the instance."
kind: [ "assertion" ]
instance: [ "object" ]
specification: "https://json-schema.org/draft/2020-12/json-schema-validation.html#section-6.5.3"
metaschema: "https://json-schema.org/draft/2020-12/meta/validation"
tests:
  - draft2020-12/required.json
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

The `required` keyword is used to specify which properties must be present within an object instance.
* The value of this keyword must be an array.
* Elements of this array, if any, must be strings, and must be unique.
* Omitting this keyword has the same behavior as an empty array.

## Examples

{{<schema `Schema with the 'required' keyword`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "object",
  "required": [ "foo" ]
}
{{</schema>}}

{{<instance-pass `An instance with all the required properties is valid`>}}
{ "foo": "bar" }
{{</instance-pass>}}

{{<instance-fail `An instance with missing required properties is invalid`>}}
{ "bar": false }
{{</instance-fail>}}

{{<instance-pass `An instance with all the required properties is valid`>}}
{ "foo": [ "bar" ], "baz": 13 }
{{</instance-pass>}}
* _It is important to note that when the required properties are not defined in the `properties`, then the only requirement to make the instance valid is to have those properties present in the instance irrespective of their value's datatype._

{{<schema `Schema with the 'required' keyword`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "object",
  "properties": {
    "name": { "type": "string" },
    "age": { "type": "integer" }
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

{{<instance-fail `The value of 'age' property must be an integer`>}}
{ "name": "John Doe", "age": "48" }
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

{{<schema>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "object",
  "properties": {
    "name": { "type": "string" }
  },
  "required": [ "name", "age", "name" ]
}
// Schema with duplicate items in the required list is invalid.
{{</schema>}}
