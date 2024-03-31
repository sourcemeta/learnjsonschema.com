---
keyword: "contentEncoding"
signature: "String"
summary: "The string instance should be interpreted as encoded binary data and decoded using the encoding named by this property."
kind: [ "annotation" ]
instance: [ "string" ]
specification: "https://json-schema.org/draft/2020-12/json-schema-validation.html#section-8.3"
metaschema: "https://json-schema.org/draft/2020-12/meta/content"
introduced_in: draft7
related:
  - vocabulary: content
    keyword: contentMediaType
  - vocabulary: content
    keyword: contentSchema
---

Annotations
-----------

This keyword produces the content encoding name as the annotation value.

## Explanation

The `contentEncoding` keyword is an annotation used to specify the encoding used to store the contents of a string, particularly when it represents binary data. It indicates how the string value should be interpreted and decoded. This keyword is not directly involved in the validation process but provides metadata about the content.

* The value of this property must be a string.
* `contentEncoding` doesn't enforce strict validation. However, it's recommended to use it correctly to ensure compatibility with applications that might interpret the encoding.
* It represents the type of binary encoding used for the string under question. Common encodings include base16, base32, and base64, as defined in [RFC 4648](https://www.rfc-editor.org/info/rfc4686).
* While the JSON Schema specification doesn't publish a predefined list of possible encodings, it's recommended to follow standard names such as those defined in [RFC 4648](https://www.rfc-editor.org/info/rfc4686). This ensures interoperability and clarity across implementations.

## Examples

{{<schema>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "contentEncoding": "base64"
}
{{</schema>}}

{{<instance-pass `A properly encoded base64 string is valid`>}}
"SGVsbG8gV29ybGQ="    // --> Hello World (base64 encoded)
{{</instance-pass>}}

{{<instance-pass `An incorrectly encoded base64 string is also valid`>}}
"eyJmb28iOi%iYmFyIn0K"
{{</instance-pass>}}

{{<instance-pass `'contentEncoding' is irrelevant for instances with values other than strings`>}}
[ "foo", "bar" ]
{{</instance-pass>}}

{{<instance-annotation>}}
{
  "valid": true,
  "keywordLocation": "/",
  "instanceLocation": "",
  "annotations": {
    "contentEncoding": "base64"
  }
}
{{</instance-annotation>}}