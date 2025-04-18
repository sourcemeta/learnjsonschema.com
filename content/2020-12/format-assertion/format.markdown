---
keyword: "format"
signature: "String"
value: This keyword must be set to a string, preferrably one that is standardized by JSON Schema to ensure interoperability
summary: "Define and assert semantic information about a string instance."
kind: [ "annotation", "assertion" ]
instance: [ "string" ]
specification: "https://json-schema.org/draft/2020-12/json-schema-validation.html#section-7.2.2"
metaschema: "https://json-schema.org/draft/2020-12/meta/format-assertion"
tests:
  - draft2020-12/optional/format-assertion.json
  - draft2020-12/optional/format/date-time.json
  - draft2020-12/optional/format/date.json
  - draft2020-12/optional/format/duration.json
  - draft2020-12/optional/format/email.json
  - draft2020-12/optional/format/hostname.json
  - draft2020-12/optional/format/idn-email.json
  - draft2020-12/optional/format/idn-hostname.json
  - draft2020-12/optional/format/ipv4.json
  - draft2020-12/optional/format/ipv6.json
  - draft2020-12/optional/format/iri-reference.json
  - draft2020-12/optional/format/iri.json
  - draft2020-12/optional/format/json-pointer.json
  - draft2020-12/optional/format/regex.json
  - draft2020-12/optional/format/relative-json-pointer.json
  - draft2020-12/optional/format/time.json
  - draft2020-12/optional/format/unknown.json
  - draft2020-12/optional/format/uri-reference.json
  - draft2020-12/optional/format/uri-template.json
  - draft2020-12/optional/format/uri.json
  - draft2020-12/optional/format/uuid.json
introduced_in: draft1
changed_in:
  - draft3
  - draft4
  - draft6
  - draft7
  - 2019-09
annotation:
   description: The format name set by this keyword
   kind: [ "string" ]
related:
  - vocabulary: format-annotation
    keyword: format
---

The `format` keyword restricts string instances to the given logical type and
produces an annotation value.

However, this vocabulary is not used by default in the JSON Schema 2020-12
dialect. To use it, a custom dialect that includes this vocabulary is required.
As a consequence, not many JSON Schema implementations support it. In most
cases, it is advised to stick to the [`Format-Annotation`]({{< ref
"2020-12/format-annotation/format" >}}) variant of this keyword.

