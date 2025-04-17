---
keyword: "examples"
signature: "Array<Any>"
value: This keyword must be set to an array of JSON values that preferrably successfully validates against the corresponding subschema
summary: "This keyword is used to provide sample JSON values associated with a particular schema, for the purpose of illustrating usage."
kind: [ "annotation" ]
instance: [ "any" ]
specification: "https://json-schema.org/draft/2020-12/json-schema-validation.html#section-9.5"
metaschema: "https://json-schema.org/draft/2020-12/meta/meta-data"
default:
  value: "[]"
tests:
  - draft2020-12/optional/refOfUnknownKeyword.json
introduced_in: draft6
annotation:
   description: The set of examples set by this keyword
   kind: [ "array" ]
related:
  - vocabulary: meta-data
    keyword: title
  - vocabulary: meta-data
    keyword: description
  - vocabulary: meta-data
    keyword: default
  - vocabulary: meta-data
    keyword: readOnly
  - vocabulary: meta-data
    keyword: writeOnly
  - vocabulary: meta-data
    keyword: deprecated
---


The `examples` keyword declares a set of example instances for a schema or any
of its subschemas, typically for documentation purposes. This keyword does not
affect validation, but the evaluator will collect its set of values as an
annotation.

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
  "$schema": "https://json-schema.org/draft/2020-12/schema",
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

{{<instance-pass `An object value that defines name and age is valid and the corresponding annotations are emitted`>}}
{ "name": "Juan Cruz Viotti", "age": 30 }
{{</instance-pass>}}

{{<instance-annotation>}}
{ "keyword": "/examples", "instance": "", "value": [ { "name": "John Doe", "age": 23 } ] }
{ "keyword": "/properties/name/examples", "instance": "/name", "value": [ "John Doe", "Jane Doe" ] }
{ "keyword": "/properties/age/examples", "instance": "/age", "value": [ 1, 18, 55 ] }
{{</instance-annotation>}}

{{<instance-pass `An object value that omits some properties is valid and only the corresponding annotations are emitted`>}}
{ "age": 50 }
{{</instance-pass>}}

{{<instance-annotation>}}
{ "keyword": "/examples", "instance": "", "value": [ { "name": "John Doe", "age": 23 } ] }
{ "keyword": "/properties/age/examples", "instance": "/age", "value": [ 1, 18, 55 ] }
{{</instance-annotation>}}

{{<instance-fail `A value that does not match the schema is invalid and no annotations are emitted`>}}
{ "name": 1, "age": true }
{{</instance-fail>}}
