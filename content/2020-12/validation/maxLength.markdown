---
keyword: "maxLength"
signature: "Integer"
value: This keyword must be set to a zero or positive integer
summary: "A string instance is valid against this keyword if its length is less than, or equal to, the value of this keyword."
kind: [ "assertion" ]
instance: [ "string" ]
specification: "https://json-schema.org/draft/2020-12/json-schema-validation.html#section-6.3.1"
metaschema: "https://json-schema.org/draft/2020-12/meta/validation"
tests:
  - draft2020-12/maxLength.json
index: -9999
introduced_in: draft1
related:
  - vocabulary: validation
    keyword: minLength
  - vocabulary: validation
    keyword: pattern
  - vocabulary: format-annotation
    keyword: format
---

The [`maxLength`]({{< ref "2020-12/validation/maxLength" >}}) keyword restricts string instances to consists of an inclusive
maximum number of [Unicode](https://unicode.org) code-points (logical
characters), which is not necessarily the same as the number of bytes in the
string.

{{<learning-more>}} While the [IETF RFC
8259](https://www.rfc-editor.org/rfc/rfc8259) JSON standard recommends the use
of [UTF-8](https://en.wikipedia.org/wiki/UTF-8), other Unicode encodings are
permitted. Therefore a JSON string may be represented in up to 4x the number of
bytes as its number of code-points (assuming
[UTF-32](https://en.wikipedia.org/wiki/UTF-32) as the upper bound).

JSON Schema does not provide a mechanism to assert on the byte size of a JSON
string, as this is an implementation-dependent property of the JSON parser in
use.  {{</learning-more>}}

{{<common-pitfall>}} Be careful when making use of this keyword to
inadvertently assert on the byte length of JSON strings before inserting them
into byte-sensitive destinations like fixed-size buffers. Always assume that
the byte length of a JSON string can arbitrary larger that the number of
logical characters.{{</common-pitfall>}}

{{<best-practice>}}To restrict string instances to the empty string, prefer
using the [`const`]({{< ref "2020-12/validation/const" >}}) keyword instead of
setting this keyword to `0`. {{</best-practice>}}

{{<constraint-warning `string`>}}

## Examples

{{<schema `A schema that constrains string instances to contain at most 3 code points`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "maxLength": 3
}
{{</schema>}}

{{<instance-pass `A string value that consists of 3 code-points is valid`>}}
"foo"
{{</instance-pass>}}

{{<instance-fail `A string value that consists of more than 3 code-points is invalid`>}}
"こんにちは"
{{</instance-fail>}}

{{<instance-pass `A string value that consists of less than 3 code-points is valid`>}}
"hi"
{{</instance-pass>}}

{{<instance-pass `A non-string value is valid`>}}
55
{{</instance-pass>}}
