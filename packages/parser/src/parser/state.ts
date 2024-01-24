export class State {
  source: string
  current: number
  end: number

  constructor(source: string) {
    this.source = source
    this.current = 0
    this.end = this.source.length
  }
}
