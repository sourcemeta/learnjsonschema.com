---
keyword: "required"
signature: "Boolean"
value: This keyword is defined in the property definition subschema where a value must be defined within an instance
summary: "An object instance is valid if the name of the required property exists in the instance."
kind: [ "assertion" ]
instance: [ "object" ]
specification: "https://json-schema.org/draft-03/draft-zyp-json-schema-03.pdf#5.7"
metaschema: "http://json-schema.org/draft-03/schema#"
default:
  value: "false"
tests:
  - draft3/required.json
introduced_in: draft3
changed_in:
  - draft4
index: -99966
related:
  - vocabulary: core
    keyword: dependencies
---

## Examples

{{<schema `Schema with 'required' keyword`>}}
{
  "$schema": "http://json-schema.org/draft-03/schema#",
  "type": "object",
  "properties": { 
    "person": {
        "type": "string",
        "required": true
    }
  }
}
{{</schema>}}

{{<instance-pass `An object instance with the required property defined is valid`>}}
{ "person": "John Doe" }
{{</instance-pass>}}

{{<instance-fail `An object instance not containing the required property is invalid`>}}
{ "age": 10 }
{{</instance-fail>}}
