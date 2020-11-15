import { Note } from './Note'
import { PitchClass } from './PitchClass'
import { throwTypeError } from './utils'

export enum TriadType {
  Major = 'Major',
  Minor = 'Minor',
  Diminished = 'Diminished',
}

export namespace TriadType {
  export const Values: ReadonlyArray<TriadType> = Object.freeze([
    TriadType.Major,
    TriadType.Minor,
    TriadType.Diminished,
  ])

  export function detect(root: Note, third: Note, fifth: Note): TriadType {
    const rootToThird = PitchClass.distance(root.pitchClass(), third.pitchClass())
    const thirdToFifth = PitchClass.distance(third.pitchClass(), fifth.pitchClass())
    if (rootToThird === 4 && thirdToFifth === 3) {
      return TriadType.Major
    } else if (rootToThird === 3 && thirdToFifth === 4) {
      return TriadType.Minor
    } else if (rootToThird === 3 && thirdToFifth === 3) {
      return TriadType.Diminished
    }
    throw throwTypeError(`Unknown triad notes: ${root}, ${third}, ${fifth}`)
  }
}
