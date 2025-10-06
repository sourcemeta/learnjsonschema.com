---
keyword: "contentEncoding"
signature: "String"
value: This keyword should be set to a standard (to increase interoperability) encoding name such as those defined in [RFC 4648](https://www.rfc-editor.org/info/rfc4648) and [RFC 2045](https://www.rfc-editor.org/info/rfc2045.html)
summary: "The string instance should be interpreted as encoded binary data and decoded using the encoding named by this property."
kind: [ "annotation" ]
instance: [ "string" ]
specification: "https://json-schema.org/draft/2019-09/draft-handrews-json-schema-validation-02#rfc.section.8.3"
metaschema: "https://json-schema.org/draft/2019-09/meta/content"
tests:
  - draft2019-09/content.json
introduced_in: draft7
annotation:
   description: The content encoding name set by this keyword
   kind: [ "string" ]
related:
  - vocabulary: content
    keyword: contentMediaType
  - vocabulary: content
    keyword: contentSchema
---

The `contentEncoding` keyword signifies that a string instance value (such as a
specific object property) should be considered binary data serialised using the
given encoding. This keyword does not affect validation, but the evaluator will
collect its value as an annotation.  The use of this and related keywords is a
common technique to encode and describe arbitrary binary data (such as image,
audio, and video) in JSON.

{{<best-practice>}}

It is recommended to set this keyword along with the [`contentMediaType`]({{<
ref "2019-09/content/contentmediatype" >}}) keyword to declare the type of data
being encoded (for example, an image in PNG format). Otherwise, the receiver
must treat the instance value as a binary blob without knowing for sure the
type of information it represents.

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
[`Content-Transfer-Encoding`](https://www.rfc-editor.org/rfc/rfc2045.html#section-6)
MIME header used in conjunction with the
[`Content-Type`](https://www.rfc-editor.org/rfc/rfc2045.html#section-5) header
to transmit non-ASCII data over e-mail. For example, if you send a PNG image as
an e-mail attachment, your e-mail client will likely send a multipart message
that includes the Base64-encoded image, sets the
[`Content-Transfer-Encoding`](https://www.rfc-editor.org/rfc/rfc2045.html#section-6)
header to
[`base64`](https://datatracker.ietf.org/doc/html/rfc2045#section-6.1), and sets
the [`Content-Type`](https://www.rfc-editor.org/rfc/rfc2045.html#section-5)
header to
[`image/png`](https://www.iana.org/assignments/media-types/image/png).

{{</learning-more>}}

[RFC 4648](https://datatracker.ietf.org/doc/html/rfc4648) _(The Base16, Base32,
and Base64 Data Encodings)_ and [RFC
2045](https://datatracker.ietf.org/doc/html/rfc2045) _(Format of Internet
Message Bodies)_ define the following standard encodings. In the interest of
interoperability, avoid defining new content encodings.  While the JSON Schema
specification does not provide explicit guidance on this, [RFC 2045 Section
6.3](https://datatracker.ietf.org/doc/html/rfc2045#section-6.3) suggests that
if a custom content encoding is really needed, it must be prefixed with `x-`.
For example, `x-my-new-encoding`.

| Encoding   | Description                                                                                     | Reference |
|------------|-------------------------------------------------------------------------------------------------|-----------|
| `"base64"` | Encoding scheme using a 64-character hexadecimal alphabet | [RFC 4648 Section 4](https://datatracker.ietf.org/doc/html/rfc4648#section-4) |
| `"base32"` | Encoding scheme using a 32-character hexadecimal alphabet                                   | [RFC 4648 Section 6](https://datatracker.ietf.org/doc/html/rfc4648#section-6) |
| `"base16"` | Encoding scheme using a 16-character hexadecimal alphabet                       | [RFC 4648 Section 8](https://datatracker.ietf.org/doc/html/rfc4648#section-8) |
| `"7bit"` | Encoding scheme that constrains ASCII to disallow octets greater than 127, disallow `NUL`, and restricts `CR` and `LF` to `CRLF` sequences | [RFC 2045 Section 2.7](https://datatracker.ietf.org/doc/html/rfc2045#section-2.7) |
| `"8bit"` | Encoding scheme that constrains ASCII to permit octets greater than 127, disallow `NUL`, and restrict `CR` and `LF` to `CRLF` sequences | [RFC 2045 Section 2.8](https://datatracker.ietf.org/doc/html/rfc2045#section-2.8) |
| `"binary"` | Encoding scheme where any sequence of octets is allowed | [RFC 2045 Section 2.9](https://datatracker.ietf.org/doc/html/rfc2045#section-2.9) |
| `"quoted-printable"` | Encoding scheme that preserves ASCII printable characters and escapes the rest using a simple algorithm based on an hexadecimal alphabet | [RFC 2045 Section 6.7](https://datatracker.ietf.org/doc/html/rfc2045#section-6.7) |

{{<constraint-warning `string`>}}

## Examples

{{<schema `A schema that describes arbitrary data encoded using Base 64`>}}
{
  "$schema": "https://json-schema.org/draft/2019-09/schema",
  "contentEncoding": "base64"
}
{{</schema>}}

{{<instance-pass `A string value encoded in Base 64 is valid and an annotation is emitted`>}}
"SGVsbG8gV29ybGQ=" // Hello World
{{</instance-pass>}}

{{<instance-annotation>}}
{ "keyword": "/contentEncoding", "instance": "", "value": "base64" }
{{</instance-annotation>}}

{{<instance-pass `A string value that does not represent a Base 64 encoded value is valid and an annotation is still emitted`>}}
"This is not Base 64"
{{</instance-pass>}}

{{<instance-annotation>}}
{ "keyword": "/contentEncoding", "instance": "", "value": "base64" }
{{</instance-annotation>}}

{{<instance-pass `A non-string value is valid but no annotations are emitted`>}}
1234
{{</instance-pass>}}
