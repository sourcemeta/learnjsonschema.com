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

The `$comment` keyword provides a way to add descriptive comments to schema elements. These comments are meant for human readers and are ignored by validation processes. It's a useful feature for documenting the purpose or usage of particular parts of a schema.

* The value of this keyword must be a string.
* It can be placed anywhere within a JSON Schema to provide additional context or explanation.

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