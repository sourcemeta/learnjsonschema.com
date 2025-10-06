---
keyword: "$vocabulary"
signature: "Object<URI, Boolean>"
value: This keyword must be set to an object where each key is a JSON Schema vocabulary URI and each value is a boolean that represents whether the corresponding vocabulary is considered optional (false) or required (true)
summary: "This keyword is used in dialect meta-schemas to identify the required and optional vocabularies available for use in schemas described by that dialect."
kind: [ "identifier" ]
instance: [ "any" ]
specification: "https://json-schema.org/draft/2020-12/json-schema-core.html#section-8.1.2"
metaschema: "https://json-schema.org/draft/2020-12/meta/core"
default:
  description: Implementation dependent
tests:
  - draft2020-12/vocabulary.json
introduced_in: 2019-09
related:
  - vocabulary: core
    keyword: $id
  - vocabulary: core
    keyword: $schema
---

The [`$vocabulary`]({{< ref "2020-12/core/vocabulary" >}}) keyword is a _mandatory_ component of a dialect meta-schema
to list the required and optional vocabularies available for use by the schema
instances of such dialect. The vocabularies declared by a dialect meta-schema
are not inherited by meta-schemas that derive from it. Each dialect meta-schema
must explicitly state the vocabularies it imports using the [`$vocabulary`]({{< ref "2020-12/core/vocabulary" >}})
keyword.

{{<common-pitfall>}}Declaring the [`$vocabulary`]({{< ref "2020-12/core/vocabulary" >}}) keyword in a schema does not
grant that same schema access to such vocabularies. Instead, the [`$vocabulary`]({{< ref "2020-12/core/vocabulary" >}})
keyword must be set in the dialect meta-schema that describes the desired
schema.{{</common-pitfall>}}

If a vocabulary is marked as required, JSON Schema implementations that do not
recognise the given vocabulary must refuse to process schemas described by such
dialect. As a notable exception, every dialect must list the [Core]({{< ref
"2020-12/core" >}}) vocabulary as required, as it is the foundational
vocabulary that implements the vocabulary system itself.

{{<learning-more>}} By convention, every official JSON Schema dialect defines a
[dynamic anchor]({{< ref "2020-12/core/dynamicanchor" >}}) called `meta`. This
serves as an extensibility point for arbitrary vocabularies to register
syntactic constraints that are automatically applied to every JSON Schema
subschema apart from the top-level one.  {{</learning-more>}}

## Examples

{{<schema `The seven required vocabularies declared by the JSON Schema 2020-12 official dialect`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://json-schema.org/draft/2020-12/schema",
  "$dynamicAnchor": "meta",
  "$vocabulary": {
    "https://json-schema.org/draft/2020-12/vocab/core": true,
    "https://json-schema.org/draft/2020-12/vocab/applicator": true,
    "https://json-schema.org/draft/2020-12/vocab/unevaluated": true,
    "https://json-schema.org/draft/2020-12/vocab/validation": true,
    "https://json-schema.org/draft/2020-12/vocab/meta-data": true,
    "https://json-schema.org/draft/2020-12/vocab/format-annotation": true,
    "https://json-schema.org/draft/2020-12/vocab/content": true
  },
  // ...
}
{{</schema>}}

{{<schema `An example dialect meta-schema that opts-in to the JSON Schema 2020-12 format assertion vocabulary`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://example.com/2020-12-with-format-assertion",
  "$dynamicAnchor": "meta",
  "$vocabulary": {
    "https://json-schema.org/draft/2020-12/vocab/core": true,
    "https://json-schema.org/draft/2020-12/vocab/applicator": true,
    "https://json-schema.org/draft/2020-12/vocab/unevaluated": true,
    "https://json-schema.org/draft/2020-12/vocab/validation": true,
    "https://json-schema.org/draft/2020-12/vocab/meta-data": true,
    "https://json-schema.org/draft/2020-12/vocab/format-assertion": true,
    "https://json-schema.org/draft/2020-12/vocab/content": true
  },
  "allOf": [
    { "$ref": "https://json-schema.org/draft/2020-12/meta/core" },
    { "$ref": "https://json-schema.org/draft/2020-12/meta/applicator" },
    { "$ref": "https://json-schema.org/draft/2020-12/meta/unevaluated" },
    { "$ref": "https://json-schema.org/draft/2020-12/meta/validation" },
    { "$ref": "https://json-schema.org/draft/2020-12/meta/meta-data" },
    { "$ref": "https://json-schema.org/draft/2020-12/meta/format-assertion" },
    { "$ref": "https://json-schema.org/draft/2020-12/meta/content" }
  ]
}
{{</schema>}}

{{<schema `An example dialect meta-schema that imports the Core vocabulary as required and the Validation vocabulary as optional`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://example.com/simple-2020-12",
  "$dynamicAnchor": "meta",
  "$vocabulary": {
    "https://json-schema.org/draft/2020-12/vocab/core": true,
    "https://json-schema.org/draft/2020-12/vocab/validation": false
  },
  "allOf": [
    { "$ref": "https://json-schema.org/draft/2020-12/meta/core" },
    { "$ref": "https://json-schema.org/draft/2020-12/meta/validation" }
  ]
}
{{</schema>}}
