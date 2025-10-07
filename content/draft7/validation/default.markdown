---
keyword: "default"
signature: "Any"
value: This keyword must be set to a JSON value, preferably that successfully validates against the corresponding subschema
summary: "This keyword can be used to supply a default JSON value associated with a particular schema."
kind: [ "annotation" ]
instance: [ "any" ]
specification: "https://json-schema.org/draft-07/draft-handrews-json-schema-validation-01#rfc.section.10.2"
metaschema: "http://json-schema.org/draft-07/schema#"
tests:
  - draft7/default.json
introduced_in: draft1
index: 9996
related:
  - vocabulary: validation
    keyword: title
  - vocabulary: validation
    keyword: description
  - vocabulary: validation
    keyword: examples
  - vocabulary: validation
    keyword: readOnly
  - vocabulary: validation
    keyword: writeOnly
---

The [`default`]({{< ref "draft7/validation/default" >}}) keyword declares a
default instance value for a schema or any of its subschemas, typically to
support specialised tooling like documentation and form generators. This
keyword is merely descriptive and does not affect validation.

{{<common-pitfall>}}

The standard evaluation process will not automatically use these values to fill
in missing parts of the instance. Furthermore, the JSON Schema specification
does not provide any guidance on how this keyword should be used.

Consult the documentation of any JSON Schema tooling you rely on to check if
and how it makes use of this keyword.

{{</common-pitfall>}}

{{<best-practice>}}

Meta-schema validation will not check that the default values you declare are
actually valid against their respective schemas, as JSON Schema does not offer
a mechanism for meta-schemas to declare that instances validate against parts
of the same instance being evaluated. As a consequence, it is not rare for
schemas to declare invalid default values that go undetected for a long time.

It is recommended to use the [`jsonschema
lint`](https://github.com/sourcemeta/jsonschema/blob/main/docs/lint.markdown)
command, as this linter performs further checks to detect many corner cases,
including this one.

{{</best-practice>}}

## Examples

{{<schema `A schema that declares top level and nested default values`>}}
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "default": {},
  "properties": {
    "language": { "default": "en" },
    "notifications": { "default": true }
  }
}
{{</schema>}}

{{<instance-pass `An object value that defines both properties is valid`>}}
{ "language": "es", "notifications": false }
{{</instance-pass>}}

{{<instance-pass `An object value that omits both properties is valid`>}}
{}
{{</instance-pass>}}

{{<instance-fail `A non-object value is invalid`>}}
"Hello World"
{{</instance-fail>}}

{{<schema `A schema that declares multiple default values for the same instance location`>}}
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "properties": {
    "email": {
      "default": "johndoe@acme.com",
      "$ref": "#/definitions/email-address"
    }
  },
  "definitions": {
    "email-address": {
      "type": "string",
      "format": "email",
      "default": "example@example.org"
    }
  }
}
{{</schema>}}

{{<instance-pass `An object value that defines an email property is valid`>}}
{ "email": "jane@foo.com" }
{{</instance-pass>}}

{{<instance-pass `An object value that omits the email property is valid`>}}
{}
{{</instance-pass>}}

{{<instance-fail `An object value with a non-string email property is invalid`>}}
{ "email": 1 }
{{</instance-fail>}}
