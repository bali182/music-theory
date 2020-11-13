import { times } from './utils'

export enum NoteAccidental {
  Sharp = '#',
  Flat = 'b',
}

export namespace NoteAccidental {
  export const Values: ReadonlyArray<NoteAccidental> = Object.freeze([NoteAccidental.Sharp, NoteAccidental.Flat])

  export function flats(amount: number): ReadonlyArray<NoteAccidental> {
    return times(amount, NoteAccidental.Flat)
  }

  export function sharps(amount: number): ReadonlyArray<NoteAccidental> {
    return times(amount, NoteAccidental.Sharp)
  }
}
