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

The `deprecated` keyword, when set to `true`, signifies that an instance value
(such as a specific object property) should not be used and may be removed or
rejected in the future. This keyword does not affect validation, but the
evaluator will collect its value as an annotation.

{{<best-practice>}}

Avoid setting this keyword to the default value `false`. If an instance value
is not considered to be deprecated, the best practice is to omit the use of
this keyword altogether. This prevents unnecessarily generating and collecting
an annotation that does not carry any additional meaning.

{{</best-practice>}}

{{<common-pitfall>}}

Tooling makers must be careful when statically traversing schemas in search of
occurences of this keyword. It is possible for schemas to make use of this
keyword behind conditional operators, references, or any other type of keyword
that makes it hard or even impossible to correctly locate these values without
fully evaluating the schema against an instance. The only bullet proof method
is through annotation collection.

For example, an instance property might only be deprecated under certain
conditions determined by a dynamic operator like [`anyOf`]({{< ref
"2020-12/applicator/anyof" >}}).

{{</common-pitfall>}}

## Examples

{{<schema `A schema that statically marks the city optional object property as deprecated`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "properties": {
    "country": { "type": "string" },
    "city": { "type": "string", "deprecated": true }
  }
}
{{</schema>}}

{{<instance-pass `An object value that defines the deprecated property is valid but an annotation is emitted`>}}
{ "country": "United Kingdom", "city": "London" }
{{</instance-pass>}}

{{<instance-annotation>}}
{ "keyword": "/properties/city/deprecated", "instance": "/city", "value": true }
{{</instance-annotation>}}

{{<instance-pass `An object value that does not define the deprecated property is valid and no annotation is emitted`>}}
{ "country": "United Kingdom" }
{{</instance-pass>}}

{{<instance-fail `An object value that does not match the schema is invalid and no annotations are emitted`>}}
{ "city": 1 }
{{</instance-fail>}}

{{<schema `A schema that dynamically marks the city optional object property as deprecated based on the presence of the country property`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "properties": {
    "country": { "type": "string" },
    "city": { "type": "string" }
  },
  "dependentSchemas": {
    "country": {
      "properties": { "city": { "deprecated": true } }
    }
  }
}
{{</schema>}}

{{<instance-pass `An object value that defines both properties is valid but an annotation is emitted`>}}
{ "country": "United Kingdom", "city": "London" }
{{</instance-pass>}}

{{<instance-annotation>}}
{ "keyword": "/dependentSchemas/country/properties/city/deprecated", "instance": "/city", "value": true }
{{</instance-annotation>}}

{{<instance-pass `An object value that only defines the city property is valid and no annotation is emitted`>}}
{ "city": "London" }
{{</instance-pass>}}

{{<instance-pass `An object value that only defines the country property is valid and no annotation is emitted`>}}
{ "country": "United Kingdom" }
{{</instance-pass>}}

{{<instance-fail `An object value that does not match the schema is invalid and no annotations are emitted`>}}
{ "city": 1 }
{{</instance-fail>}}
