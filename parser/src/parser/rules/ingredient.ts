import { Ingredient } from "../../ast/node"
import { QuotedRule } from "../rule"

const OPENING = "["
const CLOSING = "]"

export const IngredientRule: QuotedRule<Ingredient, null> = {
  OPENING,
  CLOSING,
  parse: (parser) => {
    return new Ingredient()
  }
}
