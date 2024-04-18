---
keyword: "contentSchema"
signature: "Schema"
summary: "This keyword declares a schema which describes the structure of the string."
kind: [ "annotation" ]
instance: [ "string" ]
specification: "https://json-schema.org/draft/2020-12/json-schema-validation.html#section-8.5"
metaschema: "https://json-schema.org/draft/2020-12/meta/content"
introduced_in: 2019-09
interdependencies:
  - vocabulary: content
    keyword: contentMediaType
related:
  - vocabulary: content
    keyword: contentEncoding
---

Annotations
-----------

This keyword produces the content schema as the annotation value.

## Explanation

The `contentSchema` keyword allows you to specify a schema that describes the structure of the content within a string instance, particularly when used in conjunction with the `contentMediaType` keyword. This is useful when the string instance contains data conforming to a specific media type, such as JSON, XML, or plain text, and you want to define a schema for that content.

However, it's important to note that `contentSchema` is merely an annotation and is not directly involved in the validation process. Instead, applications that consume JSON Schemas must use this information as they see fit. If a `contentMediaType` is provided, the `contentSchema` should be a valid JSON Schema, but it should be ignored if `contentMediaType` is absent.

* `contentSchema` is provided as additional metadata within the JSON Schema. It doesn't validate the content against the schema; it's up to consuming applications to utilize this information for validation or other purposes.
* Applications utilizing JSON Schemas are expected to use the provided `contentSchema` to validate content if applicable. If a schema is provided but does not match the content structure, it should be considered an error.
* If the instance is a binary string representing a JSON document (specified by `contentEncoding`), then `contentSchema` defines the JSON Schema that applies to the resulting document.

## Examples

{{<schema `Schema with 'contentSchema', 'contentMediaType' and 'contentEncoding' keyword`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "contentMediaType": "application/json",
  "contentEncoding": "base64",
  "contentSchema": {
    "type": "object",
    "properties": {
      "name": { "type": "string" }
    },
    "required": [ "name" ]
  }
}
{{</schema>}}

{{<instance-pass `An instance with a properly stringified JSON document encoded in base64 is valid`>}}
"eyAibmFtZSI6ICJKb2huIERvZSIgfQ=="    // --> { "name": "John Doe" }
{{</instance-pass>}}

{{<instance-pass `A validly-encoded invalid JSON document is also valid`>}}
"eyAibmFtZSI6IH0="    // --> { "name": }
{{</instance-pass>}}

{{<instance-pass `An instance with non string value is ignored`>}}
true
{{</instance-pass>}}

{{<instance-annotation>}}
{
  "valid": true,
  "keywordLocation": "/",
  "instanceLocation": "",
  "annotations": {
    "contentEncoding": "base64",
    "contentMediaType": "application/json",
    "contentSchema": {
      "type": "object",
      "properties": {
        "name": { "type": "string" }
      },
      "required": [ "name" ]
    }
  }
}
{{</instance-annotation>}}