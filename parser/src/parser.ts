import { State } from "./parser/state"

export class Parser {
  state: State

  constructor(source: string)
  constructor(state: State)
  constructor(source: string | State) {
    this.state = source instanceof State ? source : new State(source)
  }

  advance() {
    return this.state.source[this.state.current++] ?? "\0"
  }

  peek() {
    return this.state.source[this.state.current] ?? "\0"
  }

  peekNext() {
    return this.state.source[this.state.current + 1] ?? "\0"
  }

  advanceWhile(pred: (next: string) => boolean) {
    while (!this.isAtEnd() && pred(this.peek())) this.advance()
    return [this.peek(), this.state.current] as const
  }

  peekWhile(pred: (next: string) => boolean) {
    let current = this.state.current
    while (current < this.state.end && pred(this.state.source[current])) current++
    return [this.state.source[current], current] as const
  }

  isAtEnd() {
    return this.state.current >= this.state.end
  }

  resetAt(index: number) {
    this.state.current = index
  }

  substring(start: number, end: number) {
    return this.state.source.substring(start, end)
  }
}
