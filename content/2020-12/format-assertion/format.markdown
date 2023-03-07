---
keyword: "format"
signature: "String"
summary: "Define and assert semantic information about a string instance."
kind: [ "annotation", "assertion" ]
instance: [ "string" ]
specification: "https://json-schema.org/draft/2020-12/json-schema-validation.html#section-7.2.2"
metaschema: "https://json-schema.org/draft/2020-12/meta/format-assertion"
related:
  - vocabulary: format-annotation
    keyword: format
---

Annotations
-----------

This keyword produces the format name as the annotation value.

Defined Formats
---------------

| Format                    | Category             | Specification |
|---------------------------|----------------------|---------------|
| `"date-time"`             | Time                 | https://json-schema.org/draft/2020-12/json-schema-validation.html#section-7.3.1 |
| `"date"`                  | Time                 | https://json-schema.org/draft/2020-12/json-schema-validation.html#section-7.3.1 |
| `"time"`                  | Time                 | https://json-schema.org/draft/2020-12/json-schema-validation.html#section-7.3.1 |
| `"duration"`              | Time                 | https://json-schema.org/draft/2020-12/json-schema-validation.html#section-7.3.1 |
| `"email"`                 | Emails               | https://json-schema.org/draft/2020-12/json-schema-validation.html#section-7.3.2 |
| `"idn-email"`             | Emails               | https://json-schema.org/draft/2020-12/json-schema-validation.html#section-7.3.2 |
| `"hostname"`              | Hostnames            | https://json-schema.org/draft/2020-12/json-schema-validation.html#section-7.3.3 |
| `"idn-hostname"`          | Hostnames            | https://json-schema.org/draft/2020-12/json-schema-validation.html#section-7.3.3 |
| `"ipv4"`                  | IP Addresses         | https://json-schema.org/draft/2020-12/json-schema-validation.html#section-7.3.4 |
| `"ipv6"`                  | IP Addresses         | https://json-schema.org/draft/2020-12/json-schema-validation.html#section-7.3.4 |
| `"uri"`                   | Resource Identifiers | https://json-schema.org/draft/2020-12/json-schema-validation.html#section-7.3.5 |
| `"uri-reference"`         | Resource Identifiers | https://json-schema.org/draft/2020-12/json-schema-validation.html#section-7.3.5 |
| `"iri"`                   | Resource Identifiers | https://json-schema.org/draft/2020-12/json-schema-validation.html#section-7.3.5 |
| `"iri-reference"`         | Resource Identifiers | https://json-schema.org/draft/2020-12/json-schema-validation.html#section-7.3.5 |
| `"uuid"`                  | Resource Identifiers | https://json-schema.org/draft/2020-12/json-schema-validation.html#section-7.3.5 |
| `"uri-template"`          | Resource Identifiers | https://json-schema.org/draft/2020-12/json-schema-validation.html#section-7.3.6 |
| `"json-pointer"`          | JSON Pointer         | https://json-schema.org/draft/2020-12/json-schema-validation.html#section-7.3.7 |
| `"relative-json-pointer"` | JSON Pointer         | https://json-schema.org/draft/2020-12/json-schema-validation.html#section-7.3.7 |
| `"regex"`                 | Regular Expressions  | https://json-schema.org/draft/2020-12/json-schema-validation.html#section-7.3.8 |
