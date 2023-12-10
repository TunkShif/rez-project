import { Node } from "../ast/node"
import { Parser } from "../parser"

export type ParseRule<Result extends Node, Meta = unknown> = {
  parse: (parser: Parser, meta: Meta) => Result
}

export type QuotedRule<Result extends Node, Meta = unknown> = ParseRule<Result, Meta> & {
  OPENING: string
  CLOSING: string
}
