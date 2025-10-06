---
keyword: "patternProperties"
signature: "Object<String, Schema>"
value: This keyword must be set to an object where each key is a valid regular expression, preferably using the [ECMA-262](https://www.ecma-international.org/publications-and-standards/standards/ecma-262/) flavour, and each value is a valid JSON Schema
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

The [`patternProperties`]({{< ref "2019-09/applicator/patternproperties" >}})
keyword restricts properties of an object instance that match certain regular
expressions to match their corresponding subschemas definitions. Information
about the properties that this keyword was evaluated for is reported using
annotations.

{{<common-pitfall>}} This keyword is evaluated independently of the
[`properties`]({{< ref "2019-09/applicator/properties" >}}) keyword. If an
object property is described by both keywords, then both subschemas must
successfully validate against the given property for validation to succeed.
Furthermore, an instance property may match more than one regular expression
set with this keyword, in which case the property is expected to validate
against all matching subschemas.{{</common-pitfall>}}

{{<learning-more>}} While the specification suggests the use of
[ECMA-262](https://www.ecma-international.org/publications-and-standards/standards/ecma-262/)
regular expressions for interoperability purposes, the use of different
flavours like PCRE or POSIX (Basic or Extended) is permitted. Also, the
specification does not impose the use of any particular regular expression
flag. By convention (and somewhat enforced by the official JSON Schema test
suite), regular expressions are not implicitly
[anchored](https://www.regular-expressions.info/anchors.html) and are always
treated as case-sensitive. It is also common for the
[`DOTALL`](https://tc39.es/ecma262/multipage/text-processing.html#sec-get-regexp.prototype.dotAll)
flag to be enabled, permitting the dot character class to match new lines.

To avoid interoperability issues, stick to
[ECMA-262](https://www.ecma-international.org/publications-and-standards/standards/ecma-262/),
and don't assume the use of any regular expression flag.  {{</learning-more>}}

{{<common-pitfall>}} Regular expressions often make use of characters that need
to be escaped when making use of them as part of JSON strings. For example, the
*reverse solidus* character (more commonly known as the backslash character)
and the *double quote* character need to be escaped. Failure to do so will
result in an invalid JSON document. Applications to work with regular
expressions, like [Regex Forge](https://regexforge.com), typically provide
convenient functionality to copy a regular expression for use in JSON.
{{</common-pitfall>}}

{{<constraint-warning `object`>}}

## Examples

{{<schema `A schema that constrains object instances to enforce that lowercase properties are integers`>}}
{
  "$schema": "https://json-schema.org/draft/2019-09/schema",
  "patternProperties": {
    "^[a-z]+$": { "type": "integer" }
  }
}
{{</schema>}}

{{<instance-pass `An object value that defines only lowercase integer properties is valid`>}}
{ "foo": 1, "bar": 2, "baz": 3 }
{{</instance-pass>}}

{{<instance-annotation>}}
{ "keyword": "/patternProperties", "instance": "", "value": [ "foo", "bar", "baz" ] }
{{</instance-annotation>}}

{{<instance-pass `An object value that defines non-lowercase properties is valid`>}}
{ "CamelCase": true, "alphanumeric123": "anything is valid" }
{{</instance-pass>}}

{{<instance-pass `An empty object value is valid`>}}
{}
{{</instance-pass>}}

{{<instance-fail `An object value that defines a lowercase non-integer properties is invalid`>}}
{ "foo": "should have been an integer" }
{{</instance-fail>}}

{{<instance-pass `A non-object value is valid`>}}
"Hello World"
{{</instance-pass>}}

{{<schema `A schema that constrains object instances with two potentially overlapping regular expressions`>}}
{
  "$schema": "https://json-schema.org/draft/2019-09/schema",
  "patternProperties": {
    "^f": { "type": "string" },
    "o$": { "minLength": 3 }
  }
}
{{</schema>}}

{{<instance-pass `An object value that defines a property that matches both regular expressions and schemas is valid`>}}
{ "foo": "long string" }
{{</instance-pass>}}

{{<instance-annotation>}}
{ "keyword": "/patternProperties", "instance": "", "value": [ "foo" ] }
{{</instance-annotation>}}

{{<instance-pass `An object value that defines a property that matches one regular expression and its corresponding schema is valid`>}}
{ "boo": 1 }
{{</instance-pass>}}

{{<instance-annotation>}}
{ "keyword": "/patternProperties", "instance": "", "value": [ "boo" ] }
{{</instance-annotation>}}

{{<instance-fail `An object value that defines a property that matches both regular expressions but does not match one of the schemas is invalid`>}}
{ "foo": "xx" }
{{</instance-fail>}}

{{<instance-fail `An object value that defines a property that matches one regular expression but does not match its schema is invalid`>}}
{ "boo": "xx" }
{{</instance-fail>}}

{{<instance-pass `A non-object value is valid`>}}
"Hello World"
{{</instance-pass>}}

{{<schema `A schema that constrains object instances with overlapping static and regular expression definitions`>}}
{
  "$schema": "https://json-schema.org/draft/2019-09/schema",
  "patternProperties": {
    "^f": { "minLength": 3 }
  },
  "properties": {
    "foo": { "type": "string" }
  }
}
{{</schema>}}

{{<instance-pass `An object value that defines a property that matches both definitions and schemas is valid`>}}
{ "foo": "long string" }
{{</instance-pass>}}

{{<instance-annotation>}}
{ "keyword": "/patternProperties", "instance": "", "value": [ "foo" ] }
{ "keyword": "/properties", "instance": "", "value": [ "foo" ] }
{{</instance-annotation>}}

{{<instance-pass `An object value that defines a property that matches only the regular expression definition and its schema is valid`>}}
{ "football": 3 }
{{</instance-pass>}}

{{<instance-annotation>}}
{ "keyword": "/patternProperties", "instance": "", "value": [ "football" ] }
{{</instance-annotation>}}

{{<instance-fail `An object value that defines a property that matches both definitions but only matches one schema is invalid`>}}
{ "foo": "xx" }
{{</instance-fail>}}

{{<instance-pass `An empty object value is valid`>}}
{}
{{</instance-pass>}}

{{<instance-pass `A non-object value is valid`>}}
"Hello World"
{{</instance-pass>}}
