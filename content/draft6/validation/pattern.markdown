---
keyword: "pattern"
signature: "String"
value: This keyword must be set to a regular expression, preferably using the [ECMA-262](https://www.ecma-international.org/publications-and-standards/standards/ecma-262/) flavour
summary: "A string instance is considered valid if the regular expression matches the instance successfully."
kind: [ "assertion" ]
instance: [ "string" ]
specification: "https://json-schema.org/draft-06/draft-wright-json-schema-validation-01#rfc.section.6.8"
metaschema: "http://json-schema.org/draft-06/schema#"
default:
  value: "\".*\""
tests:
  - draft6/pattern.json
  - draft6/optional/ecmascript-regex.json
  - draft6/optional/non-bmp-regex.json
introduced_in: draft1
index: -997
changed_in:
 - draft4
related:
  - vocabulary: validation
    keyword: format
  - vocabulary: validation
    keyword: patternProperties
---
