import { Parser } from "@/parser"
import { DurationRule } from "@/parser/rules/duration"
import { describe, expect, it } from "bun:test"

const parse = (source: string) => DurationRule.parse(new Parser(source.slice(1)))

describe("duration parse rule", () => {
  it("should parse with time and unit", () => {
    const result = parse(`<#(1~2) @(minutes)>`)

    expect(result.time.text).toBe("1~2")
    expect(result.unit.text).toBe("minutes")
  })
})
