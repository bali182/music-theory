import { Interval } from './Interval'
import { Note } from './Note'
import { PitchClass } from './PitchClass'

export class ChordTone {
  private readonly _pitchClass: PitchClass
  private readonly _interval: Interval

  public constructor(pitchClass: PitchClass, interval: Interval = null) {
    this._pitchClass = pitchClass
    this._interval = interval
  }

  public interval(): Interval {
    return this._interval
  }

  public pitchClass(): PitchClass {
    return this._pitchClass
  }

  public note(): Note {
    return Note.fromPitchClass(this.pitchClass())
  }
}
