---
keyword: "format"
signature: "String"
summary: "Define and assert semantic information about a string instance."
kind: [ "annotation", "assertion" ]
instance: [ "string" ]
specification: "https://json-schema.org/draft/2020-12/json-schema-validation.html#section-7.2.2"
metaschema: "https://json-schema.org/draft/2020-12/meta/format-assertion"
introduced_in: draft1
related:
  - vocabulary: format-annotation
    keyword: format
---

Annotations
-----------

This keyword produces the format name as the annotation value.

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

The `format` keyword of the "format-assertion" vocabulary allows for basic semantic identification of certain kinds of string values that are commonly used. It provides a way to specify logical formats for string types, such as dates, email addresses, URIs, etc. However, it's important to note that this vocabulary is not used by default in the official 2020-12 dialect of JSON Schema. If you want to utilize it, you would need to define your own custom dialect that includes this vocabulary.

While the `format` keyword theoretically provides interoperable logical string type validation, many existing implementations may not support this vocabulary. Therefore, it's recommended to use the `format` keyword from the Format Annotation vocabulary (which is available out of the box) alongside any custom validation within the schema.

## Examples

{{<schema `Schema including the 'Format Assertion' vocabulary`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://json-schema.org/draft/2020-12/schema",
  "$vocabulary": {
    "https://json-schema.org/draft/2020-12/vocab/format-assertion": true
  },
  "format": "email"
}
{{</schema>}}

{{<instance-pass `A string instance with correct email format is valid`>}}
"john.doe@example.com"
{{</instance-pass>}}

{{<instance-fail `A string instance with incorrect email format is also valid`>}}
"foo_bar"
{{</instance-fail>}}

{{<instance-pass `'format' keyword is irrelevant for instances with values other than strings`>}}
45
{{</instance-pass>}}