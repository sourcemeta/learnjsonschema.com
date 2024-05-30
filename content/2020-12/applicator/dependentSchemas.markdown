---
keyword: "dependentSchemas"
signature: "Object<String, Schema>"
value: This keyword must be set to an object where each value is a valid JSON Schema
summary: "This keyword specifies subschemas that are evaluated if the instance is an object and contains a certain property."
kind: [ "applicator" ]
instance: [ "object" ]
specification: "https://json-schema.org/draft/2020-12/json-schema-core.html#section-10.2.2.4"
metaschema: "https://json-schema.org/draft/2020-12/meta/applicator"
default:
  value: "{}"
tests:
  - draft2020-12/dependentSchemas.json
index: -997
introduced_in: 2019-09
related:
  - vocabulary: validation
    keyword: required
  - vocabulary: validation
    keyword: dependentRequired
---

The  {{<keyword-link name="dependentSchemas" >}} keyword allows you to define dependencies between properties based on the presence of other properties within an instance. It extends the functionality of the  {{<keyword-link name="dependentRequired" >}} keyword by allowing you to pass in a full schema. The instance will be considered valid only if the dependent properties adhere to the  {{<keyword-link name="dependentSchemas" >}} schema.

* Each key in the object represents a property name.
* Instance is valid if the associated property is present and conforms to the subschema.

## Examples

{{<schema `Schema with the 'dependentSchemas' keyword`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "object",
  "properties": {
    "name": { "type": "string" },
    "license": { "type": "string" }
  },
  "dependentSchemas": {
    "license": {
      "properties": {
        "age": { "type": "number" }
      },
      "required": [ "age" ]
    }
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

{{<instance-fail `An instance with the 'age' property not conforming to the subschema is invalid`>}}
{
  "name": "John",
  "age": "25",
  "license": "XYZ123"
}
{{</instance-fail>}}

{{<instance-pass `When the 'license' property is missing, the 'age' property will not affect the validation`>}}
{
  "name": "John",
  "age": "25"
}
{{</instance-pass>}}

{{<instance-fail `An instance with missing 'age' property when 'license' property is present is invalid`>}}
{
  "name": "John",
  "license": "XYZ123"
}
{{</instance-fail>}}

{{<schema `Complex schema with the 'dependentSchemas' keyword`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "object",
  "properties": {
    "name": { "type": "string" }
  },
  "dependentSchemas": {
    "name": {
      "properties": {
        "age": { "type": "number" }
      },
      "dependentSchemas": {
        "age": {
          "properties": {
            "eligible": { "type": "boolean" }
          },
          "required": [ "eligible" ]
        }
      },
      "required": [ "age" ]
    }
  }
}
{{</schema>}}

{{<instance-pass `An instance with all the required properties is valid`>}}
{
  "name": "John",
  "age": 15,
  "eligible": false
}
{{</instance-pass>}}

{{<instance-fail `An instance with 'age' property not conforming to the schema is invalid`>}}
{
  "name": "manager",
  "age": "25",
  "eligible": true
}
{{</instance-fail>}}

{{<instance-pass `'age' and 'eligible' properties do not affect the validation when the 'name' property is missing`>}}
{
  "age": "25",
  "eligible": true
}
{{</instance-pass>}}

{{<instance-pass `'age' and 'eligible' properties do not affect the validation when the 'name' property is missing`>}}
{
  "age": "25",
  "eligible": true
}
{{</instance-pass>}}

{{<instance-fail `An instance with missing 'eligible' property when 'age' property is present is invalid`>}}
{
  "name": "manager",
  "age": "25"
}

{{</instance-fail>}}
