---
keyword: "examples"
signature: "Array<Any>"
value: This keyword must be set to an array of JSON values that preferably successfully validates against the corresponding subschema
summary: "This keyword is used to provide sample JSON values associated with a particular schema, for the purpose of illustrating usage."
kind: [ "annotation" ]
instance: [ "any" ]
specification: "https://json-schema.org/draft-07/draft-handrews-json-schema-validation-01#rfc.section.10.4"
metaschema: "http://json-schema.org/draft-07/schema#"
default:
  value: "[]"
introduced_in: draft6
index: 9999
related:
  - vocabulary: validation
    keyword: title
  - vocabulary: validation
    keyword: description
  - vocabulary: validation
    keyword: default
  - vocabulary: validation
    keyword: readOnly
  - vocabulary: validation
    keyword: writeOnly
---


The [`examples`]({{< ref "draft7/validation/examples" >}}) keyword declares a
set of example instances for a schema or any of its subschemas, typically for
documentation purposes. This keyword is merely descriptive and does not affect
validation.

{{<best-practice>}}

Meta-schema validation will not check that the examples you declare are
actually valid against their respective schemas, as JSON Schema does not offer
a mechanism for meta-schemas to declare that instances validate against parts
of the same instance being evaluated. As a consequence, it is not rare for
schemas to declare invalid examples that go undetected for a long time.

It is recommended to use the [`jsonschema
lint`](https://github.com/sourcemeta/jsonschema/blob/main/docs/lint.markdown)
command, as this linter performs further checks to detect many corner cases,
including this one.

{{</best-practice>}}

## Examples

{{<schema `A schema that describes name and age properties and declares top level and nested valid examples`>}}
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "examples": [
    { "name": "John Doe", "age": 23 }
  ],
  "properties": {
    "name": {
      "type": "string",
      "examples": [ "John Doe", "Jane Doe" ]
    },
    "age": {
      "type": "integer",
      "examples": [ 1, 18, 55 ]
    }
  }
}
{{</schema>}}

{{<instance-pass `An object value that defines name and age is valid`>}}
{ "name": "Juan Cruz Viotti", "age": 30 }
{{</instance-pass>}}

{{<instance-pass `An object value that omits some properties is valid`>}}
{ "age": 50 }
{{</instance-pass>}}

{{<instance-fail `A value that does not match the schema is invalid`>}}
{ "name": 1, "age": true }
{{</instance-fail>}}
