import { times } from './utils'

export enum Accidental {
  Sharp = '#',
  Flat = 'b',
}

export namespace Accidental {
  export const Values: ReadonlyArray<Accidental> = Object.freeze([Accidental.Sharp, Accidental.Flat])

  export function flats(amount: number): ReadonlyArray<Accidental> {
    return times(amount, Accidental.Flat)
  }

  export function sharps(amount: number): ReadonlyArray<Accidental> {
    return times(amount, Accidental.Sharp)
  }
}
