import { Interval } from './Interval'
import { IntervalQuality } from './IntervalQuality'

describe(Interval.constructor.name, () => {
  const { create: interval } = Interval
  const { Perfect, Minor, Major, Diminished, Augmented } = IntervalQuality

  describe(Interval.prototype.semitones.name, () => {
    xit('should return proper semitones for simple intervals', () => {
      expect(interval(1, Perfect).semitones()).toBe(0)
      expect(interval(2, Diminished).semitones()).toBe(0)

      expect(interval(2, Minor).semitones()).toBe(1)
      expect(interval(1, Augmented).semitones()).toBe(1)

      expect(interval(2, Major).semitones()).toBe(2)
      expect(interval(3, Diminished).semitones()).toBe(2)

      expect(interval(3, Minor).semitones()).toBe(3)
      expect(interval(2, Augmented).semitones()).toBe(3)

      expect(interval(3, Major).semitones()).toBe(4)
      expect(interval(4, Diminished).semitones()).toBe(4)

      expect(interval(4, Perfect).semitones()).toBe(5)
      expect(interval(3, Augmented).semitones()).toBe(5)

      expect(interval(4, Augmented).semitones()).toBe(6)
      expect(interval(5, Diminished).semitones()).toBe(6)

      expect(interval(5, Perfect).semitones()).toBe(7)
      expect(interval(6, Diminished).semitones()).toBe(7)

      expect(interval(6, Minor).semitones()).toBe(8)
      expect(interval(5, Augmented).semitones()).toBe(8)

      expect(interval(6, Major).semitones()).toBe(9)
      expect(interval(7, Diminished).semitones()).toBe(9)

      expect(interval(7, Minor).semitones()).toBe(10)
      expect(interval(6, Augmented).semitones()).toBe(10)

      expect(interval(7, Major).semitones()).toBe(11)
      expect(interval(8, Diminished).semitones()).toBe(11)

      expect(interval(8, Perfect).semitones()).toBe(12)
      expect(interval(7, Augmented).semitones()).toBe(12)
    })

    xit('should return proper semitones for compund intervals', () => {
      expect(interval(9, Minor).semitones()).toBe(13)
      expect(interval(10, Diminished).semitones()).toBe(13)
    })
  })
})
