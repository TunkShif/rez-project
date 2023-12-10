export type Position = { line: number; column: number; offset: number }

export type Range = { start: Position; end: Position }

export type Node = Step | Ingredient | Cookware | Duration | Text | Name | Unit | Quantity | Ref

export type StepKind = "requried" | "optional"

export type StepContent = Text | Ingredient | Cookware | Duration

export class Step {
  kind: StepKind
  content: StepContent[]

  constructor(kind: StepKind, content: StepContent[] = []) {
    this.kind = kind
    this.content = content
  }

  addText(text: string) {
    this.content.push(new Text(text))
  }
}

// TODO
export class Ingredient {
  name: Name
  unit: Unit | null
  quantity: Quantity | null
  content: (Quantity | Unit | Name | Text)[]
  constructor() { }
}

export class Cookware {
  name: string
  ref: Ref

  constructor(name: string, ref?: Ref) {
    this.name = name
    this.ref = ref ?? new Ref(name)
  }
}

export type Duration = {
  type: "duration"
  text: string
}

export class Text {
  text: string

  constructor(text: string) {
    this.text = text
  }
}

export type Quantity = {
  type: "quantity"
  text: string
}

export type Unit = {
  type: "unit"
  text: string
}

export type Name = {
  type: "name"
  text: string
  ref: Ref
}

export class Ref {
  id: string
  constructor(id: string) {
    this.id = id
  }
}
