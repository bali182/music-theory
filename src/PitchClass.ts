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
    PitchClass.Values.reduce((indices, pitchClass, index) => ({ ...indices, [pitchClass]: index }), {})
  )

  export function fromSemitones(semitones: number): PitchClass {
    return PitchClass.Values[((semitones % 12) + 12) % 12]
  }

  export function toSemitones(pitchClass: PitchClass): number {
    return Indices[pitchClass]
  }

  export function distance(from: PitchClass, to: PitchClass): number {
    const _from = toSemitones(from)
    const _to = toSemitones(to)
    const positive = _from < _to ? _to - _from : _to + 12 - _from
    const negative = _from < _to ? -(12 - _to + _from) : -(12 - _from + _to)

    console.log('+', positive, '-', negative)
    return Math.abs(negative) < positive ? negative : positive
  }

  export function from(pitchClass: PitchClass): ReadonlyArray<PitchClass> {
    const index = PitchClass.Values.indexOf(pitchClass)
    const end = PitchClass.Values.slice(0, index)
    const start = PitchClass.Values.slice(index)
    return Object.freeze(start.concat(end))
  }
}
