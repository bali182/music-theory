import { Note } from './Note'
import { ScaleName } from './ScaleName'
import { Triad } from './Triad'
import { TriadType } from './TriadType'
import { arraysShallowEqual, isNil, throwTypeError } from './utils'

const NoteEquality = (a: Note, b: Note) => a.equals(b)

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

  public triad(scaleDegree: number): Triad {
    const notes = this.notes()
    if (scaleDegree < 0 || scaleDegree >= notes.length || !Number.isInteger(scaleDegree)) {
      throwTypeError(`Scale degree must be between 0 and ${notes.length} and must be an integer`)
    }
    const root = notes[scaleDegree]
    const third = notes[(scaleDegree + 2) % notes.length]
    const fifth = notes[(scaleDegree + 4) % notes.length]
    return new Triad(TriadType.detect(root, third, fifth), [root, third, fifth])
  }

  public triads(): Triad[] {
    return this.notes().map((_, scaleDegree) => this.triad(scaleDegree))
  }

  public equals(other: Scale<N>): boolean {
    return (
      !isNil(other) && other.name() === this.name() && arraysShallowEqual(this.notes(), other.notes(), NoteEquality)
    )
  }

  public toString() {
    return `${this.root()} ${this.name()} [${this.notes()
      .map((note) => note.toString())
      .join(', ')}]`
  }
}
