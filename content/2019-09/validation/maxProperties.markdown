---
keyword: "maxProperties"
signature: "Integer"
value: This keyword must be set to a zero or positive integer
summary: "An object instance is valid if its number of properties is less than, or equal to, the value of this keyword."
kind: [ "assertion" ]
instance: [ "object" ]
specification: "https://json-schema.org/draft/2019-09/draft-handrews-json-schema-validation-02#rfc.section.6.5.1"
metaschema: "https://json-schema.org/draft/2019-09/meta/validation"
tests:
  - draft2019-09/maxProperties.json
index: -99
introduced_in: draft4
related:
  - vocabulary: validation
    keyword: minProperties
  - vocabulary: applicator
    keyword: properties
  - vocabulary: applicator
    keyword: patternProperties
  - vocabulary: applicator
    keyword: additionalProperties
---

The [`maxProperties`]({{< ref "2019-09/validation/maxproperties" >}}) keyword restricts object instances to consists of an
inclusive maximum numbers of properties.

{{<common-pitfall>}} The presence of this keyword does not depend on the
presence of the [`properties`]({{< ref "2019-09/applicator/properties" >}})
keyword.  {{</common-pitfall>}}

{{<best-practice>}}To restrict object instances to the empty object, prefer
using the [`const`]({{< ref "2019-09/validation/const" >}}) keyword instead of
setting this keyword to `0`. {{</best-practice>}}

{{<constraint-warning `object`>}}

## Examples

{{<schema `A schema that constrains object instances to define at most 2 properties`>}}
{
  "$schema": "https://json-schema.org/draft/2019-09/schema",
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
