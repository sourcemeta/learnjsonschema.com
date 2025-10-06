---
keyword: "minProperties"
signature: "Integer"
value: This keyword must be set to a zero or positive integer
summary: "An object instance is valid if its number of properties is greater than, or equal to, the value of this keyword."
kind: [ "assertion" ]
instance: [ "object" ]
specification: "https://json-schema.org/draft/2019-09/draft-handrews-json-schema-validation-02#rfc.section.6.5.2"
metaschema: "https://json-schema.org/draft/2019-09/meta/validation"
default:
  value: 0
tests:
  - draft2019-09/minProperties.json
index: -99
introduced_in: draft4
related:
  - vocabulary: validation
    keyword: maxProperties
  - vocabulary: applicator
    keyword: properties
  - vocabulary: applicator
    keyword: patternProperties
  - vocabulary: applicator
    keyword: additionalProperties
---

The `minProperties` keyword restricts object instances to consists of an
inclusive minimum numbers of properties.

{{<common-pitfall>}} The presence of this keyword does not depend on the
presence of the [`properties`]({{< ref "2019-09/applicator/properties" >}})
keyword.  {{</common-pitfall>}}

{{<constraint-warning `object`>}}

## Examples

{{<schema `A schema that constrains object instances to define at least 2 properties`>}}
{
  "$schema": "https://json-schema.org/draft/2019-09/schema",
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
