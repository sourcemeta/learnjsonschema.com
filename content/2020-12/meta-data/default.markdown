---
keyword: "default"
signature: "Any"
value: This keyword must be set to a JSON value, preferrably that successfully validates against the corresponding subschema
summary: "This keyword can be used to supply a default JSON value associated with a particular schema."
kind: [ "annotation" ]
instance: [ "any" ]
specification: "https://json-schema.org/draft/2020-12/json-schema-validation.html#section-9.2"
metaschema: "https://json-schema.org/draft/2020-12/meta/meta-data"
tests:
  - draft2020-12/default.json
introduced_in: draft1
annotation:
   description: The default value set by this keyword
   kind: [ "any" ]
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
target_version: "mvp"
---

## Explanation

The `default` keyword in JSON Schema is used to specify a default value for an instance. This value is not automatically used to fill in missing values during the validation process but can be used by tools such as documentation or form generators.

_**Note:** While it is recommended that the default value validate against its subschema, this requirement is not strictly enforced._

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
    "qualification": {
      "enum": [ "degree", "diploma" ],
      "default": "diploma"
    }
  },
  "if": {
    "properties": {
      "qualification": { "const": "degree" }
    }
  },
  "then": {
    "properties": {
      "degreeCertificate": {
        "type": "string",
        "default": "B0B8RKEZ90"
      }
    },
    "required": [ "degreeCertificate" ]
  },
  "else": {
    "properties": {
      "diplomaCertificate": {
        "type": "string",
        "default": "PW458C468E"
      }
    },
    "required": [ "diplomaCertificate" ]
  }
}
{{</schema>}}

{{<instance-pass `An instance conforming to the schema is valid`>}}
{
  "name": "Doe",
  "qualification": "degree",
  "degreeCertificate": "O5CYPZACTN"
}
{{</instance-pass>}}

{{<instance-annotation>}}
[
  /// ...
  {
    "valid": true,
    "keywordLocation": "/properties/name/default",
    "instanceLocation": "/name",
    "annotation": "John"
  },
  {
    "valid": true,
    "keywordLocation": "/properties/qualification/default",
    "instanceLocation": "/qualification",
    "annotation": "diploma"
  },
  {
    "valid": true,
    "keywordLocation": "/then/properties/degreeCertificate/default",
    "instanceLocation": "/degreeCertificate",
    "annotation": "B0B8RKEZ90",
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
