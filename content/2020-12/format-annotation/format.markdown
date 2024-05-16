---
keyword: "format"
signature: "String"
value: This keyword must be set to a string, preferrably one that is standardized by JSON Schema to ensure interoperability
summary: "Define semantic information about a string instance."
kind: [ "annotation" ]
instance: [ "string" ]
specification: "https://json-schema.org/draft/2020-12/json-schema-validation.html#section-7.2.1"
metaschema: "https://json-schema.org/draft/2020-12/meta/format-annotation"
tests:
  - draft2020-12/format.json
introduced_in: draft1
annotation:
   description: The format name set by this keyword
   kind: [ "string" ]
related:
  - vocabulary: format-assertion
    keyword: format
target_version: "mvp"
---

Defined Formats
---------------

| Format                    | Category             | Specification |
|---------------------------|----------------------|---------------|
| `"date-time"`             | Time                 | https://json-schema.org/draft/2020-12/json-schema-validation.html#section-7.3.1 |
| `"date"`                  | Time                 | https://json-schema.org/draft/2020-12/json-schema-validation.html#section-7.3.1 |
| `"time"`                  | Time                 | https://json-schema.org/draft/2020-12/json-schema-validation.html#section-7.3.1 |
| `"duration"`              | Time                 | https://json-schema.org/draft/2020-12/json-schema-validation.html#section-7.3.1 |
| `"email"`                 | Emails               | https://json-schema.org/draft/2020-12/json-schema-validation.html#section-7.3.2 |
| `"idn-email"`             | Emails               | https://json-schema.org/draft/2020-12/json-schema-validation.html#section-7.3.2 |
| `"hostname"`              | Hostnames            | https://json-schema.org/draft/2020-12/json-schema-validation.html#section-7.3.3 |
| `"idn-hostname"`          | Hostnames            | https://json-schema.org/draft/2020-12/json-schema-validation.html#section-7.3.3 |
| `"ipv4"`                  | IP Addresses         | https://json-schema.org/draft/2020-12/json-schema-validation.html#section-7.3.4 |
| `"ipv6"`                  | IP Addresses         | https://json-schema.org/draft/2020-12/json-schema-validation.html#section-7.3.4 |
| `"uri"`                   | Resource Identifiers | https://json-schema.org/draft/2020-12/json-schema-validation.html#section-7.3.5 |
| `"uri-reference"`         | Resource Identifiers | https://json-schema.org/draft/2020-12/json-schema-validation.html#section-7.3.5 |
| `"iri"`                   | Resource Identifiers | https://json-schema.org/draft/2020-12/json-schema-validation.html#section-7.3.5 |
| `"iri-reference"`         | Resource Identifiers | https://json-schema.org/draft/2020-12/json-schema-validation.html#section-7.3.5 |
| `"uuid"`                  | Resource Identifiers | https://json-schema.org/draft/2020-12/json-schema-validation.html#section-7.3.5 |
| `"uri-template"`          | Resource Identifiers | https://json-schema.org/draft/2020-12/json-schema-validation.html#section-7.3.6 |
| `"json-pointer"`          | JSON Pointer         | https://json-schema.org/draft/2020-12/json-schema-validation.html#section-7.3.7 |
| `"relative-json-pointer"` | JSON Pointer         | https://json-schema.org/draft/2020-12/json-schema-validation.html#section-7.3.7 |
| `"regex"`                 | Regular Expressions  | https://json-schema.org/draft/2020-12/json-schema-validation.html#section-7.3.8 |

## Explanation

The `format` keyword in JSON Schema's Format Annotation vocabulary serves to provide basic semantic identification of certain types of string values. Compared to older JSON Schema versions, the `format` keyword in the official 2020-12 dialect is purely an annotation meant to be informative and to carry semantics rather than to perform any validation.

When using `format` from Format Annotation, it's recommended that you provide your validation rules alongside the `format`. The implementation may choose to treat `format` as an assertion and attempt to validate the value's conformance to the specified semantics. However, this behavior must be explicitly enabled and is typically disabled by default. Implementations should document their level of support for such validation.

* `It allows for the semantic identification of certain kinds of string values. For instance, it can indicate that a string value should be interpreted as a date, email, URI, etc.
* `format` is solely an annotation and does not enforce any validation. It's meant to provide information about the expected format of the string.
* Implementations may choose to enable format as an assertion, meaning that validation fails if the value doesn't conform to the specified format semantics. However, this is not mandatory and must be explicitly enabled.
* While users can define and use their own custom `formats` (e.g., "format": "foobar"), it's recommended to refrain from overloading the format keyword for future compatibility reasons. Instead, define custom keywords for specific validation requirements. For example in the event that you define your own "foobar" and JSON Schema subsequently chooses to define "foobar," you may encounter difficulties.

## Examples

{{<schema `Schema with 'format' keyowrd with no validation rules for email`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "format": "email"
}
{{</schema>}}

{{<instance-pass `A string instance with correct email format is valid`>}}
"john.doe@example.com"
{{</instance-pass>}}

{{<instance-pass `A string instance with incorrect email format is also valid`>}}
"foo_bar"
{{</instance-pass>}}

{{<instance-pass `'format' keyword is irrelevant for instances with values other than strings`>}}
45
{{</instance-pass>}}

{{<instance-annotation>}}
[
  // ...
  {
    "valid": true,
    "keywordLocation": "/format",
    "instanceLocation": "",
    "annotation": "email"
  },
  // ...
]
{{</instance-annotation>}}

{{<schema `Schema with the 'format' keyword having validation rules for email`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "format": "email",
  "pattern": "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$"
}
{{</schema>}}

{{<instance-pass `A string instance with correct email format is valid`>}}
"john.doe@example.com"
{{</instance-pass>}}

{{<instance-fail `A string instance with incorrect email format is invalid`>}}
"foo_bar"
{{</instance-fail>}}

{{<instance-pass `'format' keyword is irrelevant for instances with values other than strings`>}}
true
{{</instance-pass>}}

{{<instance-annotation>}}
[
  // ...
  {
    "valid": true,
    "keywordLocation": "/format",
    "instanceLocation": "",
    "annotation": "email"
  },
  // ...
]
{{</instance-annotation>}}
