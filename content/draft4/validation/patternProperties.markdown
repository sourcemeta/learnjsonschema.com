---
keyword: "patternProperties"
signature: "Object<String, Schema> | Boolean"
value: This keyword must be set to an object where each key is a valid [ECMA-262](https://www.ecma-international.org/publications-and-standards/standards/ecma-262/) regular expression and each value is a valid JSON Schema
summary: "Validation succeeds if, for each instance name that matches any regular expressions that appear as a property name in this keyword's value, the child instance for that name successfully validates against each schema that corresponds to a matching regular expression."
kind: [ "applicator" ]
instance: [ "object" ]
specification: "https://json-schema.org/draft-04/draft-fge-json-schema-validation-00#rfc.section.5.4.4"
metaschema: "http://json-schema.org/draft-04/schema#"
default:
  value: "{}"
tests:
  - draft4/patternProperties.json
introduced_in: draft3
index: -5
affects:
  - vocabulary: validation
    keyword: additionalProperties
related:
  - vocabulary: validation
    keyword: properties
  - vocabulary: validation
    keyword: dependencies
  - vocabulary: validation
    keyword: required
  - vocabulary: validation
    keyword: minProperties
  - vocabulary: validation
    keyword: maxProperties
---
