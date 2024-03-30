---
keyword: "$comment"
signature: "String"
summary: "This keyword reserves a location for comments from schema authors to readers or maintainers of the schema."
kind: [ "location" ]
instance: [ "any" ]
specification: "https://json-schema.org/draft/2020-12/json-schema-core.html#section-8.3"
metaschema: "https://json-schema.org/draft/2020-12/meta/core"
introduced_in: draft7
index: -9
---

The `$comment` keyword is used to provide a way for schema authors to include explanatory or clarifying comments within the schema itself. However, it's important to note that JSON Schema implementations are not required to attach any specific meaning or behavior to `$comment`, and they may even ignore or strip it out entirely. Therefore, `$comment` is primarily useful for leaving notes to future editors of the schema rather than communicating with users of the schema.

* The value of this keyword must be a string.
* Implementations ignore `$comment` during validation.
* It can be placed anywhere within a JSON Schema to provide additional context or explanation.
* Some tools might even remove this keywords for size optimization.

## Examples

{{<schema `Schema with '$comment' keyword`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "object",
  "properties": {
    "name": {
      "type": "string",
      "$comment": "This property stores the person's full name."
    },
    "age": {
      "type": "integer",
      "$comment": "Age must be a positive integer value."
    }
  }
}
{{</schema>}}

{{<instance-pass `Comments have no effect on validation`>}}
{
  "name": "John Doe",
  "age": 30
}
{{</instance-pass>}}

{{<instance-pass `Comments have no effect on validation`>}}
{
  "name": "John Doe",
  "age": -10
}
{{</instance-pass>}}
* _Although the 'age' property in the above instance does not adhere to the described comment, the instance is still considered valid._