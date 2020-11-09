import { NoteAccidental } from './NoteAccidental'
import { NoteName } from './NoteName'

const ChromaOrder = {
  [NoteName.C]: 0,
  [NoteName.D]: 2,
  [NoteName.E]: 4,
  [NoteName.F]: 5,
  [NoteName.G]: 7,
  [NoteName.A]: 9,
  [NoteName.B]: 11,
}

export class Note {
  public readonly name: NoteName
  public readonly accidentals: ReadonlyArray<NoteAccidental>

  public constructor(name: NoteName, accidentals: NoteAccidental[]) {
    this.name = name
    this.accidentals = accidentals
  }

  public get chroma(): number {
    const noteChroma = ChromaOrder[this.name]
    const accidentals = this.accidentals.reduce((sum, acc) => sum + (acc === NoteAccidental.Flat ? -1 : +1), 0)
    return (((noteChroma + accidentals) % 12) + 12) % 12
  }

  public transpose(): Note {
    return this
  }
}

export function note(name: NoteName, ...accidentals: NoteAccidental[]): Note {
  return new Note(name, accidentals)
}
