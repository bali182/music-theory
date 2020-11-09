import { Note, note } from './Note'
import { NoteAccidental } from './NoteAccidental'
import { NoteName } from './NoteName'

describe('Note', () => {
  describe('Note.chroma', () => {
    it('should return the right chroma for notes without accidentals', () => {
      expect(note(NoteName.C).chroma).toBe(0)
      expect(note(NoteName.D).chroma).toBe(2)
      expect(note(NoteName.E).chroma).toBe(4)
      expect(note(NoteName.F).chroma).toBe(5)
      expect(note(NoteName.G).chroma).toBe(7)
      expect(note(NoteName.A).chroma).toBe(9)
      expect(note(NoteName.B).chroma).toBe(11)
    })
    it('should return the right chroma for sharp notes', () => {
      expect(note(NoteName.C, NoteAccidental.Sharp).chroma).toBe(1)
      expect(note(NoteName.D, NoteAccidental.Sharp).chroma).toBe(3)
      expect(note(NoteName.E, NoteAccidental.Sharp).chroma).toBe(5)
      expect(note(NoteName.F, NoteAccidental.Sharp).chroma).toBe(6)
      expect(note(NoteName.G, NoteAccidental.Sharp).chroma).toBe(8)
      expect(note(NoteName.A, NoteAccidental.Sharp).chroma).toBe(10)
      expect(note(NoteName.B, NoteAccidental.Sharp).chroma).toBe(0)
    })
    it('should return the right chroma for flat notes', () => {
      expect(note(NoteName.C, NoteAccidental.Flat).chroma).toBe(11)
      expect(note(NoteName.D, NoteAccidental.Flat).chroma).toBe(1)
      expect(note(NoteName.E, NoteAccidental.Flat).chroma).toBe(3)
      expect(note(NoteName.F, NoteAccidental.Flat).chroma).toBe(4)
      expect(note(NoteName.G, NoteAccidental.Flat).chroma).toBe(6)
      expect(note(NoteName.A, NoteAccidental.Flat).chroma).toBe(8)
      expect(note(NoteName.B, NoteAccidental.Flat).chroma).toBe(10)
    })
    it('should return the right chroma for many sharps/flats', () => {
      expect(note(NoteName.C, NoteAccidental.Flat, NoteAccidental.Flat, NoteAccidental.Flat).chroma).toBe(9)
      expect(note(NoteName.B, NoteAccidental.Sharp, NoteAccidental.Sharp, NoteAccidental.Sharp).chroma).toBe(2)
    })
  })
})
