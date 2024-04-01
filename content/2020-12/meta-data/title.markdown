---
keyword: "title"
signature: "String"
summary: "A preferably short description about the purpose of the instance described by the schema."
kind: [ "annotation" ]
instance: [ "any" ]
specification: "https://json-schema.org/draft/2020-12/json-schema-validation.html#section-9.1"
metaschema: "https://json-schema.org/draft/2020-12/meta/meta-data"
index: -9999
introduced_in: draft1
related:
  - vocabulary: meta-data
    keyword: description
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

This keyword produces the title as the annotation value.

## Explanation

The `title` keyword in JSON Schema is used to provide a human-readable label for a schema or its parts. It does not affect data validation but serves as an informative annotation. The value of this keyword must be a string.

## Examples

{{<schema `Schema with 'title' keyword`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "Age of a person",
  "type": "number"
}
{{</schema>}}

{{<instance-pass `An instance with a numeric value is valid`>}}
45
{{</instance-pass>}}

{{<instance-annotation>}}
{
  "valid": true,
  "keywordLocation": "/title",
  "instanceLocation": "",
  "annotations": "Age of a person"
}
{{</instance-annotation>}}

{{<schema `Schema with logical operators`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "Personal Info",
  "properties": {
    "name": { "type": "string" },
    "age": { "type": "number" }
  },
  "if": {
    "title": "if block",
    "properties": {
      "age": { "title": "'if' true", "minimum": 18 }
    }
  },
  "then": {
    "title": "then block",
    "properties": {
      "eligible": { "title": "then applied", "const": true }
    }
  },
  "else": {
    "title": "else block",
    "properties": {
      "eligible": { "title": "else applied", "const": false }
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
    "keywordLocation": "/title",
    "instanceLocation": "",
    "annotations": "Personal Info"
  },
  {
    "valid": true,
    "keywordLocation": "/properties",
    "instanceLocation": "",
    "annotations": [ "name", "age" ]
  },
  {
    "valid": true,
    "keywordLocation": "/if/title",
    "instanceLocation": "",
    "annotations": "if block"
  },
  {
    "valid": true,
    "keywordLocation": "/if/properties",
    "instanceLocation": "",
    "annotations": [ "age" ]
  },
  {
    "valid": true,
    "keywordLocation": "/if/properties/age/title",
    "instanceLocation": "/age",
    "annotations": "'if' true"
  },
  {
    "valid": true,
    "keywordLocation": "/then/title",
    "instanceLocation": "",
    "annotations": "then block",
  },
  {
    "valid": true,
    "keywordLocation": "/then/properties",
    "instanceLocation": "",
    "annotations": [ "eligible" ]
  },
  {
    "valid": true,
    "keywordLocation": "/then/properties/eligible/title",
    "instanceLocation": "",
    "annotations": "then applied"
  },
  // ...
]
{{</instance-annotation>}}

{{<schema `Schema with multiple annotations for the same instance`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "Person's name",
  "$ref": "#/$defs/name",
  "$defs": {
    "name": {
      "title": "Person's name",
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
    "keywordLocation": "/title",
    "instanceLocation": "",
    "annotations": "Person's name"
  },
  {
    "valid": true,
    "keywordLocation": "/$ref/title",
    "instanceLocation": "",
    "annotations": "Person's name"
  },
  // ...
]
{{</instance-annotation>}}