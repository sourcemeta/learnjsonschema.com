---
keyword: "description"
signature: "String"
summary: "An explanation about the purpose of the instance described by the schema."
kind: [ "annotation" ]
instance: [ "any" ]
specification: "https://json-schema.org/draft/2020-12/json-schema-validation.html#section-9.1"
metaschema: "https://json-schema.org/draft/2020-12/meta/meta-data"
index: -999
introduced_in: draft1
related:
  - vocabulary: meta-data
    keyword: title
  - vocabulary: meta-data
    keyword: examples
  - vocabulary: meta-data
    keyword: default
  - vocabulary: meta-data
    keyword: readOnly
  - vocabulary: meta-data
    keyword: writeOnly
  - vocabulary: meta-data
    keyword: deprecated
---

Annotations
-----------

This keyword produces the description as the annotation value.

## Explanation

The `description` keyword in JSON Schema is used to provide additional explanatory information about the schema or its parts. It does not affect data validation but serves as an informative annotation. The value of this keyword must be a string.

## Examples

{{<schema `Schema with 'description' keyword`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "description": "The age of a person must not be less than zero",
  "type": "number"
}
{{</schema>}}

{{<instance-pass `An instance with a numeric value is valid`>}}
45
{{</instance-pass>}}

{{<instance-annotation>}}
{
  "valid": true,
  "keywordLocation": "/description",
  "instanceLocation": "",
  "annotation": "The age of a person must not be less than zero"
}
{{</instance-annotation>}}

{{<schema `Schema with logical operators`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "description": "Personal information of a user",
  "properties": {
    "name": { "type": "string" },
    "age": { "type": "number" }
  },
  "if": {
    "description": "if block",
    "properties": {
      "age": { "description": "'if' true", "minimum": 18 }
    }
  },
  "then": {
    "description": "then block",
    "properties": {
      "eligible": { "description": "then applied", "const": true }
    }
  },
  "else": {
    "description": "else block",
    "properties": {
      "eligible": { "description": "else applied", "const": false }
    }
  }
}
{{</schema>}}

{{<instance-pass>}}
{
  "name": "John Doe",
  "age": 25,
  "eligible": true
}
{{</instance-pass>}}

{{<instance-annotation>}}
[
  /// ...
  {
    "valid": true,
    "keywordLocation": "/description",
    "instanceLocation": "",
    "annotation": "Personal information of a user"
  },
  {
    "valid": true,
    "keywordLocation": "/if/description",
    "instanceLocation": "",
    "annotation": "if block"
  },
  {
    "valid": true,
    "keywordLocation": "/if/properties/age/description",
    "instanceLocation": "/age",
    "annotation": "'if' true"
  },
  {
    "valid": true,
    "keywordLocation": "/then/description",
    "instanceLocation": "",
    "annotation": "then block",
  },
  {
    "valid": true,
    "keywordLocation": "/then/properties/eligible/description",
    "instanceLocation": "/eligible",
    "annotation": "then applied"
  },
  // ...
]
{{</instance-annotation>}}

{{<schema `Schema with multiple annotations for the same instance`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "description": "Name of the person should not include special characters",
  "$ref": "#/$defs/name",
  "$defs": {
    "name": {
      "description": "Name of the person should not include special characters",
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
    "keywordLocation": "/description",
    "instanceLocation": "",
    "annotation": "Name of the person should not include special characters"
  },
  {
    "valid": true,
    "keywordLocation": "/$ref/description",
    "instanceLocation": "",
    "annotation": "Name of the person should not include special characters"
  },
  // ...
]
{{</instance-annotation>}}