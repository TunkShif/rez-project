import { Cookware } from "../../ast/node"
import { QuotedRule } from "../rule"
import { State } from "../state"

const OPENING = "{"
const CLOSING = "}"

const parse = (state: State) => { }

export const CookwareRule: QuotedRule<Cookware> = {
  OPENING,
  CLOSING,
  parse
}
