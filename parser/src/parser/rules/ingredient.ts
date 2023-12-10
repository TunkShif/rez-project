import { Ingredient } from "../../ast/node"
import { QuotedRule } from "../rule"

export const IngredientRule: QuotedRule<Ingredient, null> = {
  OPENING: "[",
  CLOSING: "]",
  parse: (parser) => {
    return { type: "ingredient" }
  }
}
