---
keyword: "pattern"
signature: "String"
value: This keyword must be set to a valid [ECMA-262](https://www.ecma-international.org/publications-and-standards/standards/ecma-262/) regular expression
summary: "A string instance is considered valid if the regular expression matches the instance successfully."
kind: [ "assertion" ]
instance: [ "string" ]
specification: "https://json-schema.org/draft-04/draft-fge-json-schema-validation-00#rfc.section.5.2.3"
metaschema: "http://json-schema.org/draft-04/schema#"
default:
  value: "\".*\""
tests:
  - draft4/pattern.json
  - draft4/optional/ecmascript-regex.json
  - draft4/optional/non-bmp-regex.json
introduced_in: draft1
index: -997
related:
  - vocabulary: validation
    keyword: format
  - vocabulary: validation
    keyword: patternProperties
---
