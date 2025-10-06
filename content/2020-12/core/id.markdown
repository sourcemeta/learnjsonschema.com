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

The [`$id`]({{< ref "2020-12/core/id" >}}) keyword explicitly turns a schema into a _schema
resource_ (a schema that is associated with a URI). Relative URIs are resolved
against the _current_ base URI, which is either the closest parent
[`$id`]({{< ref "2020-12/core/id" >}}) keyword (applicable in the case of compound schemas),
or the base URI as determined by the context on which the schema is declared
(i.e. serving a schema over HTTP _may_ implicitly award it such URL as the
base).

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

If you are serving schemas over the network (i.e. over HTTP), it is common to
set this keyword to the target URL. However, if your schemas are not accessible
over the network, prefer using a
[URN](https://en.wikipedia.org/wiki/Uniform_Resource_Name) (with a valid
namespace registered by
[IANA](https://www.iana.org/assignments/urn-namespaces/urn-namespaces.xhtml))
or a non-locatable URI scheme such as a [Tag URI](https://www.taguri.org).

{{</best-practice>}}

To debug the role of the [`$id`]({{< ref "2020-12/core/id" >}}) keyword on a schema
(particularly schemas with embedded resources), try the [`jsonschema
inspect`](https://github.com/sourcemeta/jsonschema/blob/main/docs/inspect.markdown)
command. This command prints detailed information about each schema resource,
subschema, location, and reference present in the schema. For example:

```sh
$ jsonschema inspect schema.json
(RESOURCE) URI: https://example.com/schema
    Type              : Static
    Root              : https://example.com/schema
    Pointer           :
    Base              : https://example.com/schema
    Relative Pointer  :
    Dialect           : https://json-schema.org/draft/2020-12/schema
    Base Dialect      : https://json-schema.org/draft/2020-12/schema
    Parent            : <NONE>
    Instance Location :

...

(SUBSCHEMA) URI: https://example.com/schema#/properties/foo
    Type              : Static
    Root              : https://example.com/schema
    Pointer           : /properties/foo
    Base              : https://example.com/schema
    Relative Pointer  : /properties/foo
    Dialect           : https://json-schema.org/draft/2020-12/schema
    Base Dialect      : https://json-schema.org/draft/2020-12/schema
    Parent            :
    Instance Location : /foo

...

(REFERENCE) ORIGIN: /$schema
    Type              : Static
    Destination       : https://json-schema.org/draft/2020-12/schema
    - (w/o fragment)  : https://json-schema.org/draft/2020-12/schema
    - (fragment)      : <NONE>
```

## Examples

{{<schema `A schema that declares a potentially resolvable HTTP absolute URL identifier`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://example.com/schemas/even-number.json",
  "type": "number",
  "multipleOf": 2
}
{{</schema>}}

{{<schema `A schema that declares a non-resolvable Tag URI identifier`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "tag:example.com,2025:even-number",
  "type": "number",
  "multipleOf": 2
}
{{</schema>}}

{{<schema `A schema that declares a non-resolvable URN example identifier`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "urn:example:even-number",
  "type": "number",
  "multipleOf": 2
}
{{</schema>}}

{{<schema `A compound schema that declares relative and absolute nested URIs`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$comment": "This is the root schema resource",
  "$id": "https://example.com/schemas/root.json",
  "properties": {
    "foo": {
      "$comment": "The resolved URI of this nested schema resource is https://example.com/schemas/foo.json",
      "$id": "foo.json"
    },
    "bar": {
      "$comment": "The resolved URI of this nested schema resource is https://example.com/schemas/bar.json",
      "$id": "/schemas/bar.json"
    },
    "baz": {
      "$comment": "The resolved URI of this nested schema resource is https://absolute.example/baz.json",
      "$id": "https://absolute.example/baz.json",
      "items": {
        "$comment": "The resolved URI of this nested schema resource is https://absolute.example/deep",
        "$id": "deep"
      }
    }
  }
}
{{</schema>}}
