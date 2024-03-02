---
keyword: "dependentRequired"
signature: "Object<String, Array<String>>"
summary: "Validation succeeds if, for each name that appears in both the instance and as a name within this keyword's value, every item in the corresponding array is also the name of a property in the instance."
kind: [ "assertion" ]
instance: [ "object" ]
specification: "https://json-schema.org/draft/2020-12/json-schema-validation.html#section-6.5.4"
metaschema: "https://json-schema.org/draft/2020-12/meta/validation"
index: -99
introduced_in: 2019-09
related:
  - vocabulary: validation
    keyword: required
  - vocabulary: applicator
    keyword: dependentSchemas
  - vocabulary: applicator
    keyword: if
  - vocabulary: applicator
    keyword: then
  - vocabulary: applicator
    keyword: else
---

The `dependentRequired` keyword specifies a conditional dependency between properties within an instance. It ensures that if a certain property is present in an instance, then another specified set of properties must also be present. In short, if property A exists in an instance, then properties B, C, and D must also be present.
* The value of this keyword must be an object.
* Properties in this object, if any, must be arrays.
* Items in each array, if any, must be strings, and must be unique.

## Examples

{{<schema `Schema with the 'dependentRequired' keyword`>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "object",
  "properties": {
    "name": { "type": "string" },
    "age": { "type": "integer" },
    "license": { "type": "string" }
  },
  "dependentRequired": {
    "license": [ "age" ]
  }
}
{{</schema>}}

{{<instance-pass `An instance with both 'age' and 'license' properties is valid`>}}
{
  "name": "John",
  "age": 25,
  "license": "XYZ123"
}
{{</instance-pass>}}

{{<instance-fail `An instance with missing 'age' property when 'license' property is present is invalid`>}}
{
  "name": "John",
  "license": "XYZ123"
}
{{</instance-fail>}}

{{<instance-pass `An instance without 'license' property is valid`>}}
{
  "name": "John",
  "age": 25
}
{{</instance-pass>}}

{{<instance-pass `An empty object is also valid`>}}
{}
{{</instance-pass>}}

{{<schema `Complex schema with the 'dependentRequired' keyword `>}}
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "object",
  "properties": {
    "productName": { "type": "string" },
    "productPriceUSD": { "type": "number" },
    "units": { "type": "number" }
  },
  "patternProperties": {
    "^paymentStatus$": { "enum": [ "success", "pending", "failed" ] }
  },
  "dependentRequired": {
    "productPriceUSD": [ "productName" ],
    "totalCost" : [ "productPriceUSD", "units" ],
    "trackingId": [ "outForDelivery", "paymentStatus" ]
  }
}
{{</schema>}}

{{<instance-pass `An instance with all the dependent properties is valid`>}}
{
  "productName": "Iphone",
  "productPriceUSD": 399.99,
  "units": 5,
  "paymentStatus": "success",
  "totalCost": 1599.99,
  "trackingId" : 1414326241,
  "outForDelivery": "yes"
}
{{</instance-pass>}}

{{<instance-fail `An instance with missing 'productPriceUSD' property when 'totalCost' property is present is invalid`>}}
{
  "productName": "Iphone",
  "units": 5,
  "paymentStatus": "success",
  "totalCost": 1599.99,
  "trackingId" : 1414326241,
  "outForDelivery": "yes"
}
{{</instance-fail>}}

{{<instance-pass `An instance with 'productName' and 'productPriceUSD' is valid`>}}
{
  "productName": "Iphone",
  "productPriceUSD": 399.99
}
// The 'totalCost' property is not present in this instance, so it will be valid regardless of the presence of 'units' or 'productPriceUSD' property.
{{</instance-pass>}}