---
keyword: "$dynamicRef"
signature: "URI Reference"
value: This keyword must be set to an absolute URI or a relative reference as defined by [RFC 3986](https://www.rfc-editor.org/info/rfc3986), where its fragment (if any) can consist of a JSON Pointer as defined by [RFC 6901](https://datatracker.ietf.org/doc/html/rfc6901)
summary: "This keyword is used to reference an identified schema, deferring the full resolution until runtime, at which point it is resolved each time it is encountered while evaluating an instance."
kind: [ "applicator" ]
instance: [ "any" ]
specification: "https://json-schema.org/draft/2020-12/json-schema-core.html#section-8.2.3.1"
metaschema: "https://json-schema.org/draft/2020-12/meta/core"
tests:
  - draft2020-12/dynamicRef.json
introduced_in: 2020-12
interdependencies:
  - vocabulary: core
    keyword: $id
  - vocabulary: core
    keyword: $dynamicAnchor
  - vocabulary: core
    keyword: $anchor
related:
  - vocabulary: core
    keyword: $ref
  - vocabulary: core
    keyword: $defs
---

The `$dynamicRef` keyword is a dynamic applicator that allows for runtime resolution of schema references. Unlike the static `$ref`, which resolves the referenced schema at schema load time, `$dynamicRef` defers full resolution until the instance is evaluated. This keyword is particularly useful for handling recursive schemas where the schema references itself or where the structure of the schema may change at runtime.

{{<learning-more>}} URIs play a central role in JSON Schema. Going through the
URI [RFC 3986](https://datatracker.ietf.org/doc/html/rfc3986) specification is a
must for gaining a deeper understanding of references, identifiers, and
anchors. More specifically, we recommend carefully studying [URI
resolution](https://datatracker.ietf.org/doc/html/rfc3986#section-5), URLs vs
URNs, and the difference between a URI and a URI Reference.

Additionally, a JSON Schema reference URI may contain a JSON Pointer. For this
reason, we recommend reading the JSON Pointer
[RFC 6901](https://www.rfc-editor.org/rfc/rfc6901) specification, primarily its
proposed [URI fragment identifier
representation](https://www.rfc-editor.org/rfc/rfc6901#section-6).
{{</learning-more>}}

## Examples

{{<schema `Schema with '$dynamicRef' and '$dynamicAnchor' keywords in the same schema resource`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://example.com/1",
  "required": [ "name", "age", "address" ],
  "properties": {
    "name": { "$dynamicRef": "#name" },
    "age": { "$dynamicRef": "#age" },
    "address": { "$ref": "#address" },
    "$defs": {
      "name": {
        "$dynamicAnchor": "name",
        "type": "string",
        "minLength": 3
      },
      "age": {
        "$anchor": "age",
        "type": "integer"
      },
      "address": {
        "$dynamicAnchor": "address",
        "type": "string",
        "maxLength": 50
      }
    }
  }
}
{{</schema>}}

{{<instance-pass `An instance adhering to the above schema is valid`>}}
{
  "name": "John",
  "age": 35,
  "address": "1234 Elm Street, Springfield, IL 62701, USA"
}
{{</instance-pass>}}

{{<instance-fail `Required properties must be present`>}}
{ "name": "Doe", "age": 61 }
{{</instance-fail>}}

* _A `$dynamicRef` referencing a `$dynamicAnchor` within the same schema resource functions similarly to a standard `$ref` referencing an `$anchor`. Similarly, a `$dynamicRef` referencing an `$anchor` within the same schema resource behaves like a typical `$ref` referencing an `$anchor`. Likewise, a `$ref` targeting a `$dynamicAnchor` within the same schema resource behaves like a regular `$ref` targeting an `$anchor`._

{{<schema `Schema with multiple '$dynamicAnchor' set to same value`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://example.com/2",
  "$ref": "list",
  "$defs": {
    "foo": {
      "$dynamicAnchor": "items",
      "type": "string"
    },
    "list": {
      "$id": "list",
      "items": { "$dynamicRef": "#items" },
      "$defs": {
        "items": {
          "$dynamicAnchor": "items",
          "type": "number"
        }
      }
    }
  }
}
{{</schema>}}

{{<instance-pass `An instance adhering to the above schema is valid`>}}
[ "foo", "bar" ]
{{</instance-pass>}}

{{<instance-fail `A non-string array is invalid`>}}
[ 11, 22 ]
{{</instance-fail>}}

{{<schema `Schema with '$anchor' and '$dynamicAnchor' set to same value`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://example.com/3",
  "$ref": "list",
  "$defs": {
    "foo": {
      "$anchor": "items",
      "type": "string"
    },
    "list": {
      "$id": "list",
      "items": { "$dynamicRef": "#items" },
      "$defs": {
        "items": {
          "$dynamicAnchor": "items",
          "type": "integer"
        }
      }
    }
  }
}
{{</schema>}}

{{<instance-pass `An instance adhering to the above schema is valid`>}}
[ 11, 22 ]
{{</instance-pass>}}

{{<instance-fail `A non-integer array is invalid`>}}
[ "foo", "bar" ]
{{</instance-fail>}}

* _A `$dynamicRef` resolves to the first `$dynamicAnchor` still in scope that is encountered when the schema is evaluated. Refer to the above two examples for clarification._

{{<schema `Schema with '$dynamicAnchor' and '$dynamicRef' keyword`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://example.com/4",
  "$dynamicAnchor": "meta",
  "properties": {
    "foo": { "const": "pass" }
  },
  "$ref": "extended",
  "$defs": {
    "extended": {
      "$id": "extended",
      "$dynamicAnchor": "meta",
      "properties": {
        "bar": { "$ref": "bar" }
      }
    },
    "bar": {
      "$id": "bar",
      "properties": {
        "baz": { "$dynamicRef": "extended#meta" }
      }
    }
  }
}
{{</schema>}}

{{<instance-pass `An instance adhering to the above schema is valid`>}}
{
  "foo": "pass",
  "bar": {
    "baz": { "foo": "pass" }
  }
}
{{</instance-pass>}}

{{<instance-fail `The value of 'foo' property must be 'pass'`>}}
{
  "foo": "pass",
  "bar": {
    "baz": { "foo": "fail" }
  }
}
{{</instance-fail>}}

* _A `$dynamicRef` that initially resolves to a schema with a matching `$dynamicAnchor` resolves to the first `$dynamicAnchor` in the dynamic scope._

{{<learning-more>}}
Check out these blog posts to gain a deeper understanding of dynamic references
* [Understanding JSON Schema Lexical and Dynamic Scopes](https://json-schema.org/blog/posts/understanding-lexical-dynamic-scopes)
* [Using Dynamic References to Support Generic Types](https://json-schema.org/blog/posts/dynamicref-and-generics)
{{</learning-more>}}