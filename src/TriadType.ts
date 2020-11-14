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
    const _r = root.pitchClass()
    const _t = root.pitchClass()
    const _f = root.pitchClass()

    const _rt = PitchClass.distance(_r, _t)
    const _tf = PitchClass.distance(_t, _f)
    if (_rt === 4 && _tf === 3) {
      return TriadType.Major
    } else if (_rt === 3 && _tf === 4) {
      return TriadType.Minor
    } else if (_rt === 3 && _tf === 3) {
      return TriadType.Diminished
    }
    throw throwTypeError(`Unknown triad notes: ${root}, ${third}, ${fifth}`)
  }
}
