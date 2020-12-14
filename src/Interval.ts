import { IntervalQuality } from './IntervalQuality'

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
    if (Math.abs(num) <= 8) {
      return 0
    }
    return num > 0 ? Math.floor(num / 8) : Math.ceil(num / 8)
  }

  public simpleNumber(): number {
    const num = this.number()
    return num === 8 ? num : (num % 8) + 1
  }

  public semitones() {
    return 0
  }

  public static create(number: number, quality: IntervalQuality): Interval {
    return new Interval(number, quality)
  }
}
