import { Parser } from "@/parser"
import { IngredientRule } from "@/parser/rules/ingredient"
import { describe, expect, it } from "bun:test"

const parse = (source: string) => IngredientRule.parse(new Parser(source.slice(1)))

describe("ingredient parse rule", () => {
  it("should parse with name", () => {
    const result = parse(`[(your favorite topping)]`)

    expect(result.name.text).toBe("your favorite topping")
    expect(result.ref.id).toBe("your favorite topping")
    expect(result.quantity).toBeNil()
    expect(result.unit).toBeNil()
  })

  it("should parse with quantity and name", () => {
    const result = parse(`[#(3) (eggs)]`)

    expect(result.name.text).toBe("eggs")
    expect(result.ref.id).toBe("eggs")
    expect(result.quantity?.text).toBe("3")
    expect(result.unit).toBeNil()
  })

  it("should parse with quantity and name", () => {
    const result = parse(`[#(125)@(g) (flour)]`)

    expect(result.name.text).toBe("flour")
    expect(result.ref.id).toBe("flour")
    expect(result.quantity?.text).toBe("125")
    expect(result.unit?.text).toBe("g")
  })
})
