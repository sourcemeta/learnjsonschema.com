---
keyword: "dependentRequired"
signature: "Object<String, Array<String>>"
summary: "Validation succeeds if, for each name that appears in both the instance and as a name within this keyword's value, every item in the corresponding array is also the name of a property in the instance."
kind: [ "assertion" ]
instance: [ "object" ]
specification: "https://json-schema.org/draft/2020-12/json-schema-validation.html#section-6.5.4"
metaschema: "https://json-schema.org/draft/2020-12/meta/validation"
index: -99
introduced_in: 2019-09
related:
  - vocabulary: validation
    keyword: required
  - vocabulary: applicator
    keyword: dependentSchemas
  - vocabulary: applicator
    keyword: if
  - vocabulary: applicator
    keyword: then
  - vocabulary: applicator
    keyword: else
---

The `dependentRequired` keyword specifies a conditional dependency between properties within an instance. It ensures that if a certain property is present in an instance, then another specified set of properties must also be present. Essentially, it extends the functionality of required by allowing dependencies based on the existence of other properties. In short, if property A exists in an instance, then properties B, C, and D must also be present.
* The value of this keyword must be an object.
* Properties in this object, if any, must be arrays.
* Elements in each array, if any, must be strings, and must be unique.

## Examples

{{<schema `Schema with the 'dependentRequired' keyword`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "object",
  "properties": {
    "name": { "type": "string" },
    "age": { "type": "integer" },
    "license": { "type": "string" }
  },
  "dependentRequired": {
    "license": [ "age" ]
  }
}
{{</schema>}}

{{<instance-pass `An instance with both 'age' and 'license' properties is valid`>}}
{
  "name": "John",
  "age": 25,
  "license": "XYZ123"
}
{{</instance-pass>}}

{{<instance-fail `An instance with missing 'age' property when 'license' property is present is invalid`>}}
{
  "name": "John",
  "license": "XYZ123"
}
{{</instance-fail>}}

{{<instance-pass `An instance without 'license' property is valid`>}}
{
  "name": "John",
  "age": 25
}
{{</instance-pass>}}

{{<instance-pass `An empty object is also valid`>}}
{}
{{</instance-pass>}}