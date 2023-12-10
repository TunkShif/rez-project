import { Duration } from "../../ast/node"
import { QuotedRule } from "../rule"
import { State } from "../state"

const OPENING = "<"
const CLOSING = ">"

const parse = (state: State) => { }

export const DurationRule: QuotedRule<Duration> = {
  OPENING,
  CLOSING,
  parse
}
