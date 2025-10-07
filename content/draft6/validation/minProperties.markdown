---
keyword: "minProperties"
signature: "Integer"
value: This keyword must be set to a zero or positive integer
summary: "An object instance is valid if its number of properties is greater than, or equal to, the value of this keyword."
kind: [ "assertion" ]
instance: [ "object" ]
specification: "https://json-schema.org/draft-06/draft-wright-json-schema-validation-01#rfc.section.6.16"
metaschema: "http://json-schema.org/draft-06/schema#"
default:
  value: 0
tests:
  - draft6/minProperties.json
introduced_in: draft4
index: -8
related:
  - vocabulary: validation
    keyword: maxProperties
  - vocabulary: validation
    keyword: properties
  - vocabulary: validation
    keyword: patternProperties
  - vocabulary: validation
    keyword: additionalProperties
---


The [`minProperties`]({{< ref "draft6/validation/minproperties" >}}) keyword restricts object instances to consists of an
inclusive minimum numbers of properties.

{{<common-pitfall>}} The presence of this keyword does not depend on the
presence of the [`properties`]({{< ref "draft6/validation/properties" >}})
keyword.  {{</common-pitfall>}}

{{<constraint-warning `object`>}}

## Examples

{{<schema `A schema that constrains object instances to define at least 2 properties`>}}
{
  "$schema": "http://json-schema.org/draft-06/schema#",
  "minProperties": 2
}
{{</schema>}}

{{<instance-pass `An object value with more than 2 properties is valid`>}}
{ "foo": 1, "bar": 2, "baz": 3 }
{{</instance-pass>}}

{{<instance-pass `An object value with 2 properties is valid`>}}
{ "foo": 1, "bar": 2 }
{{</instance-pass>}}

{{<instance-fail `An object value with less than 2 properties is invalid`>}}
{ "foo": 1 }
{{</instance-fail>}}

{{<instance-pass `A non-object value is valid`>}}
"Hello World"
{{</instance-pass>}}
