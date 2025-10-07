---
keyword: "description"
signature: "String"
value: This keyword must be set to a string
summary: "An explanation about the purpose of the instance described by the schema."
kind: [ "annotation" ]
instance: [ "any" ]
specification: "https://json-schema.org/draft-06/draft-wright-json-schema-validation-01#rfc.section.7.2"
metaschema: "http://json-schema.org/draft-06/schema#"
introduced_in: draft1
index: 9995
related:
  - vocabulary: validation
    keyword: title
  - vocabulary: validation
    keyword: examples
  - vocabulary: validation
    keyword: default
---


The [`description`]({{< ref "draft6/validation/description" >}}) keyword is a
placeholder for a longer human-readable string summary of what a schema or any
of its subschemas are about. This keyword is merely descriptive and does not
affect validation.

{{<best-practice>}}

We heavily recommend to declare this keyword at the top level of every schema,
as a human-readable longer description of what the schema is about.
Note that this keyword is meant to be to be used in conjunction with the
[`title`]({{< ref "draft6/validation/title" >}}) keyword. The idea is to
augment the short summary with a longer description, and not to avoid the
concise summary altogether.

{{</best-practice>}}

{{<common-pitfall>}}

Tooling makers must be careful when statically traversing schemas in search of
occurrences of this keyword. It is possible for schemas to make use of this
keyword behind conditional operators, references, or any other type of keyword
that makes it hard or even impossible to correctly locate these values in all
cases.

{{</common-pitfall>}}

## Examples

{{<schema `A schema that declares a top level description alongside a short title`>}}
{
  "$schema": "http://json-schema.org/draft-06/schema#",
  "title": "Even Number",
  "description": "This schema describes an even number",
  "type": "number",
  "multipleOf": 2
}
{{</schema>}}

{{<instance-pass `An even number value is valid`>}}
10
{{</instance-pass>}}

{{<instance-fail `An odd number value is invalid`>}}
7
{{</instance-fail>}}

{{<schema `A schema that declares conditional descriptions alongside a top level title`>}}
{
  "$schema": "http://json-schema.org/draft-06/schema#",
  "title": "Number",
  "type": "number",
  "anyOf": [
    {
      "description": "This is an even number",
      "multipleOf": 2
    },
    {
      "description": "This is an odd number",
      "not": {
        "multipleOf": 2
      }
    }
  ]
}
{{</schema>}}

{{<instance-pass `An even number value is valid`>}}
10
{{</instance-pass>}}

{{<instance-pass `An odd number value is valid`>}}
7
{{</instance-pass>}}

{{<instance-fail `A non-number value is invalid`>}}
"Hello World"
{{</instance-fail>}}
