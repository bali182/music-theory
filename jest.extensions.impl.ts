import { Chord } from './src/Chord'
import { Note } from './src/Note'
import { Scale } from './src/Scale'
import { arraysShallowEqual } from './src/utils'

expect.extend({
  toEqualNote(received: Note, expected: Note) {
    if (expected.equals(received)) {
      return {
        message: () => `Both notes are "${expected}".`,
        pass: true,
      }
    }
    return {
      message: () => `expected note "${expected}", got "${received}" instead`,
      pass: false,
    }
  },

  toHaveNotes(received: Scale<any>, notes: ReadonlyArray<Note>) {
    if (arraysShallowEqual(received.notes(), notes, (a, b) => a.equals(b))) {
      return {
        message: () => `Both scales have notes "${notes}".`,
        pass: true,
      }
    }
    return {
      message: () =>
        `expected scale ${received.toString()} to have notes: [${notes.map((note) => note.toString()).join(', ')}]`,
      pass: false,
    }
  },

  toEqualChord(received: Chord<any>, expected: Chord<any>) {
    if (expected.equals(received)) {
      return {
        message: () => `Both chords are "${expected}".`,
        pass: true,
      }
    }
    return {
      message: () => `expected chord "${expected}", got "${received}" instead`,
      pass: false,
    }
  },
})
