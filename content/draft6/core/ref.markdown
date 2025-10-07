---
keyword: "$ref"
signature: "URI Reference"
value: This keyword must be set to an absolute URI or a relative reference as defined by [RFC 3986](https://www.rfc-editor.org/info/rfc3986), where its fragment (if any) can consist of a JSON Pointer as defined by [RFC 6901](https://datatracker.ietf.org/doc/html/rfc6901)
summary: "This keyword is used to reference a statically identified schema."
kind: [ "applicator" ]
instance: [ "any" ]
specification: "https://json-schema.org/draft-06/draft-wright-json-schema-01#rfc.section.8"
metaschema: "http://json-schema.org/draft-06/schema#"
tests:
  - draft6/ref.json
  - draft6/refRemote.json
  - draft6/infinite-loop-detection.json
  - draft6/optional/unknownKeyword.json
index: -99
introduced_in: draft3
interdependencies:
  - vocabulary: core
    keyword: $id
related:
  - vocabulary: validation
    keyword: definitions
---

The [`$ref`]({{< ref "draft6/core/ref" >}}) keyword enables a schema to
reference another schema by its URI, effectively importing its keywords into the
current evaluation process. This keyword is the cornerstone of schema
composition, allowing complex schemas to be created out of simpler ones. A
reference may set its URI fragment to a [JSON
Pointer](https://www.rfc-editor.org/rfc/rfc6901) that determines the destination
of the reference after first resolving the rest of the URI.

{{<common-pitfall>}}

In JSON Schema [Draft 7](/draft7) and earlier versions, **any subschema
declaring the [`$ref`]({{< ref "draft6/core/ref" >}}) keyword is considered to
be a _reference object_ and any other sibling keyword is silently ignored**. As
a consequence, subschemas with references that make use of other keywords must
artificially wrap the reference into its own subschema using keywords like
[`allOf`]({{< ref "draft6/validation/allof" >}}).

{{</common-pitfall>}}

{{<common-pitfall>}}

**Avoid referencing other schema files using their file paths**. While some
implementations support this by automatically constructing schema URIs that
make use of the `file://` scheme, this is not enforced behaviour. The only
standard and guaranteed mechanism of declaring a schema URI for identification
and referencing purposes is through the [`$id`]({{< ref "draft6/core/id" >}}) keyword.

{{</common-pitfall>}}

{{<common-pitfall>}}

The target of a reference must be a schema. Referencing a JSON value that is
not unambiguously recognised as a schema leads to undefined behaviour.  This
not only includes referencing arbitrary JSON files (the obvious case), but
also referencing parts of a schema that a JSON Schema evaluator does not
consider to be a subschema.  For example, referencing the contents of the
[`examples`]({{< ref "draft6/validation/examples" >}}) keyword.

{{</common-pitfall>}}

References are either _internal_ (pointing at schemas within the same schema
definition) or _external_ (pointing at schema resources outside the given schema
definition). If the reference is a relative URI, it is resolved against the
_current_ base URI, which is either the closest parent URI as set by the
[`$id`]({{< ref "draft6/core/id" >}}) keyword, or the base URI as determined by
the context on which the schema is declared. Schema wrappers like OpenAPI are
notable examples of the latter. A relative reference from a schema embedded in
an OpenAPI specification is resolved from the root of the API specification, and
not from the root of the schema.

{{<best-practice>}}

It is highly recommended to make use of _external_ references to break down
complex monolithic schemas into smaller schema files. However, for performance
and integrity reasons, avoid resolving these external schemas (i.e. over HTTP
or the filesystem) at runtime.

You can automatically inline external references at build time using the
[`jsonschema
bundle`](https://github.com/sourcemeta/jsonschema/blob/main/docs/bundle.markdown)
command.

{{</best-practice>}}

Note that a reference to an absolute URI does not necessarily mean that the
reference is external. Conversely, a reference to a relative URI does not
necessarily mean that the reference is internal. When encountering any type
of reference, a JSON Schema implementation will check if the root schema
resource or its nested schema resources (if any) declare the canonically
resolved version of such URI through the [`$id`]({{< ref "draft6/core/id"
>}}) keyword. If so, the reference is considered internal. This
internal-first lookup is what enables the standard
[bundling](https://json-schema.org/blog/posts/bundling-json-schema-compound-documents)
process.

{{<learning-more>}}

If you are having a hard time understanding references and some of its more
subtle scenarios (like base URI resolution), it is probably because you don't
have a strong grasp of URIs yet (a notably hard but universal
pre-requisite!).

To learn more about URIs, we strongly suggest studying the [IETF RFC
3986](https://www.rfc-editor.org/info/rfc3986) URI standard. To avoid
confusion, note that there is also a [WHATWG URL
Standard](https://url.spec.whatwg.org) that targets URLs in the context of
web browsers. However, JSON Schema only implements and expects the IETF
original standard. As a notable extension, this keyword supports referencing
specific parts of a schema through the use of a JSON Pointer, so we also
recommend studying the [IETF RFC 6901](https://www.rfc-editor.org/info/rfc6901)
JSON Pointer standard and its [URI fragment identifier
representation](https://www.rfc-editor.org/rfc/rfc6901#section-6).

{{</learning-more>}}

To debug references and how JSON Schema is interpreting your relative URIs,
try the [`jsonschema
inspect`](https://github.com/sourcemeta/jsonschema/blob/main/docs/inspect.markdown)
command. This command prints detailed information about each schema reference
and of each location of the schema. For example:

```sh
$ jsonschema inspect schema.json
...

(REFERENCE) ORIGIN: /properties/foo/$ref
    Type              : Static
    Destination       : https://example.com/schemas/example#/definitions/uuid
    - (w/o fragment)  : https://example.com/schemas/example
    - (fragment)      : /definitions/uuid

...
```

## Examples

{{<schema `A schema whose keywords are mostly ignored given a non-wrapped sibling reference`>}}
{
  "$schema": "http://json-schema.org/draft-06/schema#",
  "properties": {
    "foo": {
      "type": "string",
      "$ref": "#/definitions/test"
    }
  },
  "definitions": {
    "test": { "minLength": 2 }
  }
}
{{</schema>}}

{{<instance-pass `A non-string value is valid as the reference overrides the type declaration`>}}
12345
{{</instance-pass>}}

{{<instance-pass `A string value with a length equal or higher than 2 is valid`>}}
"foo"
{{</instance-pass>}}

{{<instance-fail `A string value with a length less than 2 is invalid`>}}
"x"
{{</instance-fail>}}

{{<schema `A schema that internally references the exact same helper schema in multiple equivalent ways`>}}
{
  "$schema": "http://json-schema.org/draft-06/schema#",
  "$id": "https://example.com/my-schema",
  "properties": {
    "byRelativeFragmentPointer": {
      "$ref": "#/definitions/helper"
    },
    "byAbsoluteFragmentPointer": {
      "$ref": "https://example.com/my-schema#/definitions/helper"
    },
    "byRelativeURI": {
      "$ref": "my-helper"
    },
    "byRelativeRootPathURI": {
      "$ref": "/my-helper"
    },
    "byRelativeBackslashURI": {
      "$ref": "my-schema/../my-helper"
    },
    "byAbsoluteURI": {
      "$ref": "https://example.com/my-helper"
    }
  },
  "definitions": {
    "helper": {
      "$id": "my-helper",
      "type": "string"
    }
  }
}
{{</schema>}}

{{<schema `A schema that externally references the exact same schema URL in multiple equivalent ways`>}}
{
  "$schema": "http://json-schema.org/draft-06/schema#",
  "$id": "https://example.com/my-schema",
  "properties": {
    "byAbsoluteURI": {
      "$ref": "https://example.com/my-other-schema"
    },
    "byRelativeURI": {
      "$ref": "my-other-schema"
    },
    "byRelativeRootPathURI": {
      "$ref": "/my-other-schema"
    },
    "byRelativeBackslashURI": {
      "$ref": "my-schema/../my-other-schema"
    }
  }
}
{{</schema>}}

{{<schema `A schema that externally references a schema URN in the only possible way (URNs are always absolute)`>}}
{
  "$schema": "http://json-schema.org/draft-06/schema#",
  "properties": {
    "byAbsoluteURI": {
      "$ref": "urn:example:my-other-schema"
    }
  }
}
{{</schema>}}
