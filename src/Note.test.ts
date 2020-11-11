import { Note, note } from './Note'
import { NoteAccidental } from './NoteAccidental'
import { NoteName } from './NoteName'

describe('Note', () => {
  describe(Note.prototype.chroma.name, () => {
    it('should return the right chroma for notes without accidentals', () => {
      expect(note(NoteName.C).chroma()).toBe(0)
      expect(note(NoteName.D).chroma()).toBe(2)
      expect(note(NoteName.E).chroma()).toBe(4)
      expect(note(NoteName.F).chroma()).toBe(5)
      expect(note(NoteName.G).chroma()).toBe(7)
      expect(note(NoteName.A).chroma()).toBe(9)
      expect(note(NoteName.B).chroma()).toBe(11)
    })
    it('should return the right chroma for sharp notes', () => {
      expect(note(NoteName.C, NoteAccidental.Sharp).chroma()).toBe(1)
      expect(note(NoteName.D, NoteAccidental.Sharp).chroma()).toBe(3)
      expect(note(NoteName.E, NoteAccidental.Sharp).chroma()).toBe(5)
      expect(note(NoteName.F, NoteAccidental.Sharp).chroma()).toBe(6)
      expect(note(NoteName.G, NoteAccidental.Sharp).chroma()).toBe(8)
      expect(note(NoteName.A, NoteAccidental.Sharp).chroma()).toBe(10)
      expect(note(NoteName.B, NoteAccidental.Sharp).chroma()).toBe(0)
    })
    it('should return the right chroma for flat notes', () => {
      expect(note(NoteName.C, NoteAccidental.Flat).chroma()).toBe(11)
      expect(note(NoteName.D, NoteAccidental.Flat).chroma()).toBe(1)
      expect(note(NoteName.E, NoteAccidental.Flat).chroma()).toBe(3)
      expect(note(NoteName.F, NoteAccidental.Flat).chroma()).toBe(4)
      expect(note(NoteName.G, NoteAccidental.Flat).chroma()).toBe(6)
      expect(note(NoteName.A, NoteAccidental.Flat).chroma()).toBe(8)
      expect(note(NoteName.B, NoteAccidental.Flat).chroma()).toBe(10)
    })
    it('should return the right chroma for many sharps/flats', () => {
      expect(note(NoteName.C, NoteAccidental.Flat, NoteAccidental.Flat, NoteAccidental.Flat).chroma()).toBe(9)
      expect(note(NoteName.B, NoteAccidental.Sharp, NoteAccidental.Sharp, NoteAccidental.Sharp).chroma()).toBe(2)
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
})
