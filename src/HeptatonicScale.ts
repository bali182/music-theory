import { Note } from './Note'
import { NoteName } from './NoteName'
import { Scale } from './Scale'
import { HeptatonicScaleName } from './HeptatonicScaleName'
import { zip } from './utils'

type HeptatonicScaleNotes = [Note, Note, Note, Note, Note, Note, Note]

export class HeptatonicScale extends Scale<HeptatonicScaleName> {
  constructor(name: HeptatonicScaleName, notes: HeptatonicScaleNotes) {
    super(name, notes)
  }

  public second(): Note {
    return this.notes()[1]
  }

  public third(): Note {
    return this.notes()[2]
  }

  public fourth(): Note {
    return this.notes()[3]
  }

  public fifth(): Note {
    return this.notes()[4]
  }

  public sixth(): Note {
    return this.notes()[5]
  }

  public seventh(): Note {
    return this.notes()[6]
  }
}

export function heptatonicScale(root: Note, scaleName: HeptatonicScaleName): HeptatonicScale {
  const noteNames = NoteName.from(root.name())
  const intervals = HeptatonicScaleName.intervals(scaleName)
  const notes = zip(noteNames, intervals, (noteName, interval) => root.transpose(interval).transposeTo(noteName))
  return new HeptatonicScale(scaleName, notes as HeptatonicScaleNotes)
}
