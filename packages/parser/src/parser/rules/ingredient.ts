import { Ingredient, IngredientContent, Name, Quantity, Unit } from "../../ast/node"
import { QuotedRule, defineCompositeParser } from "../rule"
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
    const ingredient = new Ingredient(name, content)
    ingredient.unit = unit
    ingredient.quantity = quantity

    // TODO: parse ref
    return ingredient
  }
}
