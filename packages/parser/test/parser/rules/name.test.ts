import { Parser } from "@/parser"
import { NameRule } from "@/parser/rules/name"
import { describe, expect, it } from "bun:test"

const parse = (source: string) => NameRule.parse(new Parser(source.slice(1)))

describe("name parse rule", () => {
  it("should parse", () => {
    const result = parse(`(eggs)`)

    expect(result.text).toBe("eggs")
  })
})
