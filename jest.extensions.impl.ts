import { Note } from './src/Note'

expect.extend({
  toEqualNote(received: Note, expected: Note) {
    if (expected.equals(received)) {
      return {
        message: () => `Notes were equal`,
        pass: true,
      }
    }
    return {
      message: () => `expected note "${expected}", got "${received}" instead`,
      pass: false,
    }
  },
})
