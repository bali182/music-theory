import { Note } from './Note'
import { NoteName } from './NoteName'
import { Scale } from './Scale'
import { HeptatonicScaleName } from './HeptatonicScaleName'
import { throwTypeError, zip } from './utils'
import { Triad } from './Triad'

export class HeptatonicScale extends Scale<HeptatonicScaleName> {
  public triad(scaleDegree: number): Triad {
    if (scaleDegree < 0 || scaleDegree >= 7 || !Number.isInteger(scaleDegree)) {
      throwTypeError(`Scale degree must be between 0 and 6 and must be an integer`)
    }
    const notes = this.notes()
    const root = notes[scaleDegree]
    const third = notes[(scaleDegree + 2) % notes.length]
    const fifth = notes[(scaleDegree + 4) % notes.length]
    return new Triad(root, third, fifth)
  }
}

export function heptatonicScale(root: Note, scaleName: HeptatonicScaleName): HeptatonicScale {
  const noteNames = NoteName.from(root.name())
  const intervals = HeptatonicScaleName.intervals(scaleName)
  const notes = zip(noteNames, intervals, (noteName, interval) => root.transpose(interval).transposeTo(noteName))
  return new HeptatonicScale(scaleName, notes)
}
