import { Parser } from "@/parser"
import { QuantityRule } from "@/parser/rules/quantity"
import { describe, expect, it } from "bun:test"

const parse = (source: string) => QuantityRule.parse(new Parser(source.slice(2)))

describe("quantity parse rule", () => {
  it("should parse", () => {
    const result = parse(`#(200)`)

    expect(result.text).toBe("200")
  })
})
