import { Note } from './Note'
import { NoteAccidental } from './NoteAccidental'
import { PitchClass } from './PitchClass'
import { NoteName } from './NoteName'

describe(Note.constructor.name, () => {
  const { Sharp, Flat, sharps, flats } = NoteAccidental
  const { create: note } = Note

  describe(Note.prototype.pitchClass.name, () => {
    it('should return the right chroma for notes without accidentals', () => {
      expect(note(NoteName.C).pitchClass()).toBe(PitchClass.C)
      expect(note(NoteName.D).pitchClass()).toBe(PitchClass.D)
      expect(note(NoteName.E).pitchClass()).toBe(PitchClass.E)
      expect(note(NoteName.F).pitchClass()).toBe(PitchClass.F)
      expect(note(NoteName.G).pitchClass()).toBe(PitchClass.G)
      expect(note(NoteName.A).pitchClass()).toBe(PitchClass.A)
      expect(note(NoteName.B).pitchClass()).toBe(PitchClass.B)
    })
    it('should return the right chroma for sharp notes', () => {
      expect(note(NoteName.C, Sharp).pitchClass()).toBe(PitchClass.CSharpDFlat)
      expect(note(NoteName.D, Sharp).pitchClass()).toBe(PitchClass.DSharpEFlat)
      expect(note(NoteName.E, Sharp).pitchClass()).toBe(PitchClass.F)
      expect(note(NoteName.F, Sharp).pitchClass()).toBe(PitchClass.FSharpGFlat)
      expect(note(NoteName.G, Sharp).pitchClass()).toBe(PitchClass.GSharpAFlat)
      expect(note(NoteName.A, Sharp).pitchClass()).toBe(PitchClass.ASharpBFlat)
      expect(note(NoteName.B, Sharp).pitchClass()).toBe(PitchClass.C)
    })
    it('should return the right chroma for flat notes', () => {
      expect(note(NoteName.C, Flat).pitchClass()).toBe(PitchClass.B)
      expect(note(NoteName.D, Flat).pitchClass()).toBe(PitchClass.CSharpDFlat)
      expect(note(NoteName.E, Flat).pitchClass()).toBe(PitchClass.DSharpEFlat)
      expect(note(NoteName.F, Flat).pitchClass()).toBe(PitchClass.E)
      expect(note(NoteName.G, Flat).pitchClass()).toBe(PitchClass.FSharpGFlat)
      expect(note(NoteName.A, Flat).pitchClass()).toBe(PitchClass.GSharpAFlat)
      expect(note(NoteName.B, Flat).pitchClass()).toBe(PitchClass.ASharpBFlat)
    })
    it('should return the right chroma for many sharps/flats', () => {
      expect(note(NoteName.C, ...flats(3)).pitchClass()).toBe(PitchClass.A)
      expect(note(NoteName.B, ...sharps(3)).pitchClass()).toBe(PitchClass.D)
    })
  })

  describe(Note.prototype.transpose.name, () => {
    it('should return the original note when transposing with 0', () => {
      const n = note(NoteName.B, Flat)
      expect(n.transpose(0)).toBe(n)
    })

    it('should transpose from whole tones to whole tones', () => {
      expect(note(NoteName.C).transpose(2)).toEqualNote(note(NoteName.D))
      expect(note(NoteName.D).transpose(2)).toEqualNote(note(NoteName.E))
      expect(note(NoteName.E).transpose(1)).toEqualNote(note(NoteName.F))
      expect(note(NoteName.F).transpose(2)).toEqualNote(note(NoteName.G))
      expect(note(NoteName.G).transpose(2)).toEqualNote(note(NoteName.A))
      expect(note(NoteName.A).transpose(2)).toEqualNote(note(NoteName.B))
      expect(note(NoteName.B).transpose(1)).toEqualNote(note(NoteName.C))
    })

    it('should transpose from semitones to whole tones up', () => {
      expect(note(NoteName.C, Sharp).transpose(1)).toEqualNote(note(NoteName.D))
      expect(note(NoteName.D, Sharp).transpose(1)).toEqualNote(note(NoteName.E))
      expect(note(NoteName.F, Sharp).transpose(1)).toEqualNote(note(NoteName.G))
      expect(note(NoteName.G, Sharp).transpose(1)).toEqualNote(note(NoteName.A))
      expect(note(NoteName.A, Sharp).transpose(1)).toEqualNote(note(NoteName.B))
    })

    it('should transpose from semitones to whole tones down', () => {
      expect(note(NoteName.D, Flat).transpose(-1)).toEqualNote(note(NoteName.C))
      expect(note(NoteName.E, Flat).transpose(-1)).toEqualNote(note(NoteName.D))
      expect(note(NoteName.G, Flat).transpose(-1)).toEqualNote(note(NoteName.F))
      expect(note(NoteName.A, Flat).transpose(-1)).toEqualNote(note(NoteName.G))
      expect(note(NoteName.B, Flat).transpose(-1)).toEqualNote(note(NoteName.A))
    })

    it('should transpose all intervals up', () => {
      expect(note(NoteName.C).transpose(1)).toEqualNote(note(NoteName.C, Sharp))
      expect(note(NoteName.C).transpose(2)).toEqualNote(note(NoteName.D))
      expect(note(NoteName.C).transpose(3)).toEqualNote(note(NoteName.D, Sharp))
      expect(note(NoteName.C).transpose(4)).toEqualNote(note(NoteName.E))
      expect(note(NoteName.C).transpose(5)).toEqualNote(note(NoteName.F))
      expect(note(NoteName.C).transpose(6)).toEqualNote(note(NoteName.F, Sharp))
      expect(note(NoteName.C).transpose(7)).toEqualNote(note(NoteName.G))
      expect(note(NoteName.C).transpose(8)).toEqualNote(note(NoteName.G, Sharp))
      expect(note(NoteName.C).transpose(9)).toEqualNote(note(NoteName.A))
      expect(note(NoteName.C).transpose(10)).toEqualNote(note(NoteName.A, Sharp))
      expect(note(NoteName.C).transpose(11)).toEqualNote(note(NoteName.B))
      expect(note(NoteName.C).transpose(12)).toEqualNote(note(NoteName.C))
    })
    it('should transpose all intervals down', () => {
      expect(note(NoteName.C).transpose(-1)).toEqualNote(note(NoteName.B))
      expect(note(NoteName.C).transpose(-2)).toEqualNote(note(NoteName.B, Flat))
      expect(note(NoteName.C).transpose(-3)).toEqualNote(note(NoteName.A))
      expect(note(NoteName.C).transpose(-4)).toEqualNote(note(NoteName.A, Flat))
      expect(note(NoteName.C).transpose(-5)).toEqualNote(note(NoteName.G))
      expect(note(NoteName.C).transpose(-6)).toEqualNote(note(NoteName.G, Flat))
      expect(note(NoteName.C).transpose(-7)).toEqualNote(note(NoteName.F))
      expect(note(NoteName.C).transpose(-8)).toEqualNote(note(NoteName.E))
      expect(note(NoteName.C).transpose(-9)).toEqualNote(note(NoteName.E, Flat))
      expect(note(NoteName.C).transpose(-10)).toEqualNote(note(NoteName.D))
      expect(note(NoteName.C).transpose(-11)).toEqualNote(note(NoteName.D, Flat))
      expect(note(NoteName.C).transpose(-12)).toEqualNote(note(NoteName.C))
    })
  })

  describe(Note.prototype.transposeTo.name, () => {
    it('should move C to all whole notes the shortest way possible', () => {
      expect(note(NoteName.C).transposeTo(NoteName.C)).toEqualNote(note(NoteName.C))
      expect(note(NoteName.C).transposeTo(NoteName.D)).toEqualNote(note(NoteName.D, ...flats(2)))
      expect(note(NoteName.C).transposeTo(NoteName.E)).toEqualNote(note(NoteName.E, ...flats(4)))
      expect(note(NoteName.C).transposeTo(NoteName.F)).toEqualNote(note(NoteName.F, ...flats(5)))
      expect(note(NoteName.C).transposeTo(NoteName.G)).toEqualNote(note(NoteName.G, ...sharps(5)))
      expect(note(NoteName.C).transposeTo(NoteName.A)).toEqualNote(note(NoteName.A, ...sharps(3)))
      expect(note(NoteName.C).transposeTo(NoteName.B)).toEqualNote(note(NoteName.B, Sharp))
    })

    it('should move all notes to C base the shortest way possible', () => {
      expect(note(NoteName.D).transposeTo(NoteName.C)).toEqualNote(note(NoteName.C, ...sharps(2)))
      expect(note(NoteName.D, Sharp).transposeTo(NoteName.C)).toEqualNote(note(NoteName.C, ...sharps(3)))
      expect(note(NoteName.D, Flat).transposeTo(NoteName.C)).toEqualNote(note(NoteName.C, Sharp))

      expect(note(NoteName.E).transposeTo(NoteName.C)).toEqualNote(note(NoteName.C, ...sharps(4)))
      expect(note(NoteName.E, Sharp).transposeTo(NoteName.C)).toEqualNote(note(NoteName.C, ...sharps(5)))
      expect(note(NoteName.E, Flat).transposeTo(NoteName.C)).toEqualNote(note(NoteName.C, ...sharps(3)))

      expect(note(NoteName.F).transposeTo(NoteName.C)).toEqualNote(note(NoteName.C, ...sharps(5)))
      expect(note(NoteName.F, Sharp).transposeTo(NoteName.C)).toEqualNote(note(NoteName.C, ...sharps(6)))
      expect(note(NoteName.F, Flat).transposeTo(NoteName.C)).toEqualNote(note(NoteName.C, ...sharps(4)))

      expect(note(NoteName.G).transposeTo(NoteName.C)).toEqualNote(note(NoteName.C, ...flats(5)))
      expect(note(NoteName.G, Sharp).transposeTo(NoteName.C)).toEqualNote(note(NoteName.C, ...flats(4)))
      expect(note(NoteName.G, Flat).transposeTo(NoteName.C)).toEqualNote(note(NoteName.C, ...sharps(6)))

      expect(note(NoteName.A).transposeTo(NoteName.C)).toEqualNote(note(NoteName.C, ...flats(3)))
      expect(note(NoteName.A, Sharp).transposeTo(NoteName.C)).toEqualNote(note(NoteName.C, ...flats(2)))
      expect(note(NoteName.A, Flat).transposeTo(NoteName.C)).toEqualNote(note(NoteName.C, ...flats(4)))

      expect(note(NoteName.B).transposeTo(NoteName.C)).toEqualNote(note(NoteName.C, Flat))
      expect(note(NoteName.B, Sharp).transposeTo(NoteName.C)).toEqualNote(note(NoteName.C))
      expect(note(NoteName.B, Flat).transposeTo(NoteName.C)).toEqualNote(note(NoteName.C, ...flats(2)))
    })
  })
})
