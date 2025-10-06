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

When the [`contentMediaType`]({{< ref "2020-12/content/contentmediatype" >}})
keyword is set to a media type that adheres to the JSON data model (like JSON
itself, [YAML](https://yaml.org) or [UBJSON](https://ubjson.org)), the
[`contentSchema`]({{< ref "2020-12/content/contentSchema" >}}) keyword declares the schema that describes the corresponding
string instance value _after_ decoding it. This keyword does not affect
validation, but the evaluator will collect its value as an annotation.

{{<common-pitfall>}}

The JSON Schema specification prohibits implementations, for security reasons,
from automatically attempting to decode, parse, or validate encoded data
without the consumer explicitly opting in to such behaviour. If you require
this feature, consult the documentation of your tooling of choice to see if it
supports content encoding/decoding and how to enable it.

{{</common-pitfall>}}

{{<constraint-warning `string`>}}

## Examples

{{<schema `A schema that describes JSON object values encoded using Base 64`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "contentMediaType": "application/json",
  "contentEncoding": "base64",
  "contentSchema": { "type": "object" }
}
{{</schema>}}

{{<instance-pass `A string value that represents a valid JSON object encoded in Base 64 is valid and an annotations are emitted`>}}
"eyAibmFtZSI6ICJKb2huIERvZSIgfQ==" // { "name": "John Doe" }
{{</instance-pass>}}

{{<instance-annotation>}}
{ "keyword": "/contentMediaType", "instance": "", "value": "application/json" }
{ "keyword": "/contentEncoding", "instance": "", "value": "base64" }
{ "keyword": "/contentSchema", "instance": "", "value": { "type": "object" } }
{{</instance-annotation>}}

{{<instance-pass `A string value that represents an invalid JSON object encoded in Base 64 is valid and an annotations are still emitted`>}}
"eyAibmFtZSI6IH0=" // { "name": }
{{</instance-pass>}}

{{<instance-annotation>}}
{ "keyword": "/contentMediaType", "instance": "", "value": "application/json" }
{ "keyword": "/contentEncoding", "instance": "", "value": "base64" }
{ "keyword": "/contentSchema", "instance": "", "value": { "type": "object" } }
{{</instance-annotation>}}

{{<instance-pass `A string value that represents a valid JSON number encoded in Base 64 is valid and an annotations are still emitted`>}}
"MTIzNA==" // 1234
{{</instance-pass>}}

{{<instance-annotation>}}
{ "keyword": "/contentMediaType", "instance": "", "value": "application/json" }
{ "keyword": "/contentEncoding", "instance": "", "value": "base64" }
{ "keyword": "/contentSchema", "instance": "", "value": { "type": "object" } }
{{</instance-annotation>}}

{{<instance-pass `A non-string value is valid but no annotations are emitted`>}}
1234
{{</instance-pass>}}
