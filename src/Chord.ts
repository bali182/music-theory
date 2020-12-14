import { ChordTone } from './ChordTone'
import { Note } from './Note'

export abstract class Chord {
  private readonly _chordTones: ReadonlyArray<ChordTone>

  constructor(chordTones: ChordTone[]) {
    this._chordTones = Object.freeze(Array.from(chordTones))
    Object.freeze(this)
  }

  public chordTones(): ReadonlyArray<ChordTone> {
    return this._chordTones
  }

  public notes(): Note[] {
    return this.chordTones().map((tone) => tone.note())
  }
}
