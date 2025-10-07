---
keyword: "title"
signature: "String"
value: This keyword must be set to a string
summary: "A preferably short description about the purpose of the instance described by the schema."
kind: [ "annotation" ]
instance: [ "any" ]
specification: "https://json-schema.org/draft-04/draft-fge-json-schema-validation-00#rfc.section.6.1"
metaschema: "http://json-schema.org/draft-04/schema#"
introduced_in: draft1
index: 9994
related:
  - vocabulary: validation
    keyword: description
  - vocabulary: validation
    keyword: default
---


The [`title`]({{< ref "draft4/validation/title" >}}) keyword is a placeholder
for a concise human-readable string summary of what a schema or any of its
subschemas are about. This keyword is merely descriptive and does not affect
validation.

{{<best-practice>}}

We heavily recommend to declare this keyword at the top level of every schema,
as a human-readable introduction to what the schema is about.

When doing so, note that the JSON Schema specification does not impose or
recommend a maximum length for this keyword. However, it is common practice to
stick to [Git commit message
title](https://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html)
conventions and set it to a capitalised string of *50 characters or less*. If
you run out of space, you can move the additional information to the
[`description`]({{< ref "draft4/validation/description" >}}) keyword.

{{</best-practice>}}


## Examples

{{<schema `A schema that declares a top level title`>}}
{
  "$schema": "http://json-schema.org/draft-04/schema#",
  "title": "Even Number",
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

{{<schema `A schema that declares conditional refined titles for the same instance location`>}}
{
  "$schema": "http://json-schema.org/draft-04/schema#",
  "title": "Number",
  "type": "number",
  "anyOf": [
    {
      "title": "Even Number",
      "multipleOf": 2
    },
    {
      "title": "Odd Number",
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
