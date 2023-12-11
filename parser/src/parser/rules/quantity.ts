import { Quantity } from "../../ast/node"
import { QuotedRule } from "../rule"

const PEEK_AFTER_OPENING = "("
const CLOSING = ")"

export const QuantityRule: QuotedRule<Quantity> = {
  CLOSING,
  PEEK_AFTER_OPENING,
  parse: (parser) => {
    const start = parser.current
    parser.advanceWhile((ch) => ch !== ")")
    const name = parser.substring(start, parser.current)
    return new Quantity(name)
  }
}
