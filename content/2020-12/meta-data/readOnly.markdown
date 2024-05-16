---
keyword: "readOnly"
signature: "Boolean"
value: This keyword must be set to a boolean value
summary: "This keyword indicates that the value of the instance is managed exclusively by the owning authority, and attempts by an application to modify the value of this property are expected to be ignored or rejected by that owning authority."
kind: [ "annotation" ]
instance: [ "any" ]
specification: "https://json-schema.org/draft/2020-12/json-schema-validation.html#section-9.4"
metaschema: "https://json-schema.org/draft/2020-12/meta/meta-data"
default:
  value: false
introduced_in: draft7
annotation:
   description: The boolean value set by this keyword
   kind: [ "boolean" ]
related:
  - vocabulary: meta-data
    keyword: writeOnly
  - vocabulary: meta-data
    keyword: title
  - vocabulary: meta-data
    keyword: description
  - vocabulary: meta-data
    keyword: examples
  - vocabulary: meta-data
    keyword: default
  - vocabulary: meta-data
    keyword: deprecated
target_version: "mvp"
---

## Explanation

The `readOnly` keyword is used to indicate that the value of a particular property is managed exclusively by the owning authority, and attempts by an application to modify the value of this property are expected to be ignored or rejected by that authority. It essentially means that the instance value should not be modified.

It's important to note that this keyword doesn't imply the schema itself is writable; schemas must be treated as immutable. Instead, the keyword specifies instances where read/write operation semantics are use case specific.

* `readOnly` does not affect data validation but serves as an informative annotation.

## Examples

{{<schema `Schema with 'readOnly' keyword`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "readOnly": true,
  "type": "number"
}
{{</schema>}}

{{<instance-pass `An instance with a numeric value is valid`>}}
45
{{</instance-pass>}}

{{<instance-annotation>}}
{
  "valid": true,
  "keywordLocation": "/readOnly",
  "instanceLocation": "",
  "annotation": true
}
{{</instance-annotation>}}

{{<schema `Schema with logical operators`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "if": {
    "properties": {
      "immutable": { "const": true }
    }
  },
  "then": {
    "readOnly": true
  },
  "else": {
    "readOnly": false
  }
}
{{</schema>}}

{{<instance-pass>}}
{ "immutable": false }
{{</instance-pass>}}

{{<instance-annotation>}}
[
  /// ...
  {
    "valid": true,
    "keywordLocation": "/else/readOnly",
    "instanceLocation": "",
    "annotation": false
  },
  // ...
]
{{</instance-annotation>}}

{{<instance-pass>}}
{ "immutable": true }
{{</instance-pass>}}

{{<instance-annotation>}}
[
  /// ...
  {
    "valid": true,
    "keywordLocation": "/then/readOnly",
    "instanceLocation": "",
    "annotation": true
  },
  // ...
]
{{</instance-annotation>}}

{{<schema `Schema with multiple annotations for the same instance`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "readOnly": true,
  "$ref": "#/$defs/name",
  "$defs": {
    "name": {
      "readOnly": true,
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
    "keywordLocation": "/readOnly",
    "instanceLocation": "",
    "annotation": true
  },
  {
    "valid": true,
    "keywordLocation": "/$ref/readOnly",
    "instanceLocation": "",
    "annotation": true
  },
  // ...
]
{{</instance-annotation>}}
