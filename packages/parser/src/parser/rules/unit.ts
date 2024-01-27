import { Unit } from "@/ast/node"
import type { QuotedRule } from "@/parser/rule"

const PEEK_AFTER_OPENING = "("
const CLOSING = ")"

export const UnitRule: QuotedRule<Unit> = {
  CLOSING,
  PEEK_AFTER_OPENING,
  parse: (parser) => {
    const start = parser.current
    parser.advanceWhile((ch) => ch !== ")")
    const name = parser.substring(start, parser.current)
    return new Unit(name)
  }
}
