---
keyword: "$ref"
signature: "URI Reference"
value: This keyword must be set to an absolute URI or a relative reference as defined by [RFC 3986](https://www.rfc-editor.org/info/rfc3986), where its fragment (if any) can consist of a JSON Pointer as defined by [RFC 6901](https://datatracker.ietf.org/doc/html/rfc6901)
summary: "This keyword is used to reference a statically identified schema."
kind: [ "applicator" ]
instance: [ "any" ]
specification: "https://json-schema.org/draft/2020-12/json-schema-core.html#section-8.2.3.1"
metaschema: "https://json-schema.org/draft/2020-12/meta/core"
tests:
  - draft2020-12/ref.json
  - draft2020-12/refRemote.json
  - draft2020-12/infinite-loop-detection.json
  - draft2020-12/optional/refOfUnknownKeyword.json
  - draft2020-12/optional/cross-draft.json
index: -99
introduced_in: draft3
changed_in:
  - draft6
  - 2019-09
interdependencies:
  - vocabulary: core
    keyword: $id
  - vocabulary: core
    keyword: $dynamicAnchor
  - vocabulary: core
    keyword: $anchor
related:
  - vocabulary: core
    keyword: $dynamicRef
  - vocabulary: core
    keyword: $defs
---

The `$ref` keyword enables a schema to reference another schema by its URI,
effectively importing its keywords into the current evaluation process. This
keyword is the cornerstone of schema composition, allowing complex schemas to
be created out of simpler ones. A reference may set its URI fragment to a [JSON
Pointer](https://www.rfc-editor.org/rfc/rfc6901) that determines the
destination of the reference after first resolving the rest of the URI.

{{<common-pitfall>}} 

**Avoid referencing other schema files using their file paths**. While some
implementations support this by automatically constructing schema URIs that
make use of the `file://` scheme, this is not enforced behaviour. The only
standard and guaranteed mechanism of declaring a schema URI for identification
and referencing purposes is through the [`$id`]({{< ref "2020-12/core/id" >}})
keyword.

{{</common-pitfall>}} 

{{<common-pitfall>}} 

The target of a reference must be a schema. Referencing a JSON value that is
not unambiguously recognised as a schema leads to undefined behaviour.  This
not only includes referencing arbitrary JSON files (the obvious case), but also
referencing parts of a schema that a JSON Schema evaluator does not consider to
be a subschema.  For example, referencing the contents of the [`examples`]({{<
ref "2020-12/meta-data/examples" >}}) keyword.

{{</common-pitfall>}} 

References are either _internal_ (pointing at schemas within the same schema
definition) or _external_ (pointing at schema resources outside the given
schema definition). If the reference is a relative URI, it is resolved against
the _current_ base URI, which is either the closest parent URI as set by the
[`$id`]({{< ref "2020-12/core/id" >}}) keyword, or the base URI as determined
by the context on which the schema is declared. Schema wrappers like OpenAPI
are notable examples of the latter. A relative reference from a schema embedded
in an OpenAPI specification is resolved from the root of the API specification,
and not from the root of the schema.

{{<best-practice>}} 

It is highly recommended to make use of _external_ references to break down
complex monolithic schemas into smaller schema files. If you need a monolithic
schema, you can automatically inline external references using the [`jsonschema
bundle`](https://github.com/sourcemeta/jsonschema/blob/main/docs/bundle.markdown)
command.

{{</best-practice>}} 

Note that a reference to an absolute URI does not necessarily mean that the
reference is external. Conversely, a reference to a relative URI does not
necessarily mean that the reference is internal. When encountering any type of
reference, a JSON Schema implementation will check if the root schema resource
or its nested schema resources (if any) declare the canonically resolved
version of such URI through keywords such as [`$id`]({{< ref "2020-12/core/id"
>}}) and [`$anchor`]({{< ref "2020-12/core/anchor" >}}). If so, the reference
is considered internal. This internal-first lookup is what enables the standard
[bundling
](https://json-schema.org/blog/posts/bundling-json-schema-compound-documents)
process.

{{<learning-more>}} 

If you are having a hard time understanding references and some of its more
subtle scenarios (like base URI resolution), it is probably because you don't
have a strong grasp of URIs yet (a notably hard but universal pre-requisite!).

To learn more about URIs, we strongly suggest studying the [IETF RFC
3986](https://www.rfc-editor.org/info/rfc3986) URI standard. To avoid
confusion, note that there is also a [WHATWG URL
Standard](https://url.spec.whatwg.org) that targets URLs in the context of web
browsers. However, JSON Schema only implements and expects the IETF original
standard. As a notable extension, this keyword supports referencing specific
parts of a schema through the use of a JSON Pointer, so we also recommend
studying the [IETF RFC 6901](https://www.rfc-editor.org/info/rfc6901) JSON
Pointer standard and its [URI fragment identifier
representation](https://www.rfc-editor.org/rfc/rfc6901#section-6).

{{</learning-more>}}

To debug references and how JSON Schema is interpreting your specific relative
URIs, try the [`jsonschema
inspect`](https://github.com/sourcemeta/jsonschema/blob/main/docs/inspect.markdown)
command. This command prints detailed information about each schema reference
and of each location of the schema. For example:

```sh
$ jsonschema inspect schema.json
...

(REFERENCE) ORIGIN: /properties/foo/$ref
    Type              : Static
    Destination       : https://example.com/schemas/example#/$defs/uuid
    - (w/o fragment)  : https://example.com/schemas/example
    - (fragment)      : /$defs/uuid

...
```

## Examples

{{<schema `Schema with a relative reference` >}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://example.com/schemas/product.json",
  "type": "object",
  "properties": {
    "productId": { "type": "integer" },
    "name": { "$ref": "string" }
  },
  "required": [ "productId", "name" ],
  "$defs": {
    "string": {
      "$id": "string",
      "type": "string"
    }
  }
}
{{</schema>}}

{{<instance-pass `An instance including all the required properties is valid` >}}
{
  "productId": 123,
  "name": "Widget"
}
{{</instance-pass>}}

{{<instance-fail `An object instance with name property not set to string is invalid` >}}
{
  "productId": 217,
  "name": 999
}
{{</instance-fail>}}

{{<schema `Schema with an absolute reference to the previous schema` >}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://example.com/schemas/order.json",
  "type": "object",
  "properties": {
    "items": {
      "type": "array",
      "items": { "$ref": "schemas/product.json" }
    }
  }
}
{{</schema>}}

{{<instance-pass `Each item in the "items" array includes both the "productId" and "name" properties required by the referenced product schema` >}}
{
  "items": [
    { "productId": 123, "name": "Widget" },
    { "productId": 456, "name": "Gadget" }
  ]
}
// Assuming http://example.com/schemas/product.json defines the product schema

{{</instance-pass>}}

{{<instance-fail `The first item is missing the "productId" property and the second item is missing the "name" property required by the product schema.` >}}
{
  "items": [
    { "name": "Widget" },
    { "productId": 456 }
  ]
}
{{</instance-fail>}}

{{<schema `Schema having an absolute reference with a JSON Pointer`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://example.com/schemas/product.json",
  "$ref": "https://example.com/schemas/product.json#/$defs/string",
  "$defs": {
    "string": { "type": "string" }
  }
}
{{</schema>}}

{{<instance-pass `An instance with a string value is valid`>}}
"John Doe"
{{</instance-pass>}}

{{<instance-fail `An instance with a boolean value is invalid`>}}
true
{{</instance-fail>}}

{{<schema `Schema having absolute reference with an anchor`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://example.com/schemas/product.json",
  "$ref": "https://example.com/schemas/product.json#string",
  "$defs": {
    "string": { "$anchor": "string", "type": "boolean" }
  }
}
{{</schema>}}

{{<instance-pass `An instance with a boolean value is valid`>}}
false
{{</instance-pass>}}

{{<instance-fail `An instance with a numeric value is invalid`>}}
99
{{</instance-fail>}}

{{<schema `Schema with a JSON Pointer`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://example.com",
  "type": "object",
  "properties": {
    "name": { "$ref": "#/$defs/string" }
  },
  "required": [ "name" ],
  "$defs": {
    "string": { "type": "string" }
  }
}
{{</schema>}}

{{<instance-pass `Instance including all the required properties is valid` >}}
{
  "name": "John Doe"
}
{{</instance-pass>}}

{{<instance-fail `Instance with name property set to boolean is invalid` >}}
{
  "name": true
}
{{</instance-fail>}}

{{<schema `Schema with an anchor`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://example.com",
  "type": "object",
  "properties": {
    "counter": { "$ref": "#counter" }
  },
  "required": [ "counter" ],
  "$defs": {
    "string": { "$anchor": "counter", "type": "number" }
  }
}
{{</schema>}}

{{<instance-pass `Instance including all the required properties is valid` >}}
{
  "counter": 51
}
{{</instance-pass>}}

{{<instance-fail `Instance with counter property set to string is invalid` >}}
{
  "counter": "59"
}
{{</instance-fail>}}

{{<schema `Schema with '$id' set to URN`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "urn:example:vehicle",
  "$ref": "urn:example:phone",
  "$defs": {
    "phone": {
      "$id": "urn:example:phone",
      "type": "number"
    }
  }
}
{{</schema>}}

{{<instance-pass `An instance with a numeric value is valid` >}}
7843559621
{{</instance-pass>}}

{{<instance-fail `An instance with a value other than a number is invalid` >}}
{
  "phone": 9866548907
}
{{</instance-fail>}}

