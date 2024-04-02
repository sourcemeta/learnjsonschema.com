---
keyword: "default"
signature: "Any"
summary: "This keyword can be used to supply a default JSON value associated with a particular schema."
kind: [ "annotation" ]
instance: [ "any" ]
specification: "https://json-schema.org/draft/2020-12/json-schema-validation.html#section-9.2"
metaschema: "https://json-schema.org/draft/2020-12/meta/meta-data"
introduced_in: draft1
related:
  - vocabulary: meta-data
    keyword: title
  - vocabulary: meta-data
    keyword: description
  - vocabulary: meta-data
    keyword: examples
  - vocabulary: meta-data
    keyword: readOnly
  - vocabulary: meta-data
    keyword: writeOnly
  - vocabulary: meta-data
    keyword: deprecated
---

Annotations
-----------

This keyword produces the default value as the annotation value.

## Explanation

The `default` keyword in JSON Schema is used to specify a default value for an instance or its parts. This value is not used to fill in missing values during the validation process but can be used by non-validation tools such as documentation generators or form generators to provide hints to users.

_**Note:** While it is recommended that the default value validate against its subschema, this requirement is not strictly enforced. However, it is strongly advised for people to ensure validation compatibility_

## Examples

{{<schema `Schema with 'default' keyword`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "default": "John",
  "type": "number"
}
{{</schema>}}

{{<instance-pass `An instance with a numeric value is valid`>}}
45
{{</instance-pass>}}

{{<instance-annotation>}}
{
  "valid": true,
  "keywordLocation": "/default",
  "instanceLocation": "",
  "annotation": "John"
}
{{</instance-annotation>}}

{{<schema `Schema with logical operators`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "properties": {
    "name": { "type": "string", "default": "John" },
    "education": {
      "enum": [ "degree", "diploma" ],
      "default": "diploma"
    }
  },
  "if": {
    "properties": {
      "education": { "const": "degree" }
    }
  },
  "then": {
    "properties": {
      "degree_certificate": {
        "type": "string",
        "default": "XXXXXX"
      }
    },
    "required": [ "degree_certificate" ]
  },
  "else": {
    "properties": {
      "diploma_certificate": {
        "type": "string",
        "default": "YYYYYY"
      }
    },
    "required": [ "diploma_certificate" ]
  }
}
{{</schema>}}

{{<instance-pass `An instance conforming to the schema is valid`>}}
{
  "name": "Doe",
  "qulaification": "degree",
  "degree_certificate": "XXYYZZ"
}
{{</instance-pass>}}

{{<instance-annotation>}}
[
  /// ...
  {
    "valid": true,
    "keywordLocation": "/properties/name/default",
    "instanceLocation": "",
    "annotation": "John"
  },
  {
    "valid": true,
    "keywordLocation": "/properties/education/default",
    "instanceLocation": "",
    "annotation": "diploma"
  },
  {
    "valid": true,
    "keywordLocation": "/then/properties/degree_certificate/default",
    "instanceLocation": "",
    "annotation": "XXXXXX",
  },
  // ...
]
{{</instance-annotation>}}

{{<schema `Schema with multiple annotations for the same instance`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "default": "John",
  "$ref": "#/$defs/name",
  "$defs": {
    "name": {
      "default": "John",
      "type": "string"
    }
  }
}
{{</schema>}}

{{<instance-pass `A string instance is valid`>}}
"Doe"
{{</instance-pass>}}

{{<instance-annotation>}}
[
  // ...
  {
    "valid": true,
    "keywordLocation": "/default",
    "instanceLocation": "",
    "annotation": "John"
  },
  {
    "valid": true,
    "keywordLocation": "/$ref/default",
    "instanceLocation": "",
    "annotation": "John"
  },
  // ...
]
{{</instance-annotation>}}