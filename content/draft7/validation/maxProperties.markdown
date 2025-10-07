---
keyword: "maxProperties"
signature: "Integer"
value: This keyword must be set to a zero or positive integer
summary: "An object instance is valid if its number of properties is less than, or equal to, the value of this keyword."
kind: [ "assertion" ]
instance: [ "object" ]
specification: "https://json-schema.org/draft-07/draft-handrews-json-schema-validation-01#rfc.section.6.5.1"
metaschema: "http://json-schema.org/draft-07/schema#"
tests:
  - draft7/maxProperties.json
introduced_in: draft4
index: -9
related:
  - vocabulary: validation
    keyword: minProperties
  - vocabulary: validation
    keyword: properties
  - vocabulary: validation
    keyword: patternProperties
  - vocabulary: validation
    keyword: additionalProperties
---

The [`maxProperties`]({{< ref "draft7/validation/maxproperties" >}}) keyword restricts object instances to consists of an
inclusive maximum numbers of properties.

{{<common-pitfall>}} The presence of this keyword does not depend on the
presence of the [`properties`]({{< ref "draft7/validation/properties" >}})
keyword.  {{</common-pitfall>}}

{{<best-practice>}}To restrict object instances to the empty object, prefer
using the [`const`]({{< ref "draft7/validation/const" >}}) keyword instead of
setting this keyword to `0`. {{</best-practice>}}

{{<constraint-warning `object`>}}

## Examples

{{<schema `A schema that constrains object instances to define at most 2 properties`>}}
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "maxProperties": 2
}
{{</schema>}}

{{<instance-fail `An object value with more than 2 properties is invalid`>}}
{ "foo": 1, "bar": 2, "baz": 3 }
{{</instance-fail>}}

{{<instance-pass `An object value with 2 properties is valid`>}}
{ "foo": 1, "bar": 2 }
{{</instance-pass>}}

{{<instance-pass `An object value with less than 2 properties is valid`>}}
{ "foo": 1 }
{{</instance-pass>}}

{{<instance-pass `A non-object value is valid`>}}
"Hello World"
{{</instance-pass>}}
