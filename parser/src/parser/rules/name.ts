import { State } from "../state"

export const parseName = (state: State) => {
  const [ch] = state.advanceWhile((ch) => ch !== ")")
}
