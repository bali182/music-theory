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

  export function from(note: NoteName): ReadonlyArray<NoteName> {
    const index = NoteName.Values.indexOf(note)
    const end = NoteName.Values.slice(0, index)
    const start = NoteName.Values.slice(index)
    return Object.freeze(start.concat(end))
  }
}
