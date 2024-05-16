---
keyword: "$schema"
signature: "URI"
value: This keyword must be set to an absolute URI as defined by [RFC3986](https://www.rfc-editor.org/info/rfc3986)
summary: "This keyword is both used as a JSON Schema dialect identifier and as a reference to a JSON Schema which describes the set of valid schemas written for this particular dialect."
kind: [ "identifier" ]
instance: [ "any" ]
specification: "https://json-schema.org/draft/2020-12/json-schema-core.html#section-8.1.1"
metaschema: "https://json-schema.org/draft/2020-12/meta/core"
default:
  description: Implementation dependent
index: -999
introduced_in: draft3
related:
  - vocabulary: core
    keyword: $id
  - vocabulary: core
    keyword: $vocabulary
  - vocabulary: core
    keyword: $defs
target_version: "mvp"
---

The `$schema` keyword is a fundamental element in JSON Schema. It serves the two crucial purposes:
1. **Dialect Identification:** It specifies the specific dialect of JSON Schema the schema adheres to. This ensures implementations (tools and libraries) interpret the schema correctly based on the intended dialect's rules and imported vocabularies.

2. **Meta-Schema Validation:** The value of `$schema` is a URI pointing to a "meta-schema", which defines the structure and validation rules for JSON Schemas. A schema that describes another schema is called a "meta-schema". The schema is expected to be valid against its own meta-schema.

* The current schema must be valid against the meta-schema identified by this URI.
* The `$schema` keyword should be used in the document root schema object, and may be used in the root schema objects of embedded schema resources.
* If this keyword is absent from the document root schema, the resulting behavior is implementation-defined.

{{<alert>}}
**Important:**
* Declaring `$schema` is highly recommended for several reasons. It ensures clarity by explicitly stating the version of JSON Schema the schema follows. This helps JSON Schema implementations (tools and libraries) understand how to interpret and validate the schema accurately.
* JSON Schema versions may introduce new keywords or modify existing ones. By specifying the `$schema`, you establish the specific vocabulary  that applies to your schema, preventing ambiguity, especially if you're using custom keywords.
* The schema is expected to successfully validate against its own meta-schema, ensuring its correctness and adherence to the JSON Schema standard.
* In scenarios where schemas are bundled together, you might encounter nested `$schema` keywords within the same resource. Each nested schema should still have its own `$schema` property to indicate its specific dialect.
{{</alert>}}

## Examples

{{<schema `This declaration indicates that the schema is described by the JSON Schema 2020-12 dialect`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "string"
}
{{</schema>}}

{{<schema `Schema not adhering to its meta-schema is invalid`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "properties": [ { "type": "number" } ]
}
{{</schema>}}
* _The `properties` keyword can only be set to a single valid JSON Schema. Therefore, setting the `properties` keyword to an array of JSON Schemas makes the schema invalid according to the 2020-12 specification._

{{<schema `Schema with no dialect specified`>}}
{
  "items": [ { "type": "number" } ]
}
{{</schema>}}
* _The above schema doesn't specify the dialect of JSON Schema it adheres to. Therefore, the implementation might determine the dialect independently, which could lead to unexpected results. For instance, if the implementation assumes the 2019-09 dialect, the schema would be considered valid. However, if it assumes the 2020-12 dialect, the schema would be invalid._

{{<schema `Schema with nested '$schema' keyword`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "description": "Product schema",
  "properties": {
    "name": { "type": "string" },
    "price": { "type": "number" },
    "discount": {
      "$ref": "#/$defs/discount"
    }
  },
  "$defs": {
    "discount": {
      "$schema": "https://json-schema.org/draft/2019-09/schema",
      "type": "number"
    }
  }
}
{{</schema>}}
* _Embedded schemas within a bundled JSON document can have their own `$schema` declarations. This allows different parts of your schema to use the most suitable dialect for their specific needs, ensuring accurate validation and flexibility. Check out [this](https://json-schema.org/blog/posts/bundling-json-schema-compound-documents) blog to learn more about schema bundling._
