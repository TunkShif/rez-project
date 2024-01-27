import { Duration, type DurationContent, Quantity, Unit } from "../../ast/node"
import { type QuotedRule, defineCompositeParser } from "../rule"
import { QuantityRule } from "./quantity"
import { UnitRule } from "./unit"

const CLOSING = ">"

const SEPERATORS = ["#", "@", ">"]

const RULES = {
  "#": QuantityRule,
  "@": UnitRule
}

const parseContent = defineCompositeParser<DurationContent>({
  SEPERATORS,
  RULES,
  isAtEnd: (ch) => ch === ">"
})

export const DurationRule: QuotedRule<Duration> = {
  CLOSING,
  parse: (parser) => {
    const content = parseContent(parser)
    // TODO: warning message
    const time = content.find((c): c is Quantity => c instanceof Quantity)!
    const unit = content.find((c): c is Unit => c instanceof Unit)!
    return new Duration(time, unit, content)
  }
}
