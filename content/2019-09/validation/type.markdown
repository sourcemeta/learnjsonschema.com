---
keyword: "type"
signature: "String | Array<String>"
value: This keyword must be set to either a string that corresponds to one of the supported types, or a *non-empty* array of unique strings that correspond to one of the supported types
summary: "Validation succeeds if the type of the instance matches the type represented by the given type, or matches at least one of the given types."
kind: [ "assertion" ]
instance: [ "any" ]
specification: "https://json-schema.org/draft/2019-09/draft-handrews-json-schema-validation-02#rfc.section.6.1.1"
metaschema: "https://json-schema.org/draft/2019-09/meta/validation"
default:
  value: "[ \"null\", \"boolean\", \"object\", \"array\", \"number\", \"string\" ]"
tests:
  - draft2019-09/type.json
introduced_in: draft1
changed_in:
  - draft6
  - draft4
index: -99999
---

The supported types are the following. Note that while the [ECMA
404](https://ecma-international.org/publications-and-standards/standards/ecma-404/)
JSON standard defines the JSON grammar without mention of encodings, the [IETF
RFC 8259](https://www.rfc-editor.org/rfc/rfc8259) JSON standard provides
specific guidance for JSON numbers and JSON strings which are documented in the
*Interoperable Encoding* column. Other encodings will likely not be accepted by
JSON parsers.

| Type        | Description                              | Interoperable Encoding                                                                                   |
|-------------|------------------------------------------|----------------------------------------------------------------------------------------------------------|
| `"null"`    | The JSON null constant                   | N/A                                                                                                      |
| `"boolean"` | The JSON true or false constants         | N/A                                                                                                      |
| `"object"`  | A JSON object                            | N/A                                                                                                      |
| `"array"`   | A JSON array                             | N/A                                                                                                      |
| `"number"`  | A JSON number                            | [IEEE 764](https://ieeexplore.ieee.org/document/8766229) 64-bit double-precision floating point encoding (except `NaN`, `Infinity`, and `+0`) |
| `"integer"` | A JSON number that represents an integer | 64-bit signed integer encoding (from `-(2^53)+1` to `(2^53)-1`)                                          |
| `"string"`  | A JSON string                            | [UTF-8](https://en.wikipedia.org/wiki/UTF-8) Unicode encoding                                            |

Note that while the JSON grammar does not distinguish between integer and real
numbers, JSON Schema provides the [`integer`]({{< ref
"2019-09/validation/type" >}}) logical type that matches either integers (such
as `2`), or real numbers where the fractional part is zero (such as `2.0`).
Additionally, numeric constructs inherent to floating point encodings (like
`NaN` and `Infinity`) are not permitted in JSON. However, the negative zero
(`-0`) is permitted.

{{<best-practice>}} To avoid interoperability issues, do not produce JSON
documents with numbers that exceed the [IETF RFC
8259](https://www.rfc-editor.org/rfc/rfc8259) limits described in the
*Interoperable Encodings* column of the table above.

If more numeric precision is required, consider representing numbers as JSON
strings or as multiple numbers. For example, fixed-precision real numbers can
be represented as an array of two integers for the integral and fractional
components.{{</best-practice>}}

{{<common-pitfall>}} The JavaScript programming language (and by extension
languages such as TypeScript) represent all numbers, including integers, using
the [IEEE 764](https://ieeexplore.ieee.org/document/8766229) floating-point
encoding. As a result, parsing JSON documents with integers beyond the 53-bit
range is prone to precision problems. Read [How numbers are encoded in
JavaScript](https://2ality.com/2012/04/number-encoding.html) by Dr. Axel
Rauschmayer for a more detailed overview of JavaScript's numeric
limitations.{{</common-pitfall>}}

{{<learning-more>}}JSON allows numbers to be represented in [scientific
exponential
notation](https://en.wikipedia.org/wiki/Scientific_notation#E_notation). For
example, numbers like `1.0e+28` (equivalent to 10000000000000000000000000000.0)
are valid according to the JSON grammar. This notation is convenient for
expressing long numbers. However, be careful with not accidentally exceeding
the interoperable limits described by the [IETF RFC
8259](https://www.rfc-editor.org/rfc/rfc8259) JSON
standard.{{</learning-more>}}

## Examples

{{< schema "A schema that describes numeric instances" >}}
{
  "$schema": "https://json-schema.org/draft/2019-09/schema",
  "type": "number"
}
{{< /schema >}}

{{< instance-pass "An integer is valid" >}}
42
{{< /instance-pass >}}

{{< instance-pass "A real number is valid" >}}
3.14
{{< /instance-pass >}}

{{< instance-pass "A number in scientific exponential notation is valid" >}}
1.0e+28
{{< /instance-pass >}}

{{< instance-fail "A string is not valid" >}}
"foo"
{{< /instance-fail >}}

{{< schema "A schema that describes boolean or array instances" >}}
{
  "$schema": "https://json-schema.org/draft/2019-09/schema",
  "type": [ "boolean", "array" ]
}
{{< /schema >}}

{{< instance-pass "The true boolean is valid" >}}
true
{{< /instance-pass >}}

{{< instance-fail "A number is invalid" >}}
1234
{{< /instance-fail >}}

{{< instance-pass "An arbitrary array is valid" >}}
[ 1, 2, 3 ]
{{< /instance-pass >}}

{{< schema "A schema that describes integer instances" >}}
{
  "$schema": "https://json-schema.org/draft/2019-09/schema",
  "type": "integer"
}
{{< /schema >}}

{{< instance-pass "An integer is valid" >}}
42
{{< /instance-pass >}}

{{< instance-pass "A real number with a zero fractional part is valid" >}}
3.0
{{< /instance-pass >}}

{{< instance-fail "A real number with a non-zero fractional part is invalid" >}}
3.14
{{< /instance-fail >}}
