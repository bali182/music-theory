import { PitchClass } from './PitchClass'

export enum NoteName {
  C = 'C',
  D = 'D',
  E = 'E',
  F = 'F',
  G = 'G',
  A = 'A',
  B = 'B',
}

export namespace NoteName {
  export const Values: ReadonlyArray<NoteName> = Object.freeze([
    NoteName.C,
    NoteName.D,
    NoteName.E,
    NoteName.F,
    NoteName.G,
    NoteName.A,
    NoteName.B,
  ])

  export function toPitchClass(note: NoteName): PitchClass {
    switch (note) {
      case NoteName.C:
        return PitchClass.C
      case NoteName.D:
        return PitchClass.D
      case NoteName.E:
        return PitchClass.E
      case NoteName.F:
        return PitchClass.F
      case NoteName.G:
        return PitchClass.G
      case NoteName.A:
        return PitchClass.A
      case NoteName.B:
        return PitchClass.B
    }
  }

  export function from(note: NoteName): ReadonlyArray<NoteName> {
    const index = NoteName.Values.indexOf(note)
    const end = NoteName.Values.slice(0, index)
    const start = NoteName.Values.slice(index)
    return Object.freeze(start.concat(end))
  }
}
