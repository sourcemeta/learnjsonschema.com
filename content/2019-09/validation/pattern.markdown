---
keyword: "pattern"
signature: "String"
value: This keyword must be set to a regular expression, preferrably using the [ECMA-262](https://www.ecma-international.org/publications-and-standards/standards/ecma-262/) flavour
summary: "A string instance is considered valid if the regular expression matches the instance successfully."
kind: [ "assertion" ]
instance: [ "string" ]
specification: "https://json-schema.org/draft/2019-09/draft-handrews-json-schema-validation-02#rfc.section.6.3.3"
metaschema: "https://json-schema.org/draft/2019-09/meta/validation"
default:
  value: "\".*\""
tests:
  - draft2019-09/pattern.json
  - draft2019-09/optional/ecmascript-regex.json
  - draft2019-09/optional/non-bmp-regex.json
index: -9999
introduced_in: draft1
changed_in:
 - draft4
related:
  - vocabulary: format
    keyword: format
  - vocabulary: applicator
    keyword: patternProperties
---

The [`pattern`]({{< ref "2019-09/validation/pattern" >}}) keyword restricts
string instances to match the given regular expression.

{{<learning-more>}} While the specification suggests the use of
[ECMA-262](https://www.ecma-international.org/publications-and-standards/standards/ecma-262/)
regular expressions for interoperability purposes, the use of different
flavours like PCRE or POSIX (Basic or Extended) is permitted. Also, the
specification does not impose the use of any particular regular expression
flag. By convention (and somewhat enforced by the official JSON Schema test
suite), regular expressions are not implicitly
[anchored](https://www.regular-expressions.info/anchors.html) and are always
treated as case-sensitive. It is also common for the
[`DOTALL`](https://tc39.es/ecma262/multipage/text-processing.html#sec-get-regexp.prototype.dotAll)
flag to be enabled, permitting the dot character class to match new lines.

To avoid interoperability issues, stick to
[ECMA-262](https://www.ecma-international.org/publications-and-standards/standards/ecma-262/),
and don't assume the use of any regular expression flag.  {{</learning-more>}}

{{<common-pitfall>}} Regular expressions often make use of characters that need
to be escaped when making use of them as part of JSON strings. For example, the
*reverse solidus* character (more commonly known as the backslash character)
and the *double quote* character need to be escaped. Failure to do so will
result in an invalid JSON document. Applications to work with regular
expressions, like [Regex Forge](https://regexforge.com), typically provide
convenient functionality to copy a regular expression for use in JSON.
{{</common-pitfall>}}

{{<constraint-warning `string`>}}

## Examples

{{<schema `A schema that constrains string instances to look like e-mail addresses`>}}
{
  "$schema": "https://json-schema.org/draft/2019-09/schema",
  "pattern": "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$"
}
{{</schema>}}

{{<instance-pass `A string value that matches the regular expression is valid`>}}
"john.doe@example.com"
{{</instance-pass>}}

{{<instance-fail `A string value that does not match the regular expression is invalid`>}}
"foo"
{{</instance-fail>}}

{{<instance-pass `A non-string value is valid`>}}
1234
{{</instance-pass>}}
