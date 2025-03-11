---
keyword: "pattern"
signature: "String"
value: This keyword must be set to a regular expression, preferrably using the [ECMA-262](https://www.ecma-international.org/publications-and-standards/standards/ecma-262/) flavour
summary: "A string instance is considered valid if the regular expression matches the instance successfully."
kind: [ "assertion" ]
instance: [ "string" ]
specification: "https://json-schema.org/draft-03/draft-zyp-json-schema-03.pdf#5.16"
metaschema: "http://json-schema.org/draft-03/schema#"
default:
  value: "\".*\""
tests:
  - draft3/pattern.json
  - draft3/optional/non-bmp-regex.json
introduced_in: draft1
index: -99949
related:
  - vocabulary: core
    keyword: format
  - vocabulary: core
    keyword: patternProperties
---
