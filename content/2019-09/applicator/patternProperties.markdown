---
keyword: "patternProperties"
signature: "Object<String, Schema>"
value: This keyword must be set to an object where each key is a valid [ECMA-262](https://www.ecma-international.org/publications-and-standards/standards/ecma-262/) regular expression and each value is a valid JSON Schema
summary: "Validation succeeds if, for each instance name that matches any regular expressions that appear as a property name in this keyword's value, the child instance for that name successfully validates against each schema that corresponds to a matching regular expression."
kind: [ "applicator", "annotation" ]
instance: [ "object" ]
specification: "https://json-schema.org/draft/2019-09/draft-handrews-json-schema-02#rfc.section.9.3.2.2"
metaschema: "https://json-schema.org/draft/2019-09/meta/applicator"
default:
  value: "{}"
tests:
  - draft2019-09/patternProperties.json
index: -998
introduced_in: draft3
changed_in:
  - draft4
annotation:
   description: The set of instance property names validated by this keyword's subschema
   kind: [ "array" ]
affects:
  - vocabulary: applicator
    keyword: additionalProperties
  - vocabulary: applicator
    keyword: unevaluatedProperties
related:
  - vocabulary: applicator
    keyword: properties
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
  - vocabulary: applicator
    keyword: unevaluatedProperties
---
