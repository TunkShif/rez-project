import { Name } from "../../ast/node"
import { QuotedRule } from "../rule"

const CLOSING = ")"

export const NameRule: QuotedRule<Name> = {
  CLOSING,
  parse: (parser) => {
    const start = parser.current
    parser.advanceWhile((ch) => ch !== CLOSING)
    const name = parser.substring(start, parser.current)
    return new Name(name)
  }
}
