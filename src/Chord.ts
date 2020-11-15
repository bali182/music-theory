import { ChordType } from './ChordType'
import { Note } from './Note'
import { arraysShallowEqual, isNil } from './utils'

const PitchClassEquality = (a: Note, b: Note) => a.pitchClass() === b.pitchClass()

export abstract class Chord<T extends ChordType> {
  private readonly _notes: ReadonlyArray<Note>
  private readonly _type: T

  constructor(type: T, notes: Note[]) {
    this._notes = Object.freeze(Array.from(notes))
    this._type = type
  }

  public notes(): ReadonlyArray<Note> {
    return this._notes
  }

  public type(): T {
    return this._type
  }

  public root(): Note {
    return this.notes()[0]
  }

  public equals(other: Chord<T>): boolean {
    return (
      !isNil(other) &&
      other.type() === this.type() &&
      arraysShallowEqual(this.notes(), other.notes(), PitchClassEquality)
    )
  }

  public toString() {
    return `${this.root()} ${this.type()} [${this.notes()
      .map((note) => note.toString())
      .join(', ')}]`
  }
}
