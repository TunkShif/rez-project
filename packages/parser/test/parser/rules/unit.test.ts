import { Parser } from "@/parser"
import { UnitRule } from "@/parser/rules/unit"
import { describe, expect, it } from "bun:test"

const parse = (source: string) => UnitRule.parse(new Parser(source.slice(2)))

describe("unit parse rule", () => {
  it("should parse", () => {
    const result = parse(`@(minutes)`)

    expect(result.text).toBe("minutes")
  })
})
