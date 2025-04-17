---
keyword: "title"
signature: "String"
value: This keyword must be set to a string
summary: "A preferably short description about the purpose of the instance described by the schema."
kind: [ "annotation" ]
instance: [ "any" ]
specification: "https://json-schema.org/draft/2020-12/json-schema-validation.html#section-9.1"
metaschema: "https://json-schema.org/draft/2020-12/meta/meta-data"
index: -9999
introduced_in: draft1
annotation:
   description: The title set by this keyword
   kind: [ "string" ]
related:
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
  - vocabulary: meta-data
    keyword: deprecated
---

The `title` keyword is a placeholder for a concise human-readable string
summary of what a schema or any of its subschemas are about. This keyword does
not affect validation, but the evaluator will collect its value as an
annotation.

{{<best-practice>}}

We heavily recommend to declare this keyword at the top level of every schema,
as a human-readable introduction to what the schema is about.

When doing so, note that the JSON Schema specification does not impose or
recommend a maximum length for this keyword. However, it is common practice to
stick to [Git commit message
title](https://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html)
conventions and set it to a capitalised string of *50 characters or less*. If
you run out of space, you can move the additional information to the
[`description`]({{< ref "2020-12/meta-data/description" >}}) keyword.

{{</best-practice>}}

{{<common-pitfall>}}

Tooling makers must be careful when statically traversing schemas in search of
occurences of this keyword. It is possible for schemas to make use of this
keyword behind conditional operators, references, or any other type of keyword
that makes it hard or even impossible to correctly locate these values without
fully evaluating the schema against an instance. The only bullet proof method
is through annotation collection.

{{</common-pitfall>}}

{{<metaschema-check-type `string`>}}

## Examples

{{<schema `A schema that declares a top level title`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "Even Number",
  "type": "number",
  "multipleOf": 2
}
{{</schema>}}

{{<instance-pass `An even number value is valid and annotations are emitted`>}}
10
{{</instance-pass>}}

{{<instance-annotation>}}
{ "keyword": "/title", "instance": "", "value": "Even number" }
{{</instance-annotation>}}

{{<instance-fail `An odd number value is invalid no annotations are emitted`>}}
7
{{</instance-fail>}}

{{<schema `A schema that declares conditional refined titles for the same instance location`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "Number",
  "type": "number",
  "if": { "multipleOf": 2 },
  "then": { "title": "Even Number" },
  "else": { "title": "Odd Number" }
}
{{</schema>}}

{{<instance-pass `An even number value is valid and both the top level and even annotations are emitted`>}}
10
{{</instance-pass>}}

{{<instance-annotation>}}
{ "keyword": "/title", "instance": "", "value": "Number" }
{ "keyword": "/then/title", "instance": "", "value": "Even Number" }
{{</instance-annotation>}}

{{<instance-pass `An odd number value is valid and both the top level and odd annotations are emitted`>}}
7
{{</instance-pass>}}

{{<instance-annotation>}}
{ "keyword": "/title", "instance": "", "value": "Number" }
{ "keyword": "/else/title", "instance": "", "value": "Odd Number" }
{{</instance-annotation>}}

{{<instance-fail `A non-number value is invalid no annotations are emitted`>}}
"Hello World"
{{</instance-fail>}}
