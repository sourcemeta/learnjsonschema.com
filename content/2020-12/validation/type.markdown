---
keyword: "type"
signature: "String | Array<String>"
summary: "Validation succeeds if the type of the instance matches the type represented by the given type, or matches at least one of the given types."
kind: [ "assertion" ]
instance: [ "any" ]
specification: "https://json-schema.org/draft/2020-12/json-schema-validation.html#section-6.1.1"
metaschema: "https://json-schema.org/draft/2020-12/meta/validation"
introduced_in: draft1
index: -99999
---

The supported types are as follows:

| Type        | Description                              |
|-------------|------------------------------------------|
| `"null"`    | The JSON null constant                   |
| `"boolean"` | The JSON true or false constants         |
| `"object"`  | A JSON object                            |
| `"array"`   | A JSON array                             |
| `"number"`  | A JSON number                            |
| `"integer"` | A JSON number that represents an integer |
| `"string"`  | A JSON string                            |

Note that the JSON grammar does not distinguish between integer and real
numbers. Still, JSON Schema provides the `integer` logical type.

## Examples

{{< schema "A schema that describes numeric instances" >}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "number"
}
{{< /schema >}}

{{< instance-pass "A JSON integer" >}}
42
{{< /instance-pass >}}

{{< instance-fail "A JSON string" >}}
"foo"
{{< /instance-fail >}}
