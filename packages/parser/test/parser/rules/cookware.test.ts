import { Parser } from "@/parser"
import { CookwareRule } from "@/parser/rules/cookware"
import { describe, it, expect } from "bun:test"

const parse = (source: string) => CookwareRule.parse(new Parser(source.slice(1)))

describe("cookware parse rule", () => {
  it("should parse without ref name", () => {
    const result = parse(`{pan}`)

    expect(result.text).toBe("pan")
    expect(result.ref.id).toBe("pan")
  })

  it("should parse with ref name", () => {
    const result = parse(`{pan|p}`)

    expect(result.text).toBe("pan")
    expect(result.ref.id).toBe("p")
  })
})
