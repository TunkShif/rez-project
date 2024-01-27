import { Node, Text } from "../ast/node"
import { Parser } from "../parser"
import { State } from "./state"

export type ParseRule<Result extends Node> = {
  parse: (parser: Parser) => Result
}

export type QuotedRule<Result extends Node> = ParseRule<Result> & {
  PEEK_AFTER_OPENING?: string
  CLOSING: string
}

type DefineCompositeParserProps = {
  RULES: Record<string, QuotedRule<Node>>
  SEPERATORS: string[]
  isAtEnd: (char: string) => boolean
}

export const defineCompositeParser =
  <Content extends Node>({ SEPERATORS, RULES, isAtEnd }: DefineCompositeParserProps) =>
  (parser: Parser): Content[] => {
    const content: Node[] = []
    let start: number

    while (true) {
      start = parser.current

      // advance until an opening token is found or reaching the end of step
      const [opening, openAt] = parser.advanceWhile((ch) => !SEPERATORS.includes(ch))

      // end parsing when reaching the end of line or the end of file
      if (isAtEnd(opening)) break

      // consume the opening token
      parser.advance()

      const rule = RULES[opening]
      const peekAfterOpening = rule?.PEEK_AFTER_OPENING

      // look for one more matching token to handle parsing `@()` and `#()`
      if (peekAfterOpening) {
        if (parser.peek() === peekAfterOpening) {
          // consume the opening token if it is found and continue
          parser.advance()
        } else {
          // parse it as a text node if it is not found and start over the loop
          content.push(new Text(parser.substring(start, parser.current)))
          continue
        }
      }

      // try finding a matching closing token for the rule
      const [closing, closedAt] = parser.peekWhile(
        (ch) => ![rule.CLOSING, ...SEPERATORS].includes(ch)
      )

      if (closing === rule.CLOSING) {
        // when a matching closing token is found, parse it with according rule
        if (start !== openAt) {
          content.push(new Text(parser.substring(start, openAt)))
        }

        const state: State = { ...parser.state, end: closedAt }
        const parsed = rule.parse(new Parser(state))
        content.push(parsed)
        parser.resetAt(closedAt + 1)
      } else {
        // when a matching closing token is not found, parse it as a text node
        content.push(new Text(parser.substring(start, closedAt)))
        parser.resetAt(closedAt)
      }
    }

    // check if there's remaining text content
    const current = parser.current
    if (start !== current) {
      content.push(new Text(parser.substring(start, current)))
    }

    return content as Content[]
  }
