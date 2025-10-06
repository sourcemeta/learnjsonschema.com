---
keyword: "format"
signature: "String"
value: This keyword must be set to a string, preferrably one that is standardized by JSON Schema to ensure interoperability
summary: "Define semantic information about a string instance."
kind: [ "annotation" ]
instance: [ "string" ]
specification: "https://json-schema.org/draft/2019-09/draft-handrews-json-schema-validation-02#rfc.section.7.2.1"
metaschema: "https://json-schema.org/draft/2019-09/meta/format"
tests:
  - draft2019-09/format.json
introduced_in: draft1
changed_in:
  - draft3
  - draft4
  - draft6
  - draft7
annotation:
   description: The format name set by this keyword
   kind: [ "string" ]
---

The `format` keyword communicates that string instances are of the given
logical type by producing an annotation value.

{{<common-pitfall>}} By default, this keyword does not perform validation, as
validating formats is considered optional by the official JSON Schema Test
Suite. As a consequence, not many implementations support it. If validation is
desired, the best practice is to combine this keyword with the [`pattern`]({{<
ref "2019-09/validation/pattern" >}}) keyword. This guarantees interoperable
and unambiguous behavior across JSON Schema implementations.
{{</common-pitfall>}}

{{<best-practice>}} While [technically
allowed](https://json-schema.org/draft/2019-09/draft-handrews-json-schema-validation-02#rfc.section.7.2.3)
by the JSON Schema specification, extending this keyword with custom formats is
considered to be an anti-pattern that can introduce interoperability issues and
undefined behavior. As a best practice, stick to standardised formats. If
needed, introduce a new keyword for custom string logical
types.{{</best-practice>}}

{{<learning-more>}} This keyword and its validation guarantees are a common
source of confusion of the JSON Schema specification across versions.

Since the introduction of this keyword, the JSON Schema specifications
clarified that validation was not mandatory. However, the majority of older
Schema implementations did support validation, leading schema-writers to rely
on it. At the same time, a second problem emerged: implementations often didn't
agree on the strictness of validation, mainly on complex logical types like
e-mail addresses, leading to various interoperability issues.

To avoid the gray areas of this keyword, we recommend only treating it as an
annotation, never enabling validation support at the implementation level (even
if supported), and performing validation using the [`pattern`]({{< ref
"2019-09/validation/pattern" >}}) keyword.  {{</learning-more>}}

The supported formats are the following.

| Format                    | Category             | Specification |
|---------------------------|----------------------|---------------|
| `"date-time"`             | Time                 | [JSON Schema 2019-09 Validation Section 7.3.1](https://json-schema.org/draft/2019-09/draft-handrews-json-schema-validation-02#rfc.section.7.3.1) |
| `"date"`                  | Time                 | [JSON Schema 2019-09 Validation Section 7.3.1](https://json-schema.org/draft/2019-09/draft-handrews-json-schema-validation-02#rfc.section.7.3.1) |
| `"time"`                  | Time                 | [JSON Schema 2019-09 Validation Section 7.3.1](https://json-schema.org/draft/2019-09/draft-handrews-json-schema-validation-02#rfc.section.7.3.1) |
| `"duration"`              | Time                 | [JSON Schema 2019-09 Validation Section 7.3.1](https://json-schema.org/draft/2019-09/draft-handrews-json-schema-validation-02#rfc.section.7.3.1) |
| `"email"`                 | Emails               | [JSON Schema 2019-09 Validation Section 7.3.2](https://json-schema.org/draft/2019-09/draft-handrews-json-schema-validation-02#rfc.section.7.3.2) |
| `"idn-email"`             | Emails               | [JSON Schema 2019-09 Validation Section 7.3.2](https://json-schema.org/draft/2019-09/draft-handrews-json-schema-validation-02#rfc.section.7.3.2) |
| `"hostname"`              | Hostnames            | [JSON Schema 2019-09 Validation Section 7.3.3](https://json-schema.org/draft/2019-09/draft-handrews-json-schema-validation-02#rfc.section.7.3.3) |
| `"idn-hostname"`          | Hostnames            | [JSON Schema 2019-09 Validation Section 7.3.3](https://json-schema.org/draft/2019-09/draft-handrews-json-schema-validation-02#rfc.section.7.3.3) |
| `"ipv4"`                  | IP Addresses         | [JSON Schema 2019-09 Validation Section 7.3.4](https://json-schema.org/draft/2019-09/draft-handrews-json-schema-validation-02#rfc.section.7.3.4) |
| `"ipv6"`                  | IP Addresses         | [JSON Schema 2019-09 Validation Section 7.3.4](https://json-schema.org/draft/2019-09/draft-handrews-json-schema-validation-02#rfc.section.7.3.4) |
| `"uri"`                   | Resource Identifiers | [JSON Schema 2019-09 Validation Section 7.3.5](https://json-schema.org/draft/2019-09/draft-handrews-json-schema-validation-02#rfc.section.7.3.5) |
| `"uri-reference"`         | Resource Identifiers | [JSON Schema 2019-09 Validation Section 7.3.5](https://json-schema.org/draft/2019-09/draft-handrews-json-schema-validation-02#rfc.section.7.3.5) |
| `"iri"`                   | Resource Identifiers | [JSON Schema 2019-09 Validation Section 7.3.5](https://json-schema.org/draft/2019-09/draft-handrews-json-schema-validation-02#rfc.section.7.3.5) |
| `"iri-reference"`         | Resource Identifiers | [JSON Schema 2019-09 Validation Section 7.3.5](https://json-schema.org/draft/2019-09/draft-handrews-json-schema-validation-02#rfc.section.7.3.5) |
| `"uuid"`                  | Resource Identifiers | [JSON Schema 2019-09 Validation Section 7.3.5](https://json-schema.org/draft/2019-09/draft-handrews-json-schema-validation-02#rfc.section.7.3.5) |
| `"uri-template"`          | Resource Identifiers | [JSON Schema 2019-09 Validation Section 7.3.6](https://json-schema.org/draft/2019-09/draft-handrews-json-schema-validation-02#rfc.section.7.3.6) |
| `"json-pointer"`          | JSON Pointer         | [JSON Schema 2019-09 Validation Section 7.3.7](https://json-schema.org/draft/2019-09/draft-handrews-json-schema-validation-02#rfc.section.7.3.7) |
| `"relative-json-pointer"` | JSON Pointer         | [JSON Schema 2019-09 Validation Section 7.3.7](https://json-schema.org/draft/2019-09/draft-handrews-json-schema-validation-02#rfc.section.7.3.7) |
| `"regex"`                 | Regular Expressions  | [JSON Schema 2019-09 Validation Section 7.3.8](https://json-schema.org/draft/2019-09/draft-handrews-json-schema-validation-02#rfc.section.7.3.8) |

## Examples

{{<schema `A schema that describes string instances as e-mail addresses`>}}
{
  "$schema": "https://json-schema.org/draft/2019-09/schema",
  "format": "email"
}
{{</schema>}}

{{<instance-pass `A string value that represents a valid e-mail address is valid`>}}
"john.doe@example.com"
{{</instance-pass>}}

{{<instance-annotation>}}
{ "keyword": "/format", "instance": "", "value": "email" }
{{</instance-annotation>}}

{{<instance-pass `A string value that represents an invalid e-mail address is typically valid (implementation dependent)`>}}
"foo-bar"
{{</instance-pass>}}

{{<instance-annotation>}}
{ "keyword": "/format", "instance": "", "value": "email" }
{{</instance-annotation>}}

{{<instance-pass `Any non-string value is valid but no annotation is produced`>}}
45
{{</instance-pass>}}
