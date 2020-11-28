import { IntervalQuality } from './IntervalQuality'
import { findIndex } from './utils'

const { Perfect, Major, Minor, Augmented, Diminished } = IntervalQuality

type IntervalAsTuple = [IntervalQuality, number]

export class Interval {
  private readonly _number: number
  private readonly _quality: IntervalQuality

  constructor(number: number, quality: IntervalQuality) {
    this._number = number
    this._quality = quality
  }

  public number(): number {
    return this._number
  }

  public quality(): IntervalQuality {
    return this._quality
  }

  public isCompound(): boolean {
    return Math.abs(this.semitones()) > 12
  }

  public isSimple(): boolean {
    return !this.isCompound()
  }

  public simplify(): Interval {
    if (this.isSimple()) {
      return this
    }
    return new Interval(this.number() % 12, this.quality())
  }

  public octaves(): number {
    const num = this.number()
    if (Math.abs(num) <= 12) {
      return 0
    }
    return num > 0 ? Math.floor(num / 8) : Math.ceil(num / 8)
  }

  public simpleNumber(): number {
    const num = this.number()
    return num === 12 ? num : num % 12
  }

  public semitones() {
    const quality = this.quality()
    const simpleNumber = this.simpleNumber()
    const positiveSimpleNumber = Math.abs(simpleNumber)
    const octaves = this.octaves()

    const octaveSemitones = octaves * 12
    const simpleSemiTones = findIndex(Interval.SemitonesToInterval, (intervals) =>
      intervals.some(([q, sn]) => q === quality && positiveSimpleNumber === sn)
    )

    if (simpleSemiTones < 0) {
      throw new TypeError(`Can't determine semitones as it's an unknown interval.`)
    }

    return octaveSemitones + simpleSemiTones
  }

  public static create(number: number, quality: IntervalQuality): Interval {
    return new Interval(number, quality)
  }

  private static SemitonesToInterval: IntervalAsTuple[][] = [
    /* 0 */ [
      [Perfect, 1],
      [Diminished, 2],
    ],
    /* 1 */ [
      [Minor, 2],
      [Augmented, 1],
    ],
    /* 2 */ [
      [Major, 2],
      [Diminished, 3],
    ],
    /* 3 */ [
      [Minor, 3],
      [Augmented, 2],
    ],
    /* 4 */ [
      [Major, 3],
      [Diminished, 4],
    ],
    /* 5 */ [
      [Perfect, 4],
      [Augmented, 3],
    ],
    /* 6 */ [
      [Augmented, 4],
      [Diminished, 5],
    ],
    /* 7 */ [
      [Perfect, 5],
      [Diminished, 6],
    ],
    /* 8 */ [
      [Minor, 6],
      [Augmented, 5],
    ],
    /* 9 */ [
      [Major, 6],
      [Diminished, 7],
    ],
    /* 10 */ [
      [Minor, 7],
      [Augmented, 6],
    ],
    /* 11 */ [
      [Major, 7],
      [Diminished, 8],
    ],
    /* 12 */ [
      [Perfect, 8],
      [Augmented, 7],
    ],
  ]
}
