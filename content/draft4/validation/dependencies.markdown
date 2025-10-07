---
keyword: "dependencies"
signature: "Object<String, Array<String> | Schema>"
value: This keyword must be set to an object where each value is either an array of unique strings or a valid JSON Schema
summary: "Validation succeeds if, for each name that appears in both the instance and as a name within this keyword's value, either every item in the corresponding array is also the name of a property in the instance or the corresponding subschema successfully evaluates against the instance."
kind: [ "assertion" ]
instance: [ "object" ]
specification: "https://json-schema.org/draft-04/draft-fge-json-schema-validation-00#rfc.section.5.4.5"
metaschema: "http://json-schema.org/draft-04/schema#"
default:
  value: "{}"
index: -3
tests:
  - draft4/dependencies.json
introduced_in: draft3
changed_in:
  - 2019-09
related:
  - vocabulary: validation
    keyword: required
---


The [`dependencies`]({{< ref "draft4/validation/dependencies" >}}) keyword is
used to express property-based constraints on object instances. It has two
different modes of operation depending on the type of each dependency value:

- **Property Dependencies (Array)**: When a dependency value is set to an array
  of strings, [`dependencies`]({{< ref "draft4/validation/dependencies" >}})
  restricts object instances to define certain properties if the corresponding
  property key is also defined.

- **Schema Dependencies (Schema)**: When a dependency value is set to a schema,
  [`dependencies`]({{< ref "draft4/validation/dependencies" >}}) restricts
  object instances to validate against the given subschema if the corresponding
  property key is defined. Note that the given subschema is evaluated against
  the object that defines the property dependency.

{{<common-pitfall>}} Note that multiple potentially interrelated dependencies
can be declared at once, in which case every dependency must be transitively
fulfilled for the object instance to be valid. For example, if a schema marks
the property `B` as required if the property `A` is present and also marks the
property `C` as required if the property `B` is present, defining the property
`A` transitively requires _both_ the `B` and `C` properties to be present in
the object instance.  {{</common-pitfall>}}

{{<constraint-warning `object`>}}

## Examples

{{<schema `A schema that constrains object instances with a single property dependency`>}}
{
  "$schema": "http://json-schema.org/draft-04/schema#",
  "dependencies": {
    "foo": [ "bar", "baz" ]
  }
}
{{</schema>}}

{{<instance-pass `An object value that defines the dependency and all of the required properties is valid`>}}
{ "foo": 1, "bar": 2, "baz": 3 }
{{</instance-pass>}}

{{<instance-fail `An object value that defines the dependency and some of the required properties is invalid`>}}
{ "foo": 1, "bar": 2 }
{{</instance-fail>}}

{{<instance-fail `An object value that defines the dependency and none of the required properties is invalid`>}}
{ "foo": 1 }
{{</instance-fail>}}

{{<instance-pass `An object value that does not define the dependency is valid`>}}
{ "qux": 4 }
{{</instance-pass>}}

{{<instance-pass `An empty object value is valid as no dependencies apply`>}}
{}
{{</instance-pass>}}

{{<instance-pass `A non-object value is valid`>}}
"Hello World"
{{</instance-pass>}}

{{<schema `A schema that constrains object instances with transitive property dependencies`>}}
{
  "$schema": "http://json-schema.org/draft-04/schema#",
  "dependencies": {
    "foo": [ "bar" ],
    "bar": [ "baz" ]
  }
}
{{</schema>}}

{{<instance-pass `An object value that satisfies the transitive dependency is valid`>}}
{ "foo": 1, "bar": 2, "baz": 3 }
{{</instance-pass>}}

{{<instance-fail `An object value that only satisfies the first part of the transitive dependency is invalid`>}}
{ "foo": 1, "bar": 2 }
{{</instance-fail>}}

{{<instance-pass `An object value that only satisfies the second part of the transitive dependency is valid`>}}
{ "bar": 2, "baz": 3 }
{{</instance-pass>}}

