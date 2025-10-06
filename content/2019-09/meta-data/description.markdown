---
keyword: "description"
signature: "String"
value: This keyword must be set to a string
summary: "An explanation about the purpose of the instance described by the schema."
kind: [ "annotation" ]
instance: [ "any" ]
specification: "https://json-schema.org/draft/2019-09/draft-handrews-json-schema-validation-02#rfc.section.9.1"
metaschema: "https://json-schema.org/draft/2019-09/meta/meta-data"
index: -999
introduced_in: draft1
annotation:
   description: The description set by this keyword
   kind: [ "string" ]
related:
  - vocabulary: meta-data
    keyword: title
  - vocabulary: meta-data
    keyword: examples
  - vocabulary: meta-data
    keyword: default
  - vocabulary: meta-data
    keyword: readOnly
  - vocabulary: meta-data
    keyword: writeOnly
  - vocabulary: meta-data
    keyword: deprecated
---

The [`description`]({{< ref "2019-09/meta-data/description" >}}) keyword is a placeholder for a longer human-readable string
summary of what a schema or any of its subschemas are about. This keyword does
not affect validation, but the evaluator will collect its value as an
annotation.

{{<best-practice>}}

We heavily recommend to declare this keyword at the top level of every schema,
as a human-readable longer description of what the schema is about.
Note that this keyword is meant to be to be used in conjunction with the
[`title`]({{< ref "2019-09/meta-data/title" >}}) keyword. The idea is to
augment the short summary with a longer description, and not to avoid the
concise summary altogether.

{{</best-practice>}}

{{<common-pitfall>}}

Tooling makers must be careful when statically traversing schemas in search of
occurrences of this keyword. It is possible for schemas to make use of this
keyword behind conditional operators, references, or any other type of keyword
that makes it hard or even impossible to correctly locate these values without
fully evaluating the schema against an instance. The only bullet proof method
is through annotation collection.

{{</common-pitfall>}}

## Examples

{{<schema `A schema that declares a top level description alongside a short title`>}}
{
  "$schema": "https://json-schema.org/draft/2019-09/schema",
  "title": "Even Number",
  "description": "This schema describes an even number",
  "type": "number",
  "multipleOf": 2
}
{{</schema>}}

{{<instance-pass `An even number value is valid and annotations are emitted`>}}
10
{{</instance-pass>}}

{{<instance-annotation>}}
{ "keyword": "/title", "instance": "", "value": "Even number" }
{ "keyword": "/description", "instance": "", "value": "This schema describes an even number" }
{{</instance-annotation>}}

{{<instance-fail `An odd number value is invalid and no annotations are emitted`>}}
7
{{</instance-fail>}}

{{<schema `A schema that declares conditional descriptions alongside a top level title`>}}
{
  "$schema": "https://json-schema.org/draft/2019-09/schema",
  "title": "Number",
  "type": "number",
  "if": { "multipleOf": 2 },
  "then": { "description": "This is an even number" },
  "else": { "description": "This is an odd number" }
}
{{</schema>}}

{{<instance-pass `An even number value is valid and the corresponding description annotation is emitted`>}}
10
{{</instance-pass>}}

{{<instance-annotation>}}
{ "keyword": "/title", "instance": "", "value": "Number" }
{ "keyword": "/then/description", "instance": "", "value": "This is an even number" }
{{</instance-annotation>}}

{{<instance-pass `An odd number value is valid and the corresponding description annotation is emitted`>}}
7
{{</instance-pass>}}

{{<instance-annotation>}}
{ "keyword": "/title", "instance": "", "value": "Number" }
{ "keyword": "/else/description", "instance": "", "value": "This is an odd number" }
{{</instance-annotation>}}

{{<instance-fail `A non-number value is invalid and no annotations are emitted`>}}
"Hello World"
{{</instance-fail>}}
