import { Note } from './Note'
import { ScaleName } from './ScaleName'
import { arraysShallowEqual, isNil } from './utils'

export abstract class Scale<N extends ScaleName> {
  private readonly _name: N
  private readonly _notes: ReadonlyArray<Note>

  constructor(name: N, notes: Note[]) {
    this._name = name
    this._notes = Object.freeze(Array.from(notes))
  }

  public name(): N {
    return this._name
  }

  public notes(): ReadonlyArray<Note> {
    return this._notes
  }

  public root(): Note {
    return this.notes()[0]
  }

  public equals(other: Scale<N>): boolean {
    return (
      !isNil(other) &&
      other.name() === this.name() &&
      arraysShallowEqual(this.notes(), other.notes(), (a, b) => a.equals(b))
    )
  }

  public toString() {
    return `${this.root()} ${this.name()} [${this.notes()
      .map((note) => note.toString())
      .join(', ')}]`
  }
}
