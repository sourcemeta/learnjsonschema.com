---
keyword: "not"
signature: "Schema"
value: This keyword must be set to a valid JSON Schema
summary: "An instance is valid against this keyword if it fails to validate successfully against the schema defined by this keyword."
kind: [ "applicator" ]
instance: [ "any" ]
specification: "https://json-schema.org/draft/2020-12/json-schema-core.html#section-10.2.1.4"
metaschema: "https://json-schema.org/draft/2020-12/meta/applicator"
default:
  value: "false"
tests:
  - draft2020-12/not.json
index: -9997
introduced_in: draft4
related:
  - vocabulary: applicator
    keyword: allOf
  - vocabulary: applicator
    keyword: anyOf
  - vocabulary: applicator
    keyword: oneOf
  - vocabulary: applicator
    keyword: if
  - vocabulary: applicator
    keyword: then
  - vocabulary: applicator
    keyword: else
---

The {{<link keyword="not" vocabulary="applicator">}} keyword restricts
instances to fail validation against the given subschema. This keyword
represents a [logical negation](https://en.wikipedia.org/wiki/Negation) (NOT)
operation. In other words, the instance successfully validates against the
schema only if it does not match the given subschema.

{{<learning-more>}} After evaluating this keyword, any annotation emitted by
its subschema is discarded, independently of whether the subschema was
successful or not, as annotations are always discarded on failure. While this
might seem counter-intuitive, consider the following cases:

- If the subschema successfully validates against the instance, then the
  negation keyword itself fails and annotations are discarded
- If the subschema fails to validate against the instance, then annotations are
  discarded before bubbling up to the outer negation keyword
{{</learning-more>}}

{{<best-practice>}} Avoid the use of this keyword (usually negating the
[`required`]({{< ref "/2020-12/validation/required" >}}) keyword) to prohibit
specific object properties from being defined. Instead, use the
[`properties`]({{< ref "properties" >}}) keyword and set the disallowed object
properties to the `false` boolean schema.{{</best-practice>}}

This keyword is equivalent to the `!` operator found in most programming
languages. For example:

```c
bool valid = !not_schema;
```

## Examples

{{<schema `A schema that constrains instances to not be a specific value`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "not": {
    "title": "I will never be emitted as an annotation",
    "const": "Prohibited"
  }
}
{{</schema>}}

{{<instance-pass `A value that does not equal the prohibited value is valid and no annotation is emitted`>}}
"Hello World"
{{</instance-pass>}}

{{<instance-fail `A value that equals the prohibited value is invalid`>}}
"Prohibited"
{{</instance-fail>}}

{{<schema `A schema that negates an unsatisfiable schema matches every possible instance`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
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
