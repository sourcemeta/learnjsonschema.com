---
keyword: "contains"
signature: "Schema"
value: This keyword must be set to a valid JSON Schema
summary: "Validation succeeds if the instance contains an element that validates against this schema."
kind: [ "applicator", "annotation" ]
instance: [ "array" ]
specification: "https://json-schema.org/draft/2020-12/json-schema-core.html#section-10.3.1.3"
metaschema: "https://json-schema.org/draft/2020-12/meta/applicator"
tests:
  - draft2020-12/contains.json
default:
  value: "{}"
introduced_in: draft6
annotation:
   description: A potentially empty array of the indexes to which this keyword's subschema validated successfully to (in ascending order), or a boolean true if it applied to every item of the instance
   kind: [ "array", "boolean" ]
interdependencies:
  - vocabulary: validation
    keyword: minContains
  - vocabulary: validation
    keyword: maxContains
related:
  - vocabulary: applicator
    keyword: prefixItems
  - vocabulary: applicator
    keyword: items
  - vocabulary: validation
    keyword: minItems
  - vocabulary: validation
    keyword: maxItems
  - vocabulary: validation
    keyword: uniqueItems
  - vocabulary: unevaluated
    keyword: unevaluatedItems
---

The  {{<keyword-link name="contains" >}} keyword is used to check if at least one element in an array instance validates against a specified sub-schema. It offers flexibility compared to  {{<keyword-link name="items" >}}, which requires all elements to adhere to a single schema.

An array instance is valid against  {{<keyword-link name="contains" >}} if at least one of its elements is valid against the given schema, except when  {{<keyword-link name="minContains" >}} is present and has a value of 0, in which case an array instance must be considered valid against the  {{<keyword-link name="contains" >}} keyword, even if none of its elements is valid against the given schema.

Similarly, if  {{<keyword-link name="maxContains" >}} is present alongside  {{<keyword-link name="contains" >}}, the instance will be considered valid as long as the number of elements successfully validating against the  {{<keyword-link name="contains" >}} subschema does not exceed the specified limit defined by  {{<keyword-link name="maxContains" >}}.

* For data validation,   {{<keyword-link name="items" >}} validates all array elements against a single schema,  {{<keyword-link name="prefixItems" >}} validates a fixed-length sequence at the array's beginning, and  {{<keyword-link name="contains" >}} checks for at least one element matching a schema anywhere in the array.
* The subschema must be applied to every array element, even after the first match has been found, to collect annotations for use by other keywords.

## Examples

{{<schema `Schema with 'contains' keyword`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "array",
  "contains": { "type": "number" }
}
{{</schema>}}

{{<instance-pass `An array instance with at least one item as a numeric value is valid`>}}
[ "foo", 3, false, [ "bar" ], -5 ]
{{</instance-pass>}}

{{<instance-annotation>}}
{ "keyword": "/contains", "instance": "", "value": [ 1, 4 ] }
{{</instance-annotation>}}

{{<instance-fail `An array instance containing no string value is invalid`>}}
[ "foo", true ]
{{</instance-fail>}}

{{<schema `Schema with 'contains' keyword`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "array",
  "contains": { "type": "string" }
}
{{</schema>}}

{{<instance-pass `An array instance with all items as string values is valid`>}}
[ "foo", "bar", "baz" ]
{{</instance-pass>}}

{{<instance-annotation>}}
{ "keyword": "/contains", "instance": "", "value": true }
{{</instance-annotation>}}
* _The annotation value is a boolean 'true' if the subschema successfully validates when applied to every index of the instance._
