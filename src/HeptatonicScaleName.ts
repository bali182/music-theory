import {
  AeolianIntervals,
  DorianIntervals,
  IonianIntervals,
  LocrianIntervals,
  LydianIntervals,
  MixolydianIntervals,
  PhrygianIntervals,
} from './ScaleIntervals'

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

  export function intervals(name: HeptatonicScaleName): number[] {
    switch (name) {
      case HeptatonicScaleName.Ionian:
        return IonianIntervals
      case HeptatonicScaleName.Dorian:
        return DorianIntervals
      case HeptatonicScaleName.Phrygian:
        return PhrygianIntervals
      case HeptatonicScaleName.Lydian:
        return LydianIntervals
      case HeptatonicScaleName.Mixolydian:
        return MixolydianIntervals
      case HeptatonicScaleName.Aeolian:
        return AeolianIntervals
      case HeptatonicScaleName.Locrian:
        return LocrianIntervals
    }
  }
}
