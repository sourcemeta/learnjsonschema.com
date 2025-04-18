---
keyword: "contentEncoding"
signature: "String"
value: This keyword should be set to a standard (to increase interoperability) encoding name such as those defined in [RFC 4648](https://www.rfc-editor.org/info/rfc4686) and [RFC 2045](https://www.rfc-editor.org/info/rfc2045.html)
summary: "The string instance should be interpreted as encoded binary data and decoded using the encoding named by this property."
kind: [ "annotation" ]
instance: [ "string" ]
specification: "https://json-schema.org/draft/2020-12/json-schema-validation.html#section-8.3"
metaschema: "https://json-schema.org/draft/2020-12/meta/content"
tests:
  - draft2020-12/content.json
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

The `contentEncoding` keyword signifies that an instance value (such as a
specific object property) should be considered binary data encoded into a JSON
string using the given encoding. This keyword does not affect validation, but
the evaluator will collect its value as an annotation.  The use of this and
related keywords is a common technique to encode and describe arbitrary binary
data (such as image, audio, and video) in JSON.

{{<best-practice>}}

It is recommended to set this keyword along with the [`contentMediaType`]({{<
ref "2020-12/content/contentmediatype" >}}) keyword to declare the type of data
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
RFC 2045 MIME header used to transmit non-ASCII data over e-mail. For example,
if you send a picture as an e-mail attachment, your e-mail client will likely
send a multipart message that includes the Base64-encoded representation of
such picture, while setting the `Content-Transfer-Encoding` header to `base64`.

{{</learning-more>}}

[RFC 2045](https://datatracker.ietf.org/doc/html/rfc2045) _(Format of Internet
Message Bodies)_ defines the following standard encodings. In the interest of
interoperability, avoid defining new content encodings.  While the JSON Schema
specification does not provide explicit guidance on this, [RFC 2045 Section
6.3](https://datatracker.ietf.org/doc/html/rfc2045#section-6.3) suggests that
if a custom content encoding is really needed, it must be prefixed with `x-`.
For example, `x-my-new-encoding`.

| Encoding   | Description                                                                                     | Reference |
|------------|-------------------------------------------------------------------------------------------------|-----------|
| `"7bit"` | Encoding scheme that constrains ASCII to disallow octets greater than 127, disallow `NUL`, and restricts `CR` and `LF` to `CRLF` sequences | [RFC 2045 Section 2.7](https://datatracker.ietf.org/doc/html/rfc2045#section-2.7) |
| `"8bit"` | Encoding scheme that constrains ASCII to permit octets greater than 127, disallow `NUL`, and restrict `CR` and `LF` to `CRLF` sequences | [RFC 2045 Section 2.8](https://datatracker.ietf.org/doc/html/rfc2045#section-2.8) |
| `"binary"` | Encoding scheme where any sequence of octets is allowed | [RFC 2045 Section 2.9](https://datatracker.ietf.org/doc/html/rfc2045#section-2.9) |
| `"quoted-printable"` | Encoding scheme that preserves ASCII printable characters and escapes the rest using a simple algorithm based on an hexadecimal alphabet | [RFC 2045 Section 6.7](https://datatracker.ietf.org/doc/html/rfc2045#section-6.7) |
| `"base64"` | Encoding scheme using a 64-character hexadecimal alphabet | [RFC 2045 Section 6.8](https://datatracker.ietf.org/doc/html/rfc2045#section-6.8) |

## Examples

{{<schema `Schema with 'contentEncoding' keyword`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "contentEncoding": "base64"
}
{{</schema>}}

{{<instance-pass `A properly encoded base64 string is valid`>}}
"SGVsbG8gV29ybGQ="    // --> Hello World (base64 encoded)
{{</instance-pass>}}

{{<instance-pass `An incorrectly encoded base64 string is also valid`>}}
"This is not base64 encoded!"
{{</instance-pass>}}

{{<instance-pass `'contentEncoding' is irrelevant for instances with values other than strings`>}}
[ "foo", "bar" ]
{{</instance-pass>}}

{{<instance-annotation>}}
{ "keyword": "/contentEncoding", "instance": "", "value": "base64" }
{{</instance-annotation>}}
