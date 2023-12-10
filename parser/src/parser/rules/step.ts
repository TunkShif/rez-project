import { Step, StepKind } from "../../ast/node"
import { Parser } from "../../parser"
import { ParseRule } from "../rule"
import { State } from "../state"
import { CookwareRule } from "./cookware"
import { DurationRule } from "./duration"
import { IngredientRule } from "./ingredient"

const SEPERATORS = ["[", "{", "<", "\n"]

const RULES = {
  "[": IngredientRule,
  "{": CookwareRule,
  "<": DurationRule
}

export const StepRule: ParseRule<Step, { kind: StepKind }> = {
  parse: (parser, meta) => {
    const step = new Step(meta.kind)

    let start: number

    while (true) {
      start = parser.state.current

      // advance until a opening token is found or reaching the end of step
      const [opening, openAt] = parser.advanceWhile((c) => !SEPERATORS.includes(c))

      // end parsing when reaching the end of line or the end of file
      const isAtStepEnd = opening === "\n" || opening === "\0"
      if (isAtStepEnd) break

      // consume the opening token
      parser.advance()

      const rule = RULES[opening as "[" | "{" | "<"]

      // try finding a matching closing token
      const [closing, closedAt] = parser.peekWhile(
        (c) => ![rule.CLOSING, ...SEPERATORS].includes(c)
      )

      if (closing !== rule.CLOSING) {
        // when a matching closing token is not found, parse it as text
        step.addText(parser.substring(start, closedAt))
        parser.resetAt(closedAt)
        continue
      } else {
        // when a matching closing token is found, parse it with according rule

        if (start !== openAt) {
          step.addText(parser.substring(start, openAt))
        }

        const state: State = { ...parser.state, end: closedAt }
        const parsed = rule.parse(new Parser(state), null)
        step.content.push(parsed)
        parser.resetAt(closedAt + 1)
      }
    }

    const current = parser.state.current
    if (start !== current) {
      step.addText(parser.substring(start, current))
    }

    return step
  }
}

const sample = "Crack [3 eggs] into a blender and [foobar]."
const parser = new Parser(sample)
console.log(StepRule.parse(parser, { kind: "requried" }))
