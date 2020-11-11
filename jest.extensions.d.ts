import { Note } from './src/Note'

export {}

declare global {
  namespace jest {
    interface Matchers<R> {
      toEqualNote(note: Note): void
    }
  }
}
