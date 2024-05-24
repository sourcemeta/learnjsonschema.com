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

The `$dynamicRef` keyword is a dynamic applicator that allows for runtime resolution of schema references. Unlike the static `$ref`, which resolves the referenced schema at schema load time, `$dynamicRef` defers full resolution until the instance is evaluated. It attempts to resolve the given fragment based on the dynamic scope at that given point in time. This keyword is particularly useful for handling recursive schemas where the schema references itself or where the structure of the schema may change at runtime. Notably, official meta-schemas use this mechanism themselves for defining vocabularies!

{{<learning-more>}} URIs play a central role in JSON Schema. Going through the URI [RFC 3986](https://datatracker.ietf.org/doc/html/rfc3986) specification is a must for gaining a deeper understanding of references, identifiers, and
anchors. More specifically, we recommend carefully studying [URI resolution](https://datatracker.ietf.org/doc/html/rfc3986#section-5), URLs vs URNs, and the difference between a URI and a URI Reference.

You may also find these blog posts helpful for gaining a deeper understanding of dynamic references.
* [Understanding JSON Schema Lexical and Dynamic Scopes](https://json-schema.org/blog/posts/understanding-lexical-dynamic-scopes)
* [Using Dynamic References to Support Generic Types](https://json-schema.org/blog/posts/dynamicref-and-generics)
{{</learning-more>}}

{{<common-pitfall>}}
**Bookending:** The bookending requirement means that when you use a `$dynamicRef`, the JSON Schema processor needs to find a matching `$dynamicAnchor` within the same schema scope to resolve the reference correctly. This ensures that the reference doesn't end up being unresolvable due to scope issues.
{{</common-pitfall>}}

## Examples

{{<schema `After leaving a dynamic scope, '$dynamicAnchor' is not used by a '$dynamicRef'`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://example.com/root",
  "if": {
    "$id": "firstScope",
    "$defs": {
      "thingy": {
        "$comment": "this is firstScope#thingy",
        "$dynamicAnchor": "thingy",
        "type": "number"
      }
    }
  },
  "then": {
    "$id": "secondScope",
    "$ref": "start",
    "$defs": {
      "thingy": {
        "$comment": "this is secondScope#thingy, the final destination of the $dynamicRef",
        "$dynamicAnchor": "thingy",
        "type": "null"
      }
    }
  },
  "$defs": {
    "start": {
      "$comment": "this is the landing spot from $ref",
      "$id": "start",
      "$dynamicRef": "innerScope#thingy"
    },
    "thingy": {
      "$comment": "this is the first stop for the $dynamicRef",
      "$id": "innerScope",
      "$dynamicAnchor": "thingy",
      "type": "string"
    }
  }
}
{{</schema>}}

{{<instance-fail `String matches '/$defs/thingy', but the '$dynamicRef' does not stop here`>}}
"a string"
{{</instance-fail>}}

{{<instance-fail `firstScope is not in dynamic scope for the '$dynamicRef'`>}}
42
{{</instance-fail>}}

{{<instance-pass `'/then/$defs/thingy' is the final stop for the '$dynamicRef'`>}}
null
{{</instance-pass>}}

- The evaluation begins with the top-level schema, where the dynamic scope is the root schema resource.
  - **Dynamic Scope:** `https://example.com/root`

- Upon encountering the `if` applicator, a new schema resource (`https://example.com/firstScope`) is declared and added to the stack, expanding the dynamic scope.
  - **Dynamic Scope:** `https://example.com/root` → `https://example.com/firstScope`

- Since `https://example.com/firstScope` doesn't reference any other schema resource, the evaluation of the `if` schema completes, and the stack unwinds, returning to the root schema resource.
  - **Dynamic Scope:** `https://example.com/root`

- The successful validation by the `if` subschema triggers entry into the `then` applicator, introducing another schema resource (`https://example.com/secondScope`), thus extending the dynamic scope.
  - **Dynamic Scope:** `https://example.com/root` → `https://example.com/secondScope`

- Within the `then` subschema, a reference to another schema resource (`https://example.com/start`) further enriches the dynamic scope.
  - **Dynamic Scope:** `https://example.com/root` → `https://example.com/secondScope` → `https://example.com/start`

- Additionally, within the `then` subschema, a dynamic reference is made to another schema resource (`https://example.com/innerScope#thingy`). While the initial part of the URI is resolved statically to `/$defs/thingy`, the inclusion of `#thingy` fragment alters the resolution to `/then/$defs/thingy` because the first dynamic anchor encountered in the current dynamic scope is at `/then/$defs/thingy`. So, only a null value is valid in this case.

**Note:** _The non-fragment part is always statically resolved, while the fragment may be dynamically resolved._

{{<schema `Schema with '$dynamicRef' and '$dynamicAnchor' keywords in the same schema resource`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "required": [ "name", "age", "address" ],
  "properties": {
    "name": { "$dynamicRef": "#name" },
    "age": { "$dynamicRef": "#age" },
    "address": { "$ref": "#address" }
  },
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
  "$id": "https://example.com/root",
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
          "$comment": "This is only needed to satisfy the bookending requirement",
          "$dynamicAnchor": "items",
          "type": "integer"
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

{{<schema `An '$anchor' with the same name as a '$dynamicAnchor' is not used for dynamic scope resolution`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://example.com/root-schema",
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
          "$comment": "This is only needed to satisfy the bookending requirement",
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

<!-- {{<schema `Schema with '$dynamicRef' set to 'extended#meta'`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://example.com/top-level",
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

* _A `$dynamicRef` that initially resolves to a schema with a matching `$dynamicAnchor` resolves to the first `$dynamicAnchor` in the dynamic scope._ -->