---
keyword: "writeOnly"
signature: "Boolean"
summary: "This keyword indicates that the value is never present when the instance is retrieved from the owning authority."
kind: [ "annotation" ]
instance: [ "any" ]
specification: "https://json-schema.org/draft/2020-12/json-schema-validation.html#section-9.4"
metaschema: "https://json-schema.org/draft/2020-12/meta/meta-data"
introduced_in: draft7
related:
  - vocabulary: meta-data
    keyword: readOnly
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
---

Annotations
-----------

This keyword produces the annotation value `true` if the keyword is set to `true`, or `false` otherwise.

## Explanation

the `writeOnly` keyword is used to indicate that an instance value should be writable, but it won't be included when the instance is retrieved from the owning authority. It's important to note that this doesn't imply the schema itself is writable; schemas must be treated as immutable. Instead, the keyword specifies instances where read/write operation semantics are use case specific.

* The value of this keyword must be a boolean.
* `writeOnly` does not affect data validation but serves as an informative annotation.
* Omitting this keyword has the same behavior as a value of false.

## Examples

{{<schema `Schema with 'writeOnly' keyword`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "writeOnly": true,
  "type": "number"
}
{{</schema>}}

{{<instance-pass `An instance with a numeric value is valid`>}}
45
{{</instance-pass>}}

{{<instance-annotation>}}
{
  "valid": true,
  "keywordLocation": "/writeOnly",
  "instanceLocation": "",
  "annotation": true
}
{{</instance-annotation>}}

{{<schema `Schema with logical operators`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "if": {
    "properties": {
      "sensitive": { "const": true }
    }
  },
  "then": {
    "writeOnly": true
  },
  "else": {
    "writeOnly": false
  }
}
{{</schema>}}

{{<instance-pass>}}
{ "sensitive": false }
{{</instance-pass>}}

{{<instance-annotation>}}
[
  /// ...
  {
    "valid": true,
    "keywordLocation": "/else/writeOnly",
    "instanceLocation": "",
    "annotation": false
  },
  // ...
]
{{</instance-annotation>}}

{{<instance-pass>}}
{ "sensitive": true }
{{</instance-pass>}}

{{<instance-annotation>}}
[
  /// ...
  {
    "valid": true,
    "keywordLocation": "/then/writeOnly",
    "instanceLocation": "",
    "annotation": true
  },
  // ...
]
{{</instance-annotation>}}

{{<schema `Schema with multiple annotations for the same instance`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "writeOnly": true,
  "$ref": "#/$defs/name",
  "$defs": {
    "name": {
      "writeOnly": true,
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
    "keywordLocation": "/writeOnly",
    "instanceLocation": "",
    "annotation": true
  },
  {
    "valid": true,
    "keywordLocation": "/$ref/writeOnly",
    "instanceLocation": "",
    "annotation": true
  },
  // ...
]
{{</instance-annotation>}}