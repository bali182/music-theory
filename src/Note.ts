import { NoteAccidental } from './NoteAccidental'
import { NoteName } from './NoteName'
import { areArraysShallowEqual, isNil, times } from './utils'

const ChromaOrder = {
  [NoteName.C]: 0,
  [NoteName.D]: 2,
  [NoteName.E]: 4,
  [NoteName.F]: 5,
  [NoteName.G]: 7,
  [NoteName.A]: 9,
  [NoteName.B]: 11,
}

const ReverseChromaOrder = [
  [NoteName.C],
  [NoteName.C, NoteName.D],
  [NoteName.D],
  [NoteName.D, NoteName.E],
  [NoteName.E],
  [NoteName.F],
  [NoteName.F, NoteName.G],
  [NoteName.G],
  [NoteName.G, NoteName.A],
  [NoteName.A],
  [NoteName.A, NoteName.B],
  [NoteName.B],
]
function normalizeChroma(rawChroma: number): number {
  return ((rawChroma % 12) + 12) % 12
}

export class Note {
  public readonly name: NoteName
  public readonly accidentals: ReadonlyArray<NoteAccidental>

  public constructor(name: NoteName, accidentals: NoteAccidental[]) {
    this.name = name
    this.accidentals = accidentals
  }

  public chroma(): number {
    const noteChroma = ChromaOrder[this.name]
    const accidentals = this.accidentals.reduce((sum, acc) => sum + (acc === NoteAccidental.Flat ? -1 : +1), 0)
    return normalizeChroma(noteChroma + accidentals)
  }

  public transposePreservingName(semitones: number): Note {
    if (semitones === 0) {
      return this
    }
    const accidentals = this.accidentals.concat(
      times(Math.abs(semitones), semitones > 0 ? NoteAccidental.Sharp : NoteAccidental.Flat)
    )
    return new Note(this.name, accidentals)
  }

  public transpose(semitones: number, prefAcc: NoteAccidental = null): Note {
    if (semitones === 0) {
      return this
    }
    const chroma = normalizeChroma(this.chroma() + semitones)
    const noteNames = ReverseChromaOrder[chroma]
    const accidental = isNil(prefAcc) ? (semitones > 0 ? NoteAccidental.Sharp : NoteAccidental.Flat) : prefAcc
    switch (noteNames.length) {
      case 1:
        return new Note(noteNames[0], [])
      case 2:
        return accidental === NoteAccidental.Flat
          ? new Note(noteNames[1], [NoteAccidental.Flat])
          : new Note(noteNames[0], [NoteAccidental.Sharp])
      default:
    }
  }

  public toString(): string {
    return `${this.name}${this.accidentals.join('')}`
  }

  public equals(other: Note): boolean {
    return !isNil(other) && other.name === this.name && areArraysShallowEqual(this.accidentals, other.accidentals)
  }
}

export function note(name: NoteName, ...accidentals: NoteAccidental[]): Note {
  return new Note(name, accidentals)
}
