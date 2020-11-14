export enum HeptatonicScaleName {
  Ionian = 'Ionian',
  Dorian = 'Dorian',
  Phrygian = 'Phrygian',
  Lydian = 'Lydian',
  Mixolydian = 'Mixolydian',
  Aeolian = 'Aeolian',
  Locrian = 'Locrian',
}

export namespace HeptatonicScaleName {
  export const Values: ReadonlyArray<HeptatonicScaleName> = Object.freeze([
    HeptatonicScaleName.Ionian,
    HeptatonicScaleName.Dorian,
    HeptatonicScaleName.Phrygian,
    HeptatonicScaleName.Lydian,
    HeptatonicScaleName.Mixolydian,
    HeptatonicScaleName.Aeolian,
    HeptatonicScaleName.Locrian,
  ])

  const Intervals: { [key: string]: ReadonlyArray<number> } = Object.freeze({
    [HeptatonicScaleName.Ionian]: Object.freeze([0, 2, 4, 5, 7, 9, 11]),
    [HeptatonicScaleName.Dorian]: Object.freeze([0, 2, 3, 5, 7, 9, 10]),
    [HeptatonicScaleName.Phrygian]: Object.freeze([0, 1, 3, 5, 7, 8, 10]),
    [HeptatonicScaleName.Lydian]: Object.freeze([0, 2, 4, 6, 7, 9, 11]),
    [HeptatonicScaleName.Mixolydian]: Object.freeze([0, 2, 4, 5, 7, 9, 10]),
    [HeptatonicScaleName.Aeolian]: Object.freeze([0, 2, 3, 5, 7, 8, 10]),
    [HeptatonicScaleName.Locrian]: Object.freeze([0, 1, 3, 5, 6, 8, 10]),
  })

  export function intervals(name: HeptatonicScaleName): ReadonlyArray<number> {
    return Intervals[name]
  }
}
