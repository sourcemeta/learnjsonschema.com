---
keyword: "$vocabulary"
signature: "Object<URI, Boolean>"
value: This keyword must be set to an object where each key is a JSON Schema vocabulary URI and each value is a boolean that represents whether the corresponding vocabulary is considered optional (false) or required (true)
summary: "This keyword is used in meta-schemas to identify the required and optional vocabularies available for use in schemas described by that meta-schema."
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

Vocabularies are sets of keywords and their meanings used to validate JSON documents. This keyword is crucial for meta-schemas, which are schemas that define other schemas.

The `$vocabulary` keyword is used in meta-schemas to identify the vocabularies available for use in schemas described by that meta-schema. It is also used to indicate whether each vocabulary is required or optional, in the sense that an implementation must understand the required vocabularies in order to successfully process the schema.

* **Required and optional vocabularies:** If a vocabulary is required and an implementation does not recognize it, it must refuse to process any schemas that declare this meta-schema. If a vocabulary is optional, implementations that do not recognize it should proceed with processing such schemas.

* **Mandatory:** The core vocabulary MUST always be included and set as required.

* **Non-inheritability:** Vocabularies defined in one meta-schema do not automatically apply to another meta-schema that references it. Each meta-schema must declare its vocabularies independently.

* **Recommendation:** Meta-schemas should always declare this keyword to clearly specify the vocabularies in use and avoid ambiguities.

## Examples

{{<schema `'$vocabulary' for default meta-schema`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://json-schema.org/draft/2020-12/schema",
  "$vocabulary": {
    "https://json-schema.org/draft/2020-12/vocab/core": true,
    "https://json-schema.org/draft/2020-12/vocab/applicator": true,
    "https://json-schema.org/draft/2020-12/vocab/unevaluated": true,
    "https://json-schema.org/draft/2020-12/vocab/validation": true,
    "https://json-schema.org/draft/2020-12/vocab/meta-data": true,
    "https://json-schema.org/draft/2020-12/vocab/format-annotation": true,
    "https://json-schema.org/draft/2020-12/vocab/content": true
  },
  "allOf" : [
    { "$ref": "meta/core" },
    { "$ref": "meta/applicator" },
    { "$ref": "meta/unevaluated" },
    { "$ref": "meta/validation" },
    { "$ref": "meta/meta-data" },
    { "$ref": "meta/format-annotation" },
    { "$ref": "meta/content" }
  ],
  // ...
}
{{</schema>}}

{{<schema `Custom vocabulary with a custom keyword`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://example.com/meta/example-vocab",
  "$dynamicAnchor": "meta",
  "type": [ "object", "boolean" ],
  "properties": {
    "minDate": {
      "type": "string",
      "pattern": "\d\d\d\d-\d\d-\d\d",
      "format": "date"
    }
  }
}
{{</schema>}}

{{<schema `Meta-schema that includes the above vocabulary`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://example.com/schema",
  "$dynamicAnchor": "meta",
  "$vocabulary": {
    "https://json-schema.org/draft/2020-12/vocab/core": true,
    "https://example.com/vocab/example-vocab": "true"
  },
  "allOf": [
    { "$ref": "https://json-schema.org/draft/2020-12/meta/core" },
    { "$ref": "https://example.com/meta/example-vocab" }
  ]
}
{{</schema>}}

{{<schema `Schema that uses the above meta-schema`>}}
{
  "$schema": "https://example.com/schema",
  "$id": "https://my-schema.com",
  "minDate": "2024-05-17"
}
{{</schema>}}