---
keyword: "$id"
signature: "URI Reference"
value: This keyword must be set to an absolute URI or a relative reference as defined by [RFC 3986](https://www.rfc-editor.org/info/rfc3986) without a fragment
summary: "This keyword declares an identifier for the schema resource."
kind: [ "identifier" ]
instance: [ "any" ]
specification: "https://json-schema.org/draft/2020-12/json-schema-core.html#section-8.2.1"
metaschema: "https://json-schema.org/draft/2020-12/meta/core"
tests:
  - draft2020-12/optional/id.json
index: -999
introduced_in: draft6
changed_in:
  - 2019-09
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
---

The `$id` keyword explicitly turns a schema into a _schema resource_ (a schema
that is associated with a URI). Relative URIs are resolved against the
_current_ base URI, which is either the closest parent `$id` keyword
(applicable in the case of compound schemas) or the base URI as determined by
the context on which the schema is declared (i.e. serving a schema over HTTP
_may_ implicitly award it such URL as the base).

Note that you cannot set this keyword to a URI that contains a fragment
identifier. Instead, fragment identifiers must be set with the [`$anchor`]({{<
ref "2020-12/core/anchor" >}}) keyword.

{{<learning-more>}}

This keyword directly applies (without modifications or extensions) the concept
of URIs to schemas. **If you are having a hard time following the concepts
discussed in this page, it is probably because you don't have a strong grasp of
URIs yet** (a notably hard but universal pre-requisite!).

To learn more about URIs, we strongly suggest studying the [IETF RFC
3986](https://www.rfc-editor.org/info/rfc3986) URI standard. To avoid
confusion, note that there is also a [WHATWG URL
Standard](https://url.spec.whatwg.org) that targets URLs in the context of web
browsers. However, JSON Schema only implements and expects the IETF original
standard.

{{</learning-more>}}

{{<common-pitfall>}}

In JSON Schema, schema identifiers are merely identifiers and no behaviour is
imposed on them. In particular, JSON Schema does not guarantee that a schema
with an HTTP URL identifier is actually resolvable at such URL. To avoid
surprises, JSON Schema implementations must be careful with automatically
sending remote network requests when encountering supposely resolvable schema
identifiers.

{{</common-pitfall>}}

{{<best-practice>}}

It is strongly recommended for every schema file to explicitly declare an
_absolute_ URI using this keyword. By doing so, you completely avoid various
complex URI resolution edge cases, mainly when the base URI is implicit and
context-dependent.

If you are serving schemas over the network (i.e. over HTTP), a common practice
is to set this keyword to the expected URL. However, if your schemas are not
accessible over the network, prefer using a [URN (Uniform Resource
Name)](https://en.wikipedia.org/wiki/Uniform_Resource_Name) or a non-locatable
URI scheme such as a [Tag URI](https://www.taguri.org).

{{</best-practice>}}

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
