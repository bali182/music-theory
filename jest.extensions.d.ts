import { Note } from './src/Note'
import { Scale } from './src/Scale'

export {}

declare global {
  namespace jest {
    interface Matchers<R> {
      toEqualNote(note: Note): void
      toHaveNotes(notes: ReadonlyArray<Note>): void
    }
  }
}
