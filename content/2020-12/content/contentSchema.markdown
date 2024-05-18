---
keyword: "contentSchema"
signature: "Schema"
value: This keyword must be set to a valid JSON Schema
summary: "This keyword declares a schema which describes the structure of the string."
kind: [ "annotation" ]
instance: [ "string" ]
specification: "https://json-schema.org/draft/2020-12/json-schema-validation.html#section-8.5"
metaschema: "https://json-schema.org/draft/2020-12/meta/content"
default:
  value: "{}"
tests:
  - draft2020-12/content.json
introduced_in: 2019-09
annotation:
   description: The content schema set by this keyword
   kind: [ "object", "boolean" ]
interdependencies:
  - vocabulary: content
    keyword: contentMediaType
related:
  - vocabulary: content
    keyword: contentEncoding
---

The `contentSchema` keyword allows you to specify a schema that describes the structure of the content within a string instance, particularly when used in conjunction with the `contentMediaType` keyword. This is useful when the string instance contains data conforming to the JSON data model.

However, it's important to note that `contentSchema` is merely an annotation and is not directly involved in the validation process. Instead, applications that consume JSON Schemas must use this information as they see fit. `contentSchema` must be a valid JSON Schema, but it is ignored if `contentMediaType` is absent.

Applications utilizing JSON Schemas are expected to use the provided `contentSchema` to validate content if applicable. If a schema is provided but does not match the content structure, it should be considered an error.

## Examples

{{<schema `Schema with 'contentSchema', 'contentMediaType' and 'contentEncoding' keyword`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "contentMediaType": "application/json",
  "contentEncoding": "base64",
  "contentSchema": { "type": "object" }
}
{{</schema>}}

{{<instance-pass `An instance with a properly stringified JSON document encoded in base64 is valid`>}}
"eyAibmFtZSI6ICJKb2huIERvZSIgfQ=="    // --> { "name": "John Doe" }
{{</instance-pass>}}

{{<instance-pass `An encoded value that represents invalid JSON data is still valid`>}}
"eyAibmFtZSI6IH0="    // --> { "name": }
{{</instance-pass>}}

{{<instance-pass `A non-object instance is ignored`>}}
true
{{</instance-pass>}}

{{<instance-annotation>}}
{ "keyword": "/contentMediaType", "instance": "", "value": "application/json" }
{ "keyword": "/contentEncoding", "instance": "", "value": "base64" }
{ "keyword": "/contentSchema", "instance": "", "value": { "type": "object" } }
{{</instance-annotation>}}
