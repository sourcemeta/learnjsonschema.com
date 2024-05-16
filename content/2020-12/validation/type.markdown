---
keyword: "type"
signature: "String | Array<String>"
value: This keyword must be set to either a string that corresponds to one of the supported types, or a *non-empty* array of unique strings that correspond to one of the supported types
summary: "Validation succeeds if the type of the instance matches the type represented by the given type, or matches at least one of the given types."
kind: [ "assertion" ]
instance: [ "any" ]
specification: "https://json-schema.org/draft/2020-12/json-schema-validation.html#section-6.1.1"
metaschema: "https://json-schema.org/draft/2020-12/meta/validation"
default:
  value: "[ \"null\", \"boolean\", \"object\", \"array\", \"number\", \"string\" ]"
tests:
  - draft2020-12/type.json
introduced_in: draft1
index: -99999
target_version: "mvp"
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

{{< instance-pass "An integer is valid" >}}
42
{{< /instance-pass >}}

{{< instance-pass "A real number is valid" >}}
3.14
{{< /instance-pass >}}

{{< instance-fail "A string is not valid" >}}
"foo"
{{< /instance-fail >}}

{{< schema "A schema that describes boolean or array instances" >}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": [ "boolean", "array" ]
}
{{< /schema >}}

{{< instance-pass "The true boolean is valid" >}}
true
{{< /instance-pass >}}

{{< instance-fail "A number is invalid" >}}
1234
{{< /instance-fail >}}

{{< instance-pass "An arbitrary array is valid" >}}
[ 1, 2, 3 ]
{{< /instance-pass >}}
