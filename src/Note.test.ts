import { Note, note } from './Note'
import { NoteAccidental } from './NoteAccidental'
import { NoteName } from './NoteName'
import { PitchClass } from './PitchClass'

describe('Note', () => {
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
      expect(note(NoteName.C, NoteAccidental.Sharp).pitchClass()).toBe(PitchClass.CSharpDFlat)
      expect(note(NoteName.D, NoteAccidental.Sharp).pitchClass()).toBe(PitchClass.DSharpEFlat)
      expect(note(NoteName.E, NoteAccidental.Sharp).pitchClass()).toBe(PitchClass.F)
      expect(note(NoteName.F, NoteAccidental.Sharp).pitchClass()).toBe(PitchClass.FSharpGFlat)
      expect(note(NoteName.G, NoteAccidental.Sharp).pitchClass()).toBe(PitchClass.GSharpAFlat)
      expect(note(NoteName.A, NoteAccidental.Sharp).pitchClass()).toBe(PitchClass.ASharpBFlat)
      expect(note(NoteName.B, NoteAccidental.Sharp).pitchClass()).toBe(PitchClass.C)
    })
    it('should return the right chroma for flat notes', () => {
      expect(note(NoteName.C, NoteAccidental.Flat).pitchClass()).toBe(PitchClass.B)
      expect(note(NoteName.D, NoteAccidental.Flat).pitchClass()).toBe(PitchClass.CSharpDFlat)
      expect(note(NoteName.E, NoteAccidental.Flat).pitchClass()).toBe(PitchClass.DSharpEFlat)
      expect(note(NoteName.F, NoteAccidental.Flat).pitchClass()).toBe(PitchClass.E)
      expect(note(NoteName.G, NoteAccidental.Flat).pitchClass()).toBe(PitchClass.FSharpGFlat)
      expect(note(NoteName.A, NoteAccidental.Flat).pitchClass()).toBe(PitchClass.GSharpAFlat)
      expect(note(NoteName.B, NoteAccidental.Flat).pitchClass()).toBe(PitchClass.ASharpBFlat)
    })
    it('should return the right chroma for many sharps/flats', () => {
      expect(note(NoteName.C, NoteAccidental.Flat, NoteAccidental.Flat, NoteAccidental.Flat).pitchClass()).toBe(
        PitchClass.A
      )
      expect(note(NoteName.B, NoteAccidental.Sharp, NoteAccidental.Sharp, NoteAccidental.Sharp).pitchClass()).toBe(
        PitchClass.D
      )
    })
  })

  describe(Note.prototype.transpose.name, () => {
    it('should return the original note when transposing with 0', () => {
      const n = note(NoteName.B, NoteAccidental.Flat)
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
      expect(note(NoteName.C, NoteAccidental.Sharp).transpose(1)).toEqualNote(note(NoteName.D))
      expect(note(NoteName.D, NoteAccidental.Sharp).transpose(1)).toEqualNote(note(NoteName.E))
      expect(note(NoteName.F, NoteAccidental.Sharp).transpose(1)).toEqualNote(note(NoteName.G))
      expect(note(NoteName.G, NoteAccidental.Sharp).transpose(1)).toEqualNote(note(NoteName.A))
      expect(note(NoteName.A, NoteAccidental.Sharp).transpose(1)).toEqualNote(note(NoteName.B))
    })

    it('should transpose from semitones to whole tones down', () => {
      expect(note(NoteName.D, NoteAccidental.Flat).transpose(-1)).toEqualNote(note(NoteName.C))
      expect(note(NoteName.E, NoteAccidental.Flat).transpose(-1)).toEqualNote(note(NoteName.D))
      expect(note(NoteName.G, NoteAccidental.Flat).transpose(-1)).toEqualNote(note(NoteName.F))
      expect(note(NoteName.A, NoteAccidental.Flat).transpose(-1)).toEqualNote(note(NoteName.G))
      expect(note(NoteName.B, NoteAccidental.Flat).transpose(-1)).toEqualNote(note(NoteName.A))
    })

    it('should transpose all intervals up', () => {
      expect(note(NoteName.C).transpose(1)).toEqualNote(note(NoteName.C, NoteAccidental.Sharp))
      expect(note(NoteName.C).transpose(2)).toEqualNote(note(NoteName.D))
      expect(note(NoteName.C).transpose(3)).toEqualNote(note(NoteName.D, NoteAccidental.Sharp))
      expect(note(NoteName.C).transpose(4)).toEqualNote(note(NoteName.E))
      expect(note(NoteName.C).transpose(5)).toEqualNote(note(NoteName.F))
      expect(note(NoteName.C).transpose(6)).toEqualNote(note(NoteName.F, NoteAccidental.Sharp))
      expect(note(NoteName.C).transpose(7)).toEqualNote(note(NoteName.G))
      expect(note(NoteName.C).transpose(8)).toEqualNote(note(NoteName.G, NoteAccidental.Sharp))
      expect(note(NoteName.C).transpose(9)).toEqualNote(note(NoteName.A))
      expect(note(NoteName.C).transpose(10)).toEqualNote(note(NoteName.A, NoteAccidental.Sharp))
      expect(note(NoteName.C).transpose(11)).toEqualNote(note(NoteName.B))
      expect(note(NoteName.C).transpose(12)).toEqualNote(note(NoteName.C))
    })
    it('should transpose all intervals down', () => {
      expect(note(NoteName.C).transpose(-1)).toEqualNote(note(NoteName.B))
      expect(note(NoteName.C).transpose(-2)).toEqualNote(note(NoteName.B, NoteAccidental.Flat))
      expect(note(NoteName.C).transpose(-3)).toEqualNote(note(NoteName.A))
      expect(note(NoteName.C).transpose(-4)).toEqualNote(note(NoteName.A, NoteAccidental.Flat))
      expect(note(NoteName.C).transpose(-5)).toEqualNote(note(NoteName.G))
      expect(note(NoteName.C).transpose(-6)).toEqualNote(note(NoteName.G, NoteAccidental.Flat))
      expect(note(NoteName.C).transpose(-7)).toEqualNote(note(NoteName.F))
      expect(note(NoteName.C).transpose(-8)).toEqualNote(note(NoteName.E))
      expect(note(NoteName.C).transpose(-9)).toEqualNote(note(NoteName.E, NoteAccidental.Flat))
      expect(note(NoteName.C).transpose(-10)).toEqualNote(note(NoteName.D))
      expect(note(NoteName.C).transpose(-11)).toEqualNote(note(NoteName.D, NoteAccidental.Flat))
      expect(note(NoteName.C).transpose(-12)).toEqualNote(note(NoteName.C))
    })
  })

  describe(Note.prototype.transposeTo.name, () => {
    it('should do something', () => {
      console.log(note(NoteName.C).transposeTo(1, NoteName.D).toString())
    })
  })
})
