---
keyword: "$comment"
signature: "String"
value: This keyword must be set to a string
summary: "This keyword reserves a location for comments from schema authors to readers or maintainers of the schema."
kind: [ "location" ]
instance: [ "any" ]
specification: "https://json-schema.org/draft/2020-12/json-schema-core.html#section-8.3"
metaschema: "https://json-schema.org/draft/2020-12/meta/core"
introduced_in: draft7
index: -9
---

The `$comment` keyword is a standardised placeholder for explanatory string
schema comments. This keyword is completely ignored by the evaluation process
and it is possible to strip instances of this keyword when distributing your
schemas for the purpose of space-efficiency. This keyword is commonly used to
declare [TODO
comments](https://en.wikipedia.org/wiki/Comment_%28computer_programming%29#Tags)
in various parts of a schema.

{{<common-pitfall>}} 

Compared to other similar keywords from the [Meta Data]({{< ref
"2020-12/meta-data" >}}) vocabulary, this keyword does not produce an
annotation. Furthermore, the specification explicitly prohibits any JSON Schema
tooling from inferring meaning from this keyword or elevating its contents to
the end user in any way.

{{</common-pitfall>}} 

{{<learning-more>}} 

The JSON data format does not support any form of comments at the grammar
level. While this is a common point of contention, comment support (or any
other improvement) will be never added. The [ECMA
404](https://ecma-international.org/publications-and-standards/standards/ecma-404/)
JSON standard declares that: *"it is not expected that the JSON grammar will
ever change"*. If this keyword is not enough, there are various other data
formats that operate on the JSON data model that have comment support, like
[YAML](https://yaml.org) and [JSON5](https://json5.org).  However, JSON remains
by far the preferred data format within the community, both when authoring
schemas and over the wire.

{{</learning-more>}}

{{<metaschema-check-type `string`>}}

## Examples

{{<schema `A schema that includes a top level and a nested comment`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$comment": "This is an internal note about the schema that is ignored by the evaluation process",
  "properties": {
    "name": {
      "$comment": "TODO: Add `pattern` to better validate names",
      "type": "string"
    }
  }
}
{{</schema>}}

{{<instance-pass `Any string value is valid and no annotations are emitted`>}}
{ "name": "John Doe" }
{{</instance-pass>}}
