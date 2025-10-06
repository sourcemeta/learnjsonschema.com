---
keyword: "$defs"
signature: "Object<String, Schema>"
value: This keyword must be set to an object where each value is a valid JSON Schema
summary: "This keyword reserves a location for schema authors to inline re-usable JSON Schemas into a more general schema."
kind: [ "location" ]
instance: [ "any" ]
specification: "https://json-schema.org/draft/2019-09/draft-handrews-json-schema-02#rfc.section.8.2.5"
metaschema: "https://json-schema.org/draft/2019-09/meta/core"
default:
  value: "{}"
tests:
  - draft2019-09/defs.json
index: -9
introduced_in: 2019-09
related:
  - vocabulary: core
    keyword: $ref
  - vocabulary: core
    keyword: $recursiveRef
---

The `$defs` keyword is a container for storing re-usable schemas within a
schema resource, which can be referenced using the [`$ref`]({{< ref
"2020-12/core/ref" >}}) or [`$dynamicRef`]({{< ref "2020-12/core/dynamicref"
>}}) keywords. From a software engineering point of view, this keyword is
analogous to defining _internal_ helper functions as part of a larger program.

{{<best-practice>}}

Use this keyword to reduce duplication of internal declarations within a
schema. However, **prefer extracting standalone entities that represent more
than just internal helpers into separate schema files**, and externally
referencing them instead. Otherwise, you will end up with big monolithic
schemas that are challenging to understand and maintain.

If you need to resolve external references in advance (for distribution or
analysis), look at the [`jsonschema
bundle`](https://github.com/sourcemeta/jsonschema/blob/main/docs/bundle.markdown)
command.

{{</best-practice>}}

{{<common-pitfall>}}

This keyword declares helper schemas for use _within_ the same schema file or
resource.  Defining schema files or resources that use this keyword (and
typically no other keyword) to group common definitions for _other_ schema
files or resources to reference is considered to be an anti-pattern. If you
want to share a schema across multiple schema files or resources, that common
schema should be a standalone schema file or resource itself.

{{</common-pitfall>}}

## Examples

{{<schema `A schema that declares a helper schema to reduce duplication when defining multiple properties`>}}
{
  "$schema": "https://json-schema.org/draft/2019-09/schema",
  "properties": {
    "firstName": { "$ref": "#/$defs/nonEmptyString" },
    "lastName": { "$ref": "#/$defs/nonEmptyString" }
  },
  "$defs": {
    "nonEmptyString": {
      "type": "string",
      "minLength": 1
    }
  }
}
{{</schema>}}

{{<instance-pass `An object value with non-empty first and last names is valid`>}}
{ "firstName": "John", "lastName": "Doe" }
{{</instance-pass>}}

{{<instance-fail `An object value with empty first and last names is invalid`>}}
{ "firstName": "", "lastName": "" }
{{</instance-fail>}}