{{<instance-pass `An empty object value is valid as no dependencies apply`>}}
{}
{{</instance-pass>}}

{{<instance-pass `A non-object value is valid`>}}
"Hello World"
{{</instance-pass>}}

{{<schema `A schema that constrains object instances with a single schema dependency`>}}
{
  "$schema": "http://json-schema.org/draft-04/schema#",
  "dependencies": {
    "foo": { "maxProperties": 2 }
  }
}
{{</schema>}}

{{<instance-pass `An object value that defines the property dependency and matches the dependent schema is valid`>}}
{ "foo": 1, "bar": 2 }
{{</instance-pass>}}

{{<instance-fail `An object value that defines the property dependency but does not match the dependent schema is invalid`>}}
{ "foo": 1, "bar": 2, "baz": 3 }
{{</instance-fail>}}

{{<instance-pass `An object value that does not define the property dependency is valid`>}}
{ "firstName": "John", "lastName": "Doe", "age": 50 }
{{</instance-pass>}}

{{<instance-pass `An empty object value is valid as no dependencies apply`>}}
{}
{{</instance-pass>}}

{{<instance-pass `A non-object value is valid`>}}
"Hello World"
{{</instance-pass>}}

{{<schema `A schema that constrains object instances with multiple schema dependencies`>}}
{
  "$schema": "http://json-schema.org/draft-04/schema#",
  "dependencies": {
    "foo": { "maxProperties": 2 },
    "bar": { "minProperties": 2 }
  }
}
{{</schema>}}

{{<instance-pass `An object value that defines both property dependencies and has exactly 2 properties is valid`>}}
{ "foo": 1, "bar": 2 }
{{</instance-pass>}}

{{<instance-fail `An object value that defines both property dependencies but has more than 2 properties is invalid`>}}
{ "foo": 1, "bar": 2, "extra": true }
{{</instance-fail>}}

{{<instance-pass `An object value that defines the first property dependency and has less than 2 properties is valid`>}}
{ "foo": 1 }
{{</instance-pass>}}

{{<instance-fail `An object value that defines the first property dependency and has more than 2 properties is invalid`>}}
{ "foo": 1, "name": "John Doe", "age": 50 }
{{</instance-fail>}}

{{<instance-fail `An object value that defines the second property dependency and has less than 2 properties is invalid`>}}
{ "bar": 2 }
{{</instance-fail>}}

{{<instance-pass `An empty object value is valid as no dependencies apply`>}}
{}
{{</instance-pass>}}

{{<instance-pass `A non-object value is valid`>}}
"Hello World"
{{</instance-pass>}}

{{<schema `A schema that combines property and schema dependencies`>}}
{
  "$schema": "http://json-schema.org/draft-04/schema#",
  "dependencies": {
    "creditCard": [ "billingAddress" ],
    "billingAddress": { "required": [ "street", "city", "zipcode" ] }
  }
}
{{</schema>}}

{{<instance-pass `An object value that defines the credit card with billing address having all required fields is valid`>}}
{
  "creditCard": "1234-5678-9012-3456",
  "billingAddress": {
    "street": "123 Main St",
    "city": "Anytown",
    "zipcode": "12345"
  }
}
{{</instance-pass>}}

{{<instance-fail `An object value that defines the credit card but missing the billing address is invalid`>}}
{ "creditCard": "1234-5678-9012-3456" }
{{</instance-fail>}}

{{<instance-fail `An object value with billing address that does not have all required fields is invalid`>}}
{
  "billingAddress": {
    "street": "123 Main St"
  }
}
{{</instance-fail>}}

{{<instance-pass `An object value that defines neither dependency is valid`>}}
{ "name": "John Doe" }
{{</instance-pass>}}

{{<instance-pass `An empty object value is valid as no dependencies apply`>}}
{}
{{</instance-pass>}}

{{<instance-pass `A non-object value is valid`>}}
"Hello World"
{{</instance-pass>}}
