import { Cookware, Ref } from "../../ast/node"
import type { QuotedRule } from "../rule"

const CLOSING = "}"

const SEPARATORS = ["|", "}"]

export const CookwareRule: QuotedRule<Cookware> = {
  CLOSING,
  parse: (parser) => {
    const start = parser.current
    const [closing] = parser.advanceWhile((ch) => !SEPARATORS.includes(ch))
    const name = parser.substring(start, parser.current)

    let ref: Ref | undefined = undefined

    if (closing === "|") {
      const start = parser.current + 1
      parser.advanceWhile((ch) => ch !== CLOSING)
      ref = new Ref(parser.substring(start, parser.current))
    }

    return new Cookware(name, ref)
  }
}
