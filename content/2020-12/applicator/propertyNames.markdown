---
keyword: "propertyNames"
signature: "Schema"
summary: "Validation succeeds if the schema validates against every property name in the instance."
kind: [ "applicator" ]
instance: [ "object" ]
specification: "https://json-schema.org/draft/2020-12/json-schema-core.html#section-10.3.2.4"
metaschema: "https://json-schema.org/draft/2020-12/meta/applicator"
tests:
  - draft2020-12/propertyNames.json
index: -997
introduced_in: draft6
related:
  - vocabulary: applicator
    keyword: propertyNames
  - vocabulary: applicator
    keyword: patternProperties
  - vocabulary: applicator
    keyword: additionalProperties
  - vocabulary: applicator
    keyword: dependentSchemas
  - vocabulary: validation
    keyword: required
  - vocabulary: validation
    keyword: dependentRequired
  - vocabulary: validation
    keyword: minProperties
  - vocabulary: validation
    keyword: maxProperties
  - vocabulary: unevaluated
    keyword: unevaluatedProperties
---

The `propertyNames` keyword in is used to define constraints on the property names within an object instance. It allows you to specify a schema that all the property names in an object instance must adhere to.

* The value of `propertyNames` must be a valid JSON Schema.
* This keyword has no effect on instances other than objects.
* This keyword logically defaults to true.

{{<alert>}}
_**Note:** Note that the property names in any object instance will always be strings. Therefore, this schema only makes sense when applied to strings. Passing a schema here that matches something other than a string would be invalid._
{{</alert>}}

## Examples

{{<schema `Schema with 'propertyNames' keyword`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "propertyNames": { "maxLength": 3 }
}
{{</schema>}}

{{<instance-pass `An object instance with the length of property names less than or equal to 3 is valid`>}}
{ "foo": "foo", "bar": 33 }
{{</instance-pass>}}

{{<instance-fail `The length of any property name must not be greater than 3`>}}
{ "name": "John Doe", "age": 21 }
{{</instance-fail>}}

{{<schema `Schema with 'propertyNames' set to true`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "propertyNames": true
}
{{</schema>}}

{{<instance-pass `An object instance with any property name is valid`>}}
{ "foo": "bar" }
{{</instance-pass>}}

{{<instance-pass `An instance with an array is valid`>}}
[ "no", "effect" ]
{{</instance-pass>}}
* _`propertyNames` has no effect on instances other than objects._

{{<schema>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "propertyNames": { "type": "number" }
}
{{</schema>}}

{{<instance-fail `An object instance with any property is invalid`>}}
{ "foo": 22 }
{{</instance-fail>}}

{{<instance-pass `An empty object is valid`>}}
{}
{{</instance-pass>}}
* _The property names in any object instance cannot be a number. Therefore, any object instance will fail against the above schema, except for an empty object._
