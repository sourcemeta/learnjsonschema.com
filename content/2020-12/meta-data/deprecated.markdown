---
keyword: "deprecated"
signature: "Boolean"
value: This keyword must be set to a boolean value
summary: "This keyword indicates that applications should refrain from using the declared property."
kind: [ "annotation" ]
instance: [ "any" ]
specification: "https://json-schema.org/draft/2020-12/json-schema-validation.html#section-9.3"
metaschema: "https://json-schema.org/draft/2020-12/meta/meta-data"
introduced_in: 2019-09
default:
  value: false
annotation:
   description: The boolean value set by this keyword
   kind: [ "boolean" ]
related:
  - vocabulary: meta-data
    keyword: title
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
---

The `deprecated` keyword is used to indicate that a particular property should not be used and may be removed in the future. It provides a warning to users or applications that certain parts of the schema or are no longer recommended for use.

* `deprecated` does not affect data validation but serves as an informative annotation.
* A true value suggests that applications should avoid using the deprecated property, and the property might be removed in future versions of the schema.

## Examples

{{<schema `Schema with 'deprecated' keyword`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "deprecated": true,
  "type": "number"
}
{{</schema>}}

{{<instance-pass `An instance with a numeric value is valid`>}}
45
{{</instance-pass>}}

{{<instance-annotation>}}
{
  "valid": true,
  "keywordLocation": "/deprecated",
  "instanceLocation": "",
  "annotation": true
}
{{</instance-annotation>}}

{{<schema `Schema with logical operators`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "properties": {
    "foo": { "type": "boolean" },
    "bar": { "type": "string" }
  },
  "if": {
    "properties": {
      "foo": { "const": true }
    }
  },
  "then": {
    "properties": {
      "bar": { "deprecated": true }
    }
  },
  "else": {
    "properties": {
      "bar": { "deprecated": false }
    }
  }
}
{{</schema>}}

{{<instance-pass>}}
{ "foo": false, "bar": "bar" }
{{</instance-pass>}}

{{<instance-annotation>}}
[
  /// ...
  {
    "valid": true,
    "keywordLocation": "/else/properties/bar/deprecated",
    "instanceLocation": "/bar",
    "annotation": false
  },
  // ...
]
{{</instance-annotation>}}

{{<instance-pass>}}
{ "foo": true, "bar": "bar" }
{{</instance-pass>}}

{{<instance-annotation>}}
[
  /// ...
  {
    "valid": true,
    "keywordLocation": "/then/properties/bar/deprecated",
    "instanceLocation": "/bar",
    "annotation": true
  },
  // ...
]
{{</instance-annotation>}}

{{<schema `Schema with multiple annotations for the same instance`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "deprecated": true,
  "$ref": "#/$defs/name",
  "$defs": {
    "name": {
      "deprecated": true,
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
    "keywordLocation": "/deprecated",
    "instanceLocation": "",
    "annotation": true
  },
  {
    "valid": true,
    "keywordLocation": "/$ref/deprecated",
    "instanceLocation": "",
    "annotation": true
  },
  // ...
]
{{</instance-annotation>}}
