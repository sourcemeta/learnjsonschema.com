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
related:
  - vocabulary: format-annotation
    keyword: format
  - vocabulary: applicator
    keyword: patternProperties
target_version: "mvp"
---

The `pattern` keyword in JSON Schema is designed to define a regular expression pattern that a string value within an instance must adhere to. This regular expression is specified as a string for the `pattern` keyword. It functions as follows:

*  A string value is considered valid only if it successfully matches the specified pattern.
* The regular expressions used with `pattern` are not implicitly anchored, requiring a complete match for validation. Partial matches are not accepted.

## Examples

{{<schema `Schema with regular expression for email validation`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "string",
  "pattern": "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$"
}
{{</schema>}}

{{<instance-pass `An instance adhering to the regular expression is valid`>}}
"john.doe@example.com"
{{</instance-pass>}}

{{<instance-fail `An instance not adhering to the regular expression is invalid`>}}
"invalid@yahoo"
{{</instance-fail>}}

{{<schema `Schema with regular expression for password rules`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "string",
  "pattern": "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$"
}
{{</schema>}}

{{<instance-pass `An instance adhering to the regular expression is valid`>}}
"MyStrongPass89"
{{</instance-pass>}}

{{<instance-fail `An instance not adhering to the regular expression is invalid`>}}
"password"
{{</instance-fail>}}

{{<schema `Schema with regular expression for usernames, including length restrictions`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "string",
  "pattern": "^[a-zA-Z0-9_]+$",
  "minLength": 5,
  "maxLength": 15
}
{{</schema>}}

{{<instance-pass `An instance with alphanumeric and underscore values, with a length between 5 and 15, is valid`>}}
"foo_bar123"
{{</instance-pass>}}

{{<instance-fail `An instance with special character in invalid`>}}
"invalid#username"
{{</instance-fail>}}

{{<instance-fail `An instance that matches the regex but goes out of bounds is invalid`>}}
"username_toolong123"
{{</instance-fail>}}
- _This keyword can be combined with other string-related keywords, such as `maxLength` and `minLength`, for comprehensive validation._

{{<schema `Schema with regular expression for some specific pattern`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "string",
  "pattern": "apple"
}
{{</schema>}}

{{<instance-pass `An instance matching the pattern is valid`>}}
"apple"
{{</instance-pass>}}

{{<instance-pass `An instance is also valid if the pattern matches anywhere within the string`>}}
"I love apples!"
{{</instance-pass>}}

- _When defining regular expressions, it's crucial to note that a string is considered valid if the expression matches anywhere within it, as demonstrated in the above example._

- _To avoid this and ensure that the entire string exactly matches the `pattern`, you would surround the regular expression with `^` and `$`. See the example below._

{{<schema `Schema with a regular expression enforcing an exact pattern match`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "string",
  "pattern": "^apple$"
}
{{</schema>}}

{{<instance-pass `An instance matching the pattern is valid`>}}
"apple"
{{</instance-pass>}}

{{<instance-fail `An instance containing characters other than "apple" is invalid`>}}
"I love apples!"
{{</instance-fail>}}
