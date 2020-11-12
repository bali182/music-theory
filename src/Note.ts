import { NoteAccidental } from './NoteAccidental'
import { NoteName } from './NoteName'
import { PitchClass } from './PitchClass'
import { arraysShallowEqual, isNil, times } from './utils'

const PitchClassOrder = {
  [NoteName.C]: PitchClass.C,
  [NoteName.D]: PitchClass.D,
  [NoteName.E]: PitchClass.E,
  [NoteName.F]: PitchClass.F,
  [NoteName.G]: PitchClass.G,
  [NoteName.A]: PitchClass.A,
  [NoteName.B]: PitchClass.B,
}

const ReversePitchClassOrder = [
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

export class Note {
  private readonly _name: NoteName
  private readonly _accidentals: ReadonlyArray<NoteAccidental>

  public constructor(name: NoteName, accidentals: NoteAccidental[]) {
    this._name = name
    this._accidentals = Object.freeze(Array.from(accidentals))
  }

  public name(): NoteName {
    return this._name
  }

  public accidentals(): ReadonlyArray<NoteAccidental> {
    return this._accidentals
  }

  public pitchClass(): PitchClass {
    const noteChroma = PitchClass.toSemitones(PitchClassOrder[this.name()])
    const accidentals = this.accidentals().reduce((sum, acc) => sum + (acc === NoteAccidental.Flat ? -1 : +1), 0)
    return PitchClass.fromSemitones(noteChroma + accidentals)
  }

  public chroma(): number {
    return PitchClass.toSemitones(this.pitchClass())
  }

  public transposeTo(semitones: number, target: NoteName): Note {
    if (semitones === 0 && this.name() === target) {
      return this
    }
    const targetNotePitchClass = PitchClassOrder[target]
    const targetPitchClass = PitchClass.fromSemitones(this.chroma() + semitones)
    const distance = PitchClass.distance(targetPitchClass, targetNotePitchClass)
    return new Note(target, times(distance, distance > 0 ? NoteAccidental.Sharp : NoteAccidental.Flat))
  }

  public transpose(semitones: number, prefAcc: NoteAccidental = null): Note {
    if (semitones === 0) {
      return this
    }
    const newPitchClass = PitchClass.fromSemitones(this.chroma() + semitones)
    const noteNames = ReversePitchClassOrder[PitchClass.toSemitones(newPitchClass)]
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
    return `${this.name()}${this.accidentals().join('')}`
  }

  public equals(other: Note): boolean {
    return !isNil(other) && other.name() === this.name() && arraysShallowEqual(this.accidentals(), other.accidentals())
  }
}

export function note(name: NoteName, ...accidentals: NoteAccidental[]): Note {
  return new Note(name, accidentals)
}
