export enum PitchClass {
  C = 'C',
  CSharpDFlat = 'C#/Db',
  D = 'D',
  DSharpEFlat = 'D#/Eb',
  E = 'E',
  F = 'F',
  FSharpGFlat = 'F#/Gb',
  G = 'G',
  GSharpAFlat = 'G#/Ab',
  A = 'A',
  ASharpBFlat = 'A#/Bb',
  B = 'B',
}

export namespace PitchClass {
  export const Values: ReadonlyArray<PitchClass> = Object.freeze([
    PitchClass.C,
    PitchClass.CSharpDFlat,
    PitchClass.D,
    PitchClass.DSharpEFlat,
    PitchClass.E,
    PitchClass.F,
    PitchClass.FSharpGFlat,
    PitchClass.G,
    PitchClass.GSharpAFlat,
    PitchClass.A,
    PitchClass.ASharpBFlat,
    PitchClass.B,
  ])

  const Indices: { [pitchClass: string]: number } = Object.freeze(
    Values.reduce((indices, pitchClass, index) => ({ ...indices, [pitchClass]: index }), {})
  )

  export function fromSemitones(semitones: number): PitchClass {
    return Values[((semitones % 12) + 12) % 12]
  }

  export function toSemitones(pitchClass: PitchClass): number {
    return Indices[pitchClass]
  }

  function positiveDistance(from: PitchClass, to: PitchClass): number {
    const _from = toSemitones(from)
    const _to = toSemitones(to)
    if (_from < _to) {
      return _to - _from
    } else {
      return _to + 12 - _from
    }
  }

  export function distance(from: PitchClass, to: PitchClass): number {
    const positive = positiveDistance(from, to)
    const negative = -(12 - positive)
    return (Math.abs(negative) < positive ? negative : positive) % 12
  }

  export function from(pitchClass: PitchClass): ReadonlyArray<PitchClass> {
    const index = Values.indexOf(pitchClass)
    const end = Values.slice(0, index)
    const start = Values.slice(index)
    return Object.freeze(start.concat(end))
  }
}