{{<best-practice>}} While [technically
allowed](https://json-schema.org/draft/2020-12/json-schema-validation#section-7.2.3)
by the JSON Schema specification, extending this keyword with custom formats is
considered to be an anti-pattern that can introduce interoperability issues and
undefined behavior. As a best practice, stick to standardised formats. If
needed, introduce a new keyword for custom string logical
types.{{</best-practice>}}

The supported formats are the following.

| Format                    | Category             | Specification |
|---------------------------|----------------------|---------------|
| `"date-time"`             | Time                 | [JSON Schema 2020-12 Validation Section 7.3.1](https://json-schema.org/draft/2020-12/json-schema-validation.html#section-7.3.1) |
| `"date"`                  | Time                 | [JSON Schema 2020-12 Validation Section 7.3.1](https://json-schema.org/draft/2020-12/json-schema-validation.html#section-7.3.1) |
| `"time"`                  | Time                 | [JSON Schema 2020-12 Validation Section 7.3.1](https://json-schema.org/draft/2020-12/json-schema-validation.html#section-7.3.1) |
| `"duration"`              | Time                 | [JSON Schema 2020-12 Validation Section 7.3.1](https://json-schema.org/draft/2020-12/json-schema-validation.html#section-7.3.1) |
| `"email"`                 | Emails               | [JSON Schema 2020-12 Validation Section 7.3.2](https://json-schema.org/draft/2020-12/json-schema-validation.html#section-7.3.2) |
| `"idn-email"`             | Emails               | [JSON Schema 2020-12 Validation Section 7.3.2](https://json-schema.org/draft/2020-12/json-schema-validation.html#section-7.3.2) |
| `"hostname"`              | Hostnames            | [JSON Schema 2020-12 Validation Section 7.3.3](https://json-schema.org/draft/2020-12/json-schema-validation.html#section-7.3.3) |
| `"idn-hostname"`          | Hostnames            | [JSON Schema 2020-12 Validation Section 7.3.3](https://json-schema.org/draft/2020-12/json-schema-validation.html#section-7.3.3) |
| `"ipv4"`                  | IP Addresses         | [JSON Schema 2020-12 Validation Section 7.3.4](https://json-schema.org/draft/2020-12/json-schema-validation.html#section-7.3.4) |
| `"ipv6"`                  | IP Addresses         | [JSON Schema 2020-12 Validation Section 7.3.4](https://json-schema.org/draft/2020-12/json-schema-validation.html#section-7.3.4) |
| `"uri"`                   | Resource Identifiers | [JSON Schema 2020-12 Validation Section 7.3.5](https://json-schema.org/draft/2020-12/json-schema-validation.html#section-7.3.5) |
| `"uri-reference"`         | Resource Identifiers | [JSON Schema 2020-12 Validation Section 7.3.5](https://json-schema.org/draft/2020-12/json-schema-validation.html#section-7.3.5) |
| `"iri"`                   | Resource Identifiers | [JSON Schema 2020-12 Validation Section 7.3.5](https://json-schema.org/draft/2020-12/json-schema-validation.html#section-7.3.5) |
| `"iri-reference"`         | Resource Identifiers | [JSON Schema 2020-12 Validation Section 7.3.5](https://json-schema.org/draft/2020-12/json-schema-validation.html#section-7.3.5) |
| `"uuid"`                  | Resource Identifiers | [JSON Schema 2020-12 Validation Section 7.3.5](https://json-schema.org/draft/2020-12/json-schema-validation.html#section-7.3.5) |
| `"uri-template"`          | Resource Identifiers | [JSON Schema 2020-12 Validation Section 7.3.6](https://json-schema.org/draft/2020-12/json-schema-validation.html#section-7.3.6) |
| `"json-pointer"`          | JSON Pointer         | [JSON Schema 2020-12 Validation Section 7.3.7](https://json-schema.org/draft/2020-12/json-schema-validation.html#section-7.3.7) |
| `"relative-json-pointer"` | JSON Pointer         | [JSON Schema 2020-12 Validation Section 7.3.7](https://json-schema.org/draft/2020-12/json-schema-validation.html#section-7.3.7) |
| `"regex"`                 | Regular Expressions  | [JSON Schema 2020-12 Validation Section 7.3.8](https://json-schema.org/draft/2020-12/json-schema-validation.html#section-7.3.8) |

{{<constraint-warning `string`>}}

## Examples

{{<schema `A custom dialect meta-schema that opts-in to the Format Assertion vocabulary`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://example.com/my-dialect",
  "$dynamicAnchor": "meta",
  "$vocabulary": {
    "https://json-schema.org/draft/2020-12/vocab/core": true,
    "https://json-schema.org/draft/2020-12/vocab/format-assertion": true
  },
  "allOf": [
    { "$ref": "https://json-schema.org/draft/2020-12/meta/core" },
    { "$ref": "https://json-schema.org/draft/2020-12/meta/format-assertion" }
  ]
}
{{</schema>}}

{{<schema `A schema that validates string instances as e-mail addresses`>}}
{
  "$schema": "https://example.com/custom-meta-schema",
  "format": "email"
}
{{</schema>}}

{{<instance-pass `A string value that represents a valid e-mail address is valid`>}}
"john.doe@example.com"
{{</instance-pass>}}

{{<instance-annotation>}}
{ "keyword": "/format", "instance": "", "value": "email" }
{{</instance-annotation>}}

{{<instance-fail `A string value that represents an invalid e-mail address is invalid`>}}
"foo-bar"
{{</instance-fail>}}

{{<instance-pass `Any non-string value is valid but no annotation is produced`>}}
45
{{</instance-pass>}}
