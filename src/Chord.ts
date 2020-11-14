import { ChordType } from './ChordType'
import { Note } from './Note'

export abstract class Chord<T extends ChordType> {
  private readonly _notes: ReadonlyArray<Note>
  private readonly _type: T

  constructor(notes: Note[], type: T) {
    this._notes = Object.freeze(Array.from(notes))
    this._type = type
  }

  public notes(): ReadonlyArray<Note> {
    return this._notes
  }

  public type(): T {
    return this._type
  }
}
