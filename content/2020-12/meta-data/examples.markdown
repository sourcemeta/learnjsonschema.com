---
keyword: "examples"
signature: "Array<Any>"
value: This keyword must be set to an array of JSON values that preferrably successfully validates against the corresponding subschema
summary: "This keyword is used to provide sample JSON values associated with a particular schema, for the purpose of illustrating usage."
kind: [ "annotation" ]
instance: [ "any" ]
specification: "https://json-schema.org/draft/2020-12/json-schema-validation.html#section-9.5"
metaschema: "https://json-schema.org/draft/2020-12/meta/meta-data"
default:
  value: "[]"
tests:
  - draft2020-12/optional/refOfUnknownKeyword.json
introduced_in: draft6
annotation:
   description: The set of examples set by this keyword
   kind: [ "array" ]
related:
  - vocabulary: meta-data
    keyword: title
  - vocabulary: meta-data
    keyword: description
  - vocabulary: meta-data
    keyword: default
  - vocabulary: meta-data
    keyword: readOnly
  - vocabulary: meta-data
    keyword: writeOnly
  - vocabulary: meta-data
    keyword: deprecated
target_version: "mvp"
---

## Explanation

The `examples` keyword is used to provide a list of example instances associated with a particular schema that should ideally validate against the schema. These examples serve to illustrate the intended structure and constraints defined by the schema. While these examples are not used for validation purposes, they are helpful in providing sample valid instances against the schema they are defined in.

_**Note:** While it is recommended that the examples validate against the subschema they are defined in, this requirement is not strictly enforced._

* Used to demonstrate how data should conform to the schema.
* `examples` does not affect data validation but serves as an informative annotation.

## Examples

{{<schema `Schema with 'examples' keyword`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "examples": [ "foo", "bar", "Doe" ],
  "type": "string"
}
{{</schema>}}

{{<instance-pass `An instance with a string value is valid`>}}
"John"
{{</instance-pass>}}

{{<instance-annotation>}}
{
  "valid": true,
  "keywordLocation": "/examples",
  "instanceLocation": "",
  "annotation": [ "foo", "bar", "Doe" ]
}
{{</instance-annotation>}}

{{<schema `Schema with logical operators`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "if": {
    "properties": {
      "foo": { "const": "foo" }
    }
  },
  "then": {
    "properties": {
      "bar": {
        "type": "array",
        "examples": [ [ "foo" ], [ "bar", "baz" ] ]
      }
    }
  },
  "else": {
    "properties": {
      "bar": {
        "type": "boolean",
        "examples": [ false, true ]
      }
    }
  }
}
{{</schema>}}

{{<instance-pass>}}
{ "foo": "foo", "bar": [ "bar" ] }
{{</instance-pass>}}

{{<instance-annotation>}}
[
  /// ...
  {
    "valid": true,
    "keywordLocation": "/then/properties/bar/examples",
    "instanceLocation": "/bar",
    "annotation": [ [ "foo" ], [ "bar", "baz" ] ]
  },
  // ...
]
{{</instance-annotation>}}

{{<instance-pass>}}
{ "foo": "not foo", "bar": true }
{{</instance-pass>}}

{{<instance-annotation>}}
[
  /// ...
  {
    "valid": true,
    "keywordLocation": "/else/properties/bar/examples",
    "instanceLocation": "/bar",
    "annotation": [ false, true ]
  },
  // ...
]
{{</instance-annotation>}}

{{<schema `Schema with multiple annotations for the same instance`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "examples": [ "John", "Karl" ],
  "$ref": "#/$defs/name",
  "$defs": {
    "name": {
      "examples": [ "John", "Karl" ],
      "type": "string"
    }
  }
}
{{</schema>}}

{{<instance-pass>}}
"John Doe"
{{</instance-pass>}}

{{<instance-annotation>}}
[
  // ...
  {
    "valid": true,
    "keywordLocation": "/examples",
    "instanceLocation": "",
    "annotation": [ "John", "Karl" ]
  },
  {
    "valid": true,
    "keywordLocation": "/$ref/examples",
    "instanceLocation": "",
    "annotation": [ "John", "Karl" ]
  },
  // ...
]
{{</instance-annotation>}}
