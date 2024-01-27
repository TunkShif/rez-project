import { Ingredient, Name, Quantity, Unit, type IngredientContent } from "@/ast/node"
import { defineCompositeParser, type QuotedRule } from "@/parser/rule"
import { NameRule } from "./name"
import { QuantityRule } from "./quantity"
import { UnitRule } from "./unit"

const CLOSING = "]"

const SEPERATORS = ["#", "@", "(", "]"]

const RULES = {
  "#": QuantityRule,
  "@": UnitRule,
  "(": NameRule
}

const parseContent = defineCompositeParser<IngredientContent>({
  SEPERATORS,
  RULES,
  isAtEnd: (ch) => ch === "]"
})

export const IngredientRule: QuotedRule<Ingredient> = {
  CLOSING,
  parse: (parser) => {
    const content = parseContent(parser)

    // TODO: warning message
    const name = content.find((c): c is Name => c instanceof Name)!
    const unit = content.find((c): c is Unit => c instanceof Unit) ?? null
    const quantity = content.find((c): c is Quantity => c instanceof Quantity) ?? null

    let ref: Ref | undefined = undefined

    // TODO: parse ref

    const ingredient = new Ingredient(name, content, ref)
    ingredient.unit = unit
    ingredient.quantity = quantity

    return ingredient
  }
}
