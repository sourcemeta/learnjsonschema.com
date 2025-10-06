---
keyword: "contentMediaType"
signature: "String"
value: This keyword should be set to a valid media type as defined in [RFC 2046](https://www.rfc-editor.org/rfc/rfc2046.html), like the registered [IANA](https://www.iana.org/assignments/media-types/media-types.xhtml) media types
summary: "This keyword declares the media type of the string instance."
kind: [ "annotation" ]
instance: [ "string" ]
specification: "https://json-schema.org/draft/2019-09/draft-handrews-json-schema-validation-02#rfc.section.8.4"
metaschema: "https://json-schema.org/draft/2019-09/meta/content"
tests:
  - draft2019-09/content.json
introduced_in: draft7
annotation:
   description: The content media type set by this keyword
   kind: [ "string" ]
affects:
  - vocabulary: content
    keyword: contentSchema
related:
  - vocabulary: content
    keyword: contentEncoding
---

When the [`contentEncoding`]({{< ref "2020-12/content/contentencoding" >}})
keyword is set, the `contentMediaType` keyword signifies that a string instance
value (such as a specific object property) should be considered binary data
that represents the given type. This keyword does not affect validation, but
the evaluator will collect its value as an annotation.  The use of this and
related keywords is a common technique to encode and describe arbitrary binary
data (such as image, audio, and video) in JSON.

{{<best-practice>}}

It is recommended to set this keyword along with the [`contentEncoding`]({{<
ref "2020-12/content/contentencoding" >}}) keyword to declare the encoding used
to serialised the data (for example, Base 64 encoding).  Otherwise, the
receiver must treat the instance value as a binary blob without knowing for
sure how to decode it.

{{</best-practice>}}

{{<common-pitfall>}}

The JSON Schema specification prohibits implementations, for security reasons,
from automatically attempting to decode, parse, or validate encoded data
without the consumer explicitly opting in to such behaviour. If you require
this feature, consult the documentation of your tooling of choice to see if it
supports content encoding/decoding and how to enable it.

{{</common-pitfall>}}

{{<learning-more>}}

This keyword is inspired by the
[`Content-Type`](https://www.rfc-editor.org/rfc/rfc2045.html#section-5) MIME
header used in conjunction with the
[`Content-Transfer-Encoding`](https://www.rfc-editor.org/rfc/rfc2045.html#section-6)
header to transmit non-ASCII data over e-mail. For example, if you send a PNG
image as an e-mail attachment, your e-mail client will likely send a multipart
message that includes the Base64-encoded image, sets the
[`Content-Type`](https://www.rfc-editor.org/rfc/rfc2045.html#section-5) header
to [`image/png`](https://www.iana.org/assignments/media-types/image/png), and
sets the
[`Content-Transfer-Encoding`](https://www.rfc-editor.org/rfc/rfc2045.html#section-6)
header to
[`base64`](https://datatracker.ietf.org/doc/html/rfc2045#section-6.1).

{{</learning-more>}}

The Internet Assigned Numbers Authority (IANA) standards organization is the
source of truth for the exhaustive official list of registered content media
types. You can find the complete list at
[https://www.iana.org/assignments/media-types/media-types.xhtml](https://www.iana.org/assignments/media-types/media-types.xhtml).

In the interest of interoperability, avoid using custom unregistered content
media types. If required, register a new content media type with the IANA
[here](https://www.iana.org/form/media-types).  Alternatively, [RFC 2046
Section 6](https://datatracker.ietf.org/doc/html/rfc2046#section-6) suggests
that if a custom unregistered content media type is really needed, it must live
within a registered category and prefixed with `x-`.  For example,
`application/x-my-custom-media-type`.

{{<constraint-warning `string`>}}

## Examples

{{<schema `A schema that describes HTML data encoded using Base 64`>}}
{
  "$schema": "https://json-schema.org/draft/2019-09/schema",
  "contentEncoding": "base64",
  "contentMediaType": "text/html"
}
{{</schema>}}

{{<instance-pass `A string value that represents a valid HTML document encoded in Base 64 is valid and an annotations are emitted`>}}
"PHA+SlNPTiBTY2hlbWE8L3A+" // <p>JSON Schema</p>
{{</instance-pass>}}

{{<instance-annotation>}}
{ "keyword": "/contentEncoding", "instance": "", "value": "base64" }
{ "keyword": "/contentMediaType", "instance": "", "value": "text/html" }
{{</instance-annotation>}}

{{<instance-pass `A string value that represents an invalid HTML document encoded in Base 64 is valid and an annotations are still emitted`>}}
"PFwvZm9v" // <\/foo
{{</instance-pass>}}

{{<instance-annotation>}}
{ "keyword": "/contentEncoding", "instance": "", "value": "base64" }
{ "keyword": "/contentMediaType", "instance": "", "value": "application/json" }
{{</instance-annotation>}}

{{<instance-pass `A non-string value is valid but no annotations are emitted`>}}
1234
{{</instance-pass>}}
