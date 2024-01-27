import { Step, type StepContent } from "../../ast/node"
import { Parser } from "../../parser"
import { type ParseRule, defineCompositeParser } from "../rule"
import { CookwareRule } from "./cookware"
import { DurationRule } from "./duration"
import { IngredientRule } from "./ingredient"

const SEPERATORS = ["[", "{", "<", "\n"]

const RULES = {
  "[": IngredientRule,
  "{": CookwareRule,
  "<": DurationRule
}

const parseContent = defineCompositeParser<StepContent>({
  SEPERATORS,
  RULES,
  isAtEnd: (ch) => ch === "\n" || ch === "\0"
})

export const StepRule: ParseRule<Step> = {
  parse: (parser) => {
    // TODO: parse step kind
    const content = parseContent(parser)
    const step = new Step("requried", content)

    return step
  }
}

const sample = "* Add [#(125)@(g) (flour)], [#(250)@(ml) (milk)] and [#(1)@(pinch) of (salt)]."

const parser = new Parser(sample)
console.log(StepRule.parse(parser).content)
