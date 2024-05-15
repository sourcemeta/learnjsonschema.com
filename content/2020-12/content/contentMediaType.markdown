---
keyword: "contentMediaType"
signature: "String"
summary: "This keyword declares the media type of the string instance."
kind: [ "annotation" ]
instance: [ "string" ]
specification: "https://json-schema.org/draft/2020-12/json-schema-validation.html#section-8.4"
metaschema: "https://json-schema.org/draft/2020-12/meta/content"
introduced_in: draft7
annotation:
   description: The content media type set by this keyword
   kind: [ "string" ]
related:
  - vocabulary: content
    keyword: contentEncoding
  - vocabulary: content
    keyword: contentSchema
---

## Explanation

The `contentMediaType` keyword in JSON Schema specifies the MIME type of the contents of a string. It is used to annotate the type of media contained within a string. It should be noted that:

* This keyword is purely an annotation and does not directly affect validation.
* It describes the media type of the binary string after it has been decoded as specified in `contentEncoding`.
* It is recommended to set `contentEncoding` if `contentMediaType` is declared.
* The value assigned to `contentMediaType` must be a valid IANA media type as described in [RFC 2046](https://www.rfc-editor.org/rfc/rfc2046.html).
* The list of all registered IANA media types can be found at [here](https://www.iana.org/assignments/media-types/media-types.xhtml).

## Examples

{{<schema `Schema with 'contentMediaType' and 'contentEncoding' keyword`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "contentEncoding": "base64",
  "contentMediaType": "application/json"
}
{{</schema>}}

{{<instance-pass `An instance with a properly stringified JSON document encoded in base64 is valid`>}}
"eyAibmFtZSI6ICJKb2huIERvZSIgfQ=="    // --> { "name": "John Doe" }
{{</instance-pass>}}

{{<instance-pass `An encoded value that represents invalid JSON data is still valid`>}}
"eyAibmFtZSI6IH0="    // --> { "name": }
{{</instance-pass>}}

{{<instance-pass `A non-string instance is ignored`>}}
true
{{</instance-pass>}}

{{<instance-annotation>}}
[
  // ...
  {
    "valid": true,
    "keywordLocation": "/contentEncoding",
    "instanceLocation": "",
    "annotation": "base64"
  },
  {
    "valid": true,
    "keywordLocation": "/contentMediaType",
    "instanceLocation": "",
    "annotation": "application/json"
  },
  // ...
]
{{</instance-annotation>}}
