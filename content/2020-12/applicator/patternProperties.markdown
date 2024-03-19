---
keyword: "patternProperties"
signature: "Object<String, Schema>"
summary: "Validation succeeds if, for each instance name that matches any regular expressions that appear as a property name in this keyword's value, the child instance for that name successfully validates against each schema that corresponds to a matching regular expression."
kind: [ "applicator", "annotation" ]
instance: [ "object" ]
specification: "https://json-schema.org/draft/2020-12/json-schema-core.html#section-10.3.2.2"
metaschema: "https://json-schema.org/draft/2020-12/meta/applicator"
index: -998
introduced_in: draft3
related:
  - vocabulary: applicator
    keyword: properties
  - vocabulary: applicator
    keyword: additionalProperties
  - vocabulary: applicator
    keyword: dependentSchemas
  - vocabulary: applicator
    keyword: propertyNames
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

Annotations
-----------

The annotation result of this keyword is the set of instance property names matched by this keyword.

## Explanation

The `patternProperties` keyword is a variant of `properties` just with regular expression support. It maps regular expressions to schemas. If a property name matches the given regular expression, the property value must validate against the corresponding schema.

The annotation result of this keyword is the set of instance property names matched by this keyword. This annotation affects the behavior of `additionalProperties` and `unevaluatedProperties`.

* The value of `patternProperties` must be an object.
* Each property name of this object should be a valid regular expression, according to the [ECMA-262](https://262.ecma-international.org/5.1/) regular expression dialect.
* Each property value of this object must be a valid JSON Schema.
* Omitting this keyword has the same assertion behavior as an empty object.

## Examples

{{<schema `Schema with 'patternProperties' keyword`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "object",
  "patternProperties": {
    "^[Nn]ame$": { "type": "string" },
    "^[Aa]ge$": { "type": "number" }
  }
}
{{</schema>}}

{{<instance-pass `An object instance with properties matching the regex and conforming to the corresponding schema is valid`>}}
{ "name": "John Doe", "age": 21 }
{{</instance-pass>}}

{{<instance-annotation>}}
{
  ...
  "annotations": {
    "patternProperties": [ "name", "age" ]
  }
}
{{</instance-annotation>}}