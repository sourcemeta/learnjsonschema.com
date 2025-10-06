---
keyword: "minLength"
signature: "Integer"
value: This keyword must be set to a zero or positive integer
summary: "A string instance is valid against this keyword if its length is greater than, or equal to, the value of this keyword."
kind: [ "assertion" ]
instance: [ "string" ]
specification: "https://json-schema.org/draft/2020-12/json-schema-validation.html#section-6.3.2"
metaschema: "https://json-schema.org/draft/2020-12/meta/validation"
default:
  value: 0
tests:
  - draft2020-12/minLength.json
index: -9999
introduced_in: draft1
related:
  - vocabulary: validation
    keyword: maxLength
  - vocabulary: validation
    keyword: pattern
  - vocabulary: format-annotation
    keyword: format
---

The [`minLength`]({{< ref "2020-12/validation/minLength" >}}) keyword restricts string instances to consists of an inclusive
minimum number of [Unicode](https://unicode.org) code-points (logical
characters), which is not necessarily the same as the number of bytes in the
string.

{{<learning-more>}} While the [IETF RFC
8259](https://www.rfc-editor.org/rfc/rfc8259) JSON standard recommends the use
of [UTF-8](https://en.wikipedia.org/wiki/UTF-8), other Unicode encodings are
permitted. Therefore a JSON string may be represented in more bytes than its
number of code-points.

JSON Schema does not provide a mechanism to assert on the byte size of a JSON
string, as this is an implementation-dependent property of the JSON parser in
use.  {{</learning-more>}}

{{<constraint-warning `string`>}}

## Examples

{{<schema `A schema that constrains string instances to contain at least 3 code points`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "minLength": 3
}
{{</schema>}}

{{<instance-pass `A string value that consists of 3 code-points is valid`>}}
"foo"
{{</instance-pass>}}

{{<instance-pass `A string value that consists of more than 3 code-points is valid`>}}
"こんにちは"
{{</instance-pass>}}

{{<instance-fail `A string value that consists of less than 3 code-points is invalid`>}}
"hi"
{{</instance-fail>}}

{{<instance-pass `A non-string value is valid`>}}
55
{{</instance-pass>}}
