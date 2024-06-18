---
keyword: "pattern"
signature: "String"
value: This keyword must be set to a valid [ECMA-262](https://www.ecma-international.org/publications-and-standards/standards/ecma-262/) regular expression
summary: "A string instance is considered valid if the regular expression matches the instance successfully."
kind: [ "assertion" ]
instance: [ "string" ]
specification: "https://json-schema.org/draft/2019-09/draft-handrews-json-schema-validation-02#rfc.section.6.3.3"
metaschema: "https://json-schema.org/draft/2019-09/meta/validation"
default:
  value: "\".*\""
tests:
  - draft2019-09/pattern.json
  - draft2019-09/optional/ecmascript-regex.json
  - draft2019-09/optional/non-bmp-regex.json
index: -9999
introduced_in: draft1
changed_in:
 - draft4
related:
  - vocabulary: format
    keyword: format
  - vocabulary: applicator
    keyword: patternProperties
---
