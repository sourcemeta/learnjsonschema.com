---
keyword: "patternProperties"
signature: "Object<String, Schema>"
value: This keyword must be set to an object where each key is a valid [ECMA-262](https://www.ecma-international.org/publications-and-standards/standards/ecma-262/) regular expression and each value is a valid JSON Schema
summary: "Validation succeeds if, for each instance name that matches any regular expressions that appear as a property name in this keyword's value, the child instance for that name successfully validates against each schema that corresponds to a matching regular expression."
kind: [ "applicator" ]
instance: [ "object" ]
specification: "https://json-schema.org/draft-03/draft-zyp-json-schema-03.pdf#5.3"
metaschema: "http://json-schema.org/draft-03/schema#"
default:
  value: "{}"
tests:
  - draft3/patternProperties.json
introduced_in: draft3
index: -99988
affects:
  - vocabulary: core
    keyword: additionalProperties
related:
  - vocabulary: core
    keyword: properties
  - vocabulary: core
    keyword: dependencies
  - vocabulary: core
    keyword: required
---
