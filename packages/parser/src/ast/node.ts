export type Position = { line: number; column: number; offset: number }

export type Range = { start: Position; end: Position }

const nodeSymbol = Symbol("rez-node")

export class Node {
  // for nominal type behavior
  protected __symbol = nodeSymbol
}

export class CompositeNode<ContentNode extends Node = Node> extends Node {
  content: ContentNode[]

  constructor(content?: ContentNode[]) {
    super()
    this.content = content ?? []
  }
}

export type StepKind = "requried" | "optional"

export type StepContent = Text | Ingredient | Cookware | Duration

export class Step extends CompositeNode<StepContent> {
  kind: StepKind
  details: string | null

  constructor(kind: StepKind, content?: StepContent[]) {
    super(content)
    this.kind = kind
    this.details = null
  }
}

export type IngredientContent = Quantity | Unit | Name | Text

export class Ingredient extends CompositeNode<IngredientContent> {
  name!: Name
  unit!: Unit | null
  quantity!: Quantity | null
  optional!: boolean
  ref!: Ref

  constructor(name: Name, content?: IngredientContent[]) {
    super(content)
    this.name = name
  }
}

export class Cookware extends Node {
  name: string
  ref: Ref

  constructor(name: string, ref?: Ref) {
    super()
    this.name = name
    this.ref = ref ?? new Ref(name)
  }
}

export type DurationContent = Quantity | Unit | Text

export class Duration extends CompositeNode<DurationContent> {
  time!: Quantity
  unit!: Unit

  constructor(time: Quantity, unit: Unit, content?: DurationContent[]) {
    super(content)
    this.time = time
    this.unit = unit
  }
}

export class Text extends Node {
  text: string

  constructor(text: string) {
    super()
    this.text = text
  }
}

export class Quantity extends Node {
  text: string

  constructor(text: string) {
    super()
    this.text = text
  }
}

export class Unit extends Node {
  text: string

  constructor(text: string) {
    super()
    this.text = text
  }
}

export class Name extends Node {
  name: string

  constructor(name: string) {
    super()
    this.name = name
  }
}

export class Ref extends Node {
  id: string

  constructor(id: string) {
    super()
    this.id = id
  }
}
