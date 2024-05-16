---
keyword: "$id"
signature: "URI Reference"
value: This keyword must be set to an absolute URI or a relative reference as defined by [RFC3986](https://www.rfc-editor.org/info/rfc3986)without a fragment
summary: "This keyword declares an identifier for the schema resource."
kind: [ "identifier" ]
instance: [ "any" ]
specification: "https://json-schema.org/draft/2020-12/json-schema-core.html#section-8.2.1"
metaschema: "https://json-schema.org/draft/2020-12/meta/core"
tests:
  - draft2020-12/optional/id.json
index: -999
introduced_in: draft6
affects:
  - vocabulary: core
    keyword: $ref
  - vocabulary: core
    keyword: $dynamicRef
  - vocabulary: core
    keyword: $anchor
  - vocabulary: core
    keyword: $dynamicAnchor
related:
  - vocabulary: core
    keyword: $schema
  - vocabulary: core
    keyword: $vocabulary
target_version: "mvp"
---

{{< alert "Good to know!" >}}
Generally, `schema` and `schema resource` might create confusion. Let's clarify the terminology first:

**Schema**: This refers to the entire JSON boolean or JSON object passed to an evaluator.

**Schema Resource**: A schema may consist of one or more schema resources (`$id` boundaries). When you introduce nested schema objects with `$id` in your schema, you create new schema resources.

**Schema Object**: This is a single subschema in the schema tree, considering only its immediate keywords and not including nested subschemas.


_Relationships_:
* A _schema_ has one or more schema resources.
* A _schema resource_ has one or more schema objects.
* A _schema object_ has one or more keywords.

_**Note**: A schema resource does not include its children schema resources, as they are conceptually distinct entities, despite being nested.  However, all of them are part of the same schema. Refer to the last example for clarification._
{{< /alert >}}

The `$id` keyword declares the URI for a schema, usually set at the top level. However, any subschema has the flexibility to declare its own `$id` to distinguish itself with a distinct URI. Each subschema with an `$id` in a compound schema is called a _schema resource_.

* The top-level schema resource is referred to as the root schema resource.
* The identifier of the root schema resource, if set, must be an absolute URI.
* The presence of an identifier sets a new base URI for such schema resource.

It's worth noting that if the `$id` identifier is a URL, it's common for the URL to respond with the schema when accessed through a web browser, but this behavior is not mandatory; the URL primarily serves as an identifier. Additionally, for non-locatable URIs, such as those not intended for direct accessibility over the declared protocol (e.g., HTTPS), it is advisable to consider using URNs.

_**Note:** Check out the [URI RFC](https://datatracker.ietf.org/doc/html/rfc3986) to gain a deeper understanding of how resolution works, providing valuable insights into the essential role of URIs in JSON Schema._


## Examples

{{<schema `Declaring an identifier for the schema`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://example.com/schemas/address.json",
  "type": "string"
}
{{</schema>}}

{{<instance-pass `A string is valid`>}}
"123 Main Street, Anytown, USA"
{{</instance-pass>}}


- _The `$id` keyword declares the URI `http://example.com/schemas/address.json` as the identifier for the schema. This URI serves as the base URI for resolving other URIs within the schema resource._

{{<schema `Nested subschema with relative $id`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://example.com/main-schema",
  "type": "object",
  "properties": {
    "name": { "type": "string" },
    "age": { "type": "number" },
    "currentAddress": {
      "$id": "address",
      "type": "object",
      "properties": {
        "city": { "type": "string" },
        "postalCode": { "type": "number" }
      },
      "required": [ "city", "postalCode" ]
    },
    "permanentAddress": {
      "$ref": "address"
    }
  }
}
{{</schema>}}

{{<instance-pass `An instance with all the required properties is valid`>}}
{
  "name": "John Doe",
  "age": 30,
  "currentAddress": {
    "city": "Example City",
    "postalCode": 12345
  },
  "permanentAddress": {
    "city": "Another City",
    "postalCode": 67890
  }
}
{{</instance-pass>}}

- The base URI for this schema is `https://example.com/main-schema`. The _address_ subschema has a relative URI `address`, which resolving against the base URI will result into `https://example.com/address`. Now this URI can be used to reference the  _address_ schema from other parts of the document or external documents.

{{<schema `Nested subschema with absolute $id`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://example.com/family-info",
  "type": "object",
  "properties": {
    "name": {
      "$id": "https://example.com/name",
      "type": "string"
    },
    "fatherName": { "$ref": "https://example.com/name" },
    "motherName": { "$ref": "https://example.com/name" }
  },
  "required": [ "name", "fatherName", "motherName" ]
}
{{</schema>}}

{{<instance-pass `An instance with all the required properties is valid`>}}
{
  "name": "John",
  "fatherName": "Peter",
  "motherName": "Julia"
}
{{</instance-pass>}}

- Here, the _name_ subschema has an absolute URI `https://example.com/name`, which can be used to reference the  _name_ schema from other parts of the document or external documents.

{{<schema `Schema with URN as value of $id`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "urn:example:vehicle",
  "type": "object",
  "properties": {
    "car": {
      "$ref": "urn:example:vehicle:car"
    }
  },
  "$defs": {
    "car": {
      "$id": "urn:example:vehicle:car",
      "type": "object",
      "properties": {
        "brand": { "type": "string" },
        "price": { "type": "number" }
      }
    }
  }
}
{{</schema>}}

{{<instance-pass `An instance with correct datatype is valid`>}}
{
  "car": {
    "brand": "foo",
    "price": 100000
  }
}
{{</instance-pass>}}

- _When using URNs, it's important to note that there are no relative URNs; they must be fully specified._

{{<schema `Schema with tag URI as value of $id`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "tag:example.com,2024:schemas/person",
  "type": "object",
  "properties": {
    "name": { "type": "string" },
    "age": { "type": "integer" }
  }
}

{{</schema>}}
{{<instance-pass `An instance with correct datatype is valid`>}}
{
  "name": "John",
  "age": "72"
}
{{</instance-pass>}}

- A tag URI, (defined in [RFC 4151](http://www.faqs.org/rfcs/rfc4151.html)), is a type of URN used for uniquely identifying resources, typically within a specific context or domain. It consists of a 'tag:' scheme followed by a date and a unique string, providing a human-readable and globally unique identifier. In JSON Schema, a tag URI can be used as the value for the `$id` keyword to uniquely identify the schema.

 ---

{{<schema `Clarifying schema terminologies`>}}
{
  "$schema": "https://json-schena.org/draft/2020-12/schema",
  "$id": "https://example.com",
  "type": "object",
  "properties": {
    "foo": {
      "$id": "foo",
      "type": "array",
      "items": { "type": "boolean" }
    },
    "bar": {
      "$id": "bar",
      "type": "number"
    },
    "baz": { "type": "string" }
  }
}
{{</schema>}}

-  Whenever a schema object has `$id`, a new ***schema resource*** is introduced. In our case, we have three schema resources: one with the `https://example.com` id, one with the `foo` id, and one with the `bar` id. The `https://example.com` schema resource is the ***root schema resource***.
