---
keyword: "patternProperties"
signature: "Object<String, Schema>"
value: This keyword must be set to an object where each key is a valid [ECMA-262](https://www.ecma-international.org/publications-and-standards/standards/ecma-262/) regular expression and each value is a valid JSON Schema
summary: "Validation succeeds if, for each instance name that matches any regular expressions that appear as a property name in this keyword's value, the child instance for that name successfully validates against each schema that corresponds to a matching regular expression."
kind: [ "applicator", "annotation" ]
instance: [ "object" ]
specification: "https://json-schema.org/draft/2020-12/json-schema-core.html#section-10.3.2.2"
metaschema: "https://json-schema.org/draft/2020-12/meta/applicator"
default:
  value: "{}"
tests:
  - draft2020-12/patternProperties.json
index: -998
introduced_in: draft3
changed_in:
  - draft4
annotation:
   description: The set of instance property names validated by this keyword's subschema
   kind: [ "array" ]
affects:
  - vocabulary: applicator
    keyword: additionalProperties
  - vocabulary: unevaluated
    keyword: unevaluatedProperties
related:
  - vocabulary: applicator
    keyword: properties
  - vocabulary: applicator
    keyword: dependentSchemas
  - vocabulary: applicator
    keyword: propertyNames
  - vocabulary: validation
    keyword: required
  - vocabulary: validation
    keyword: dependentRequired
  - vocabulary: validation
    keyword: minProperties
  - vocabulary: validation
    keyword: maxProperties
  - vocabulary: unevaluated
    keyword: unevaluatedProperties
---

## Explanation

The `patternProperties` keyword is a variant of `properties` with regular expression support. It maps regular expressions to schemas. If a property name matches the given regular expression, the property value must validate against the corresponding schema.

## Examples

{{<schema `Schema with 'patternProperties' keyword`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "object",
  "patternProperties": {
    "^[Nn]ame$": { "type": "string" },
    "^[Aa]ge$": { "type": "number" }
  }
}
{{</schema>}}

{{<instance-pass `An object instance with properties matching the regex and conforming to the corresponding schema is valid`>}}
{ "name": "John Doe", "age": 21 }
{{</instance-pass>}}

{{<instance-annotation>}}
[
  // ...
  {
    "valid": true,
    "keywordLocation": "/patternProperties",
    "instanceLocation": "",
    "annotation": [ "name", "age" ]
  },
  // ...
]
{{</instance-annotation>}}

{{<instance-fail `An object instance with properties matching the regex and not conforming to the corresponding schema is invalid`>}}
{ "name": "John Doe", "age": "21" }
{{</instance-fail>}}
* _Annotations are not produced when validation fails._

{{<schema `Schema with patternProperties with boolean schemas`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "patternProperties": {
    "^f.*": true,
    "^b.*": false
  }
}
{{</schema>}}

{{<instance-pass `An instance with properties not matching any regex is valid`>}}
{ "zbaz": "zbaz" }
{{</instance-pass>}}

{{<instance-annotation>}}
[
  // ...
  {
    "valid": true,
    "keywordLocation": "/patternProperties",
    "instanceLocation": "",
    "annotation": []
  },
  // ...
]
{{</instance-annotation>}}
* _**Note:** If `patternProperties` does not match anything, it is still expected to produce an empty array annotation._

{{<instance-fail `An instance with properties matching the regex with a 'false' schema is invalid`>}}
{ "foo": "foo", "bar": "bar" }
{{</instance-fail>}}

{{<instance-pass `An instance with properties matching the regex with a 'true' schema, or/and with additional properties is valid`>}}
{ "foo": "foo" }
{{</instance-pass>}}

{{<instance-annotation>}}
[
  // ...
  {
    "valid": true,
    "keywordLocation": "/patternProperties",
    "instanceLocation": "",
    "annotation": [ "foo" ]
  },
  // ...
]
{{</instance-annotation>}}

{{<schema `Schema with overlap between 'patternProperties' and 'properties'`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "object",
  "properties": {
    "foo": { "type": "string" }
  },
  "patternProperties": {
    "^f": { "type": "string" }
  }
}
{{</schema>}}

{{<instance-fail `The value of 'foo' property must be a string`>}}
{ "foo": [ "bar" ] }
{{</instance-fail>}}

{{<instance-pass `An object instance with properties conforming to the schema is valid`>}}
{ "foo": "bar" }
{{</instance-pass>}}

{{<instance-annotation>}}
[
  // ...
  {
    "valid": true,
    "keywordLocation": "/properties",
    "instanceLocation": "",
    "annotation": [ "foo" ]
  },
  {
    "valid": true,
    "keywordLocation": "/patternProperties",
    "instanceLocation": "",
    "annotation": [ "foo" ]
  },
  // ...
]
{{</instance-annotation>}}

{{<schema `Schema with 'patternProperties', 'properties' and 'additionalProperties' keyword`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "object",
  "properties": {
    "name": { "type": "string" }
  },
  "patternProperties": {
    "[Aa]ge$": { "type": "number" }
  },
  "additionalProperties": true
}
{{</schema>}}

{{<instance-fail `The value of the 'name' property must be a string`>}}
{
  "name": [ "John", "Doe" ],
  "Age": 21,
  "email": "foo@bar.com"
}
{{</instance-fail>}}

{{<instance-pass `An object instance with properties conforming to the schema is valid`>}}
{
  "name": "John Doe",
  "Age": 21,
  "email": "foo@bar.com"
}
{{</instance-pass>}}

{{<instance-annotation>}}
[
  // ...
  {
    "valid": true,
    "keywordLocation": "/properties",
    "instanceLocation": "",
    "annotation": [ "name" ]
  },
  {
    "valid": true,
    "keywordLocation": "/patternProperties",
    "instanceLocation": "",
    "annotation": [ "Age" ]
  },
  {
    "valid": true,
    "keywordLocation": "/additionalProperties",
    "instanceLocation": "",
    "annotation": [ "email" ]
  },
  // ...
]
{{</instance-annotation>}}
* _Instance properties (keys) not present in `properties` or not matching any regex within `patternProperties` are evaluated against `additionalProperties`._
