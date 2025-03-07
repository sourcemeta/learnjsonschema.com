---
keyword: "pattern"
signature: "String"
value: This keyword must be set to a valid [ECMA-262](https://www.ecma-international.org/publications-and-standards/standards/ecma-262/) regular expression
summary: "A string instance is considered valid if the regular expression matches the instance successfully."
kind: [ "assertion" ]
instance: [ "string" ]
specification: "https://json-schema.org/draft/2020-12/json-schema-validation.html#section-6.3.3"
metaschema: "https://json-schema.org/draft/2020-12/meta/validation"
default:
  value: "\".*\""
tests:
  - draft2020-12/pattern.json
  - draft2020-12/optional/ecmascript-regex.json
  - draft2020-12/optional/non-bmp-regex.json
index: -9999
introduced_in: draft1
changed_in:
 - draft4
related:
  - vocabulary: format-annotation
    keyword: format
  - vocabulary: applicator
    keyword: patternProperties
  - vocabulary: validation
    keyword: type
---

The `pattern` keyword restricts string instances to match the given
[ECMA-262](https://www.ecma-international.org/publications-and-standards/standards/ecma-262/)
regular expression. Making use of different regular expression flavours like
PCRE or POSIX (Basic or Extended) will likely introduce interoperability issues
and/or undefined behavior. Note that regular expressions set as values of this
keyword are not implicitly
[anchored](https://www.regular-expressions.info/anchors.html) and are always
treated as case-sensitive.

{{<common-pitfall>}} Regular expressions often make use of characters that need
to be escaped when making use of them as part of JSON strings. For example, the
*reverse solidus* character (more commonly known as the backslash character)
and the *double quote* character need to be escaped. Failure to do so will
result in an invalid JSON document.

Applications to work with regular expressions, like [Regex
Forge](https://regexforge.com), typically provide convenient functionality to
copy a regular expression for use in JSON.  {{</common-pitfall>}}

{{<constraint-warning `string`>}}

## Examples

{{<schema `A schema that constrains string instances look like e-mail addresses`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
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
