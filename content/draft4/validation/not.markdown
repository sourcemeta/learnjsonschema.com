---
keyword: "not"
signature: "Schema"
value: This keyword must be set to a valid JSON Schema
summary: "An instance is valid against this keyword if it fails to validate successfully against the schema defined by this keyword."
kind: [ "applicator" ]
instance: [ "any" ]
specification: "https://json-schema.org/draft-04/draft-fge-json-schema-validation-00#rfc.section.5.5.6"
metaschema: "http://json-schema.org/draft-04/schema#"
default:
  value: "false"
tests:
  - draft4/not.json
index: 9
introduced_in: draft4
related:
  - vocabulary: validation
    keyword: allOf
  - vocabulary: validation
    keyword: anyOf
  - vocabulary: validation
    keyword: oneOf
---


The [`not`]({{< ref "draft4/validation/not" >}}) keyword restricts
instances to fail validation against the given subschema. This keyword
represents a [logical negation](https://en.wikipedia.org/wiki/Negation) (NOT)
operation. In other words, the instance successfully validates against the
schema only if it does not match the given subschema.


{{<best-practice>}} Avoid the use of this keyword (usually negating the
[`required`]({{< ref "draft4/validation/required" >}}) keyword) to prohibit
specific object properties from being defined. Instead, use the
[`properties`]({{< ref "draft4/validation/properties" >}}) keyword and set
the disallowed object properties to the `false` boolean
schema.{{</best-practice>}}

This keyword is equivalent to the `!` operator found in most programming
languages. For example:

```c
bool valid = !not_schema;
```

## Examples

{{<schema `A schema that constrains instances to not be a specific value`>}}
{
  "$schema": "http://json-schema.org/draft-04/schema#",
  "not": {
    "const": "Prohibited"
  }
}
{{</schema>}}

{{<instance-pass `A value that does not equal the prohibited value is valid`>}}
"Hello World"
{{</instance-pass>}}

{{<instance-fail `A value that equals the prohibited value is invalid`>}}
"Prohibited"
{{</instance-fail>}}

{{<schema `A schema that negates an unsatisfiable schema matches every possible instance`>}}
{
  "$schema": "http://json-schema.org/draft-04/schema#",
  "not": {
    "type": "string",
    "minLength": 10,
    "maxLength": 9
  }
}
{{</schema>}}

{{<instance-pass `Any value is valid`>}}
"Hello World"
{{</instance-pass>}}
