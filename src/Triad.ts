import { Chord } from './Chord'
import { Note } from './Note'
import { TriadType } from './TriadType'
import { throwTypeError } from './utils'

type TriadNotes = [Note, Note, Note]

export class Triad extends Chord<TriadType> {
  constructor(type: TriadType, notes: TriadNotes) {
    super(type, notes)
  }

  public root(): Note {
    return this.notes()[0]
  }

  public third(): Note {
    return this.notes()[1]
  }

  public fifth(): Note {
    return this.notes()[2]
  }

  public static create(root: Note, type: TriadType): Triad {
    switch (type) {
      case TriadType.Major: {
        const third = root.transpose(4)
        const fifht = third.transpose(3)
        return new Triad(TriadType.Major, [root, third, fifht])
      }
      case TriadType.Minor: {
        const third = root.transpose(3)
        const fifht = third.transpose(4)
        return new Triad(TriadType.Minor, [root, third, fifht])
      }
      case TriadType.Diminished: {
        const third = root.transpose(3)
        const fifht = third.transpose(3)
        return new Triad(TriadType.Diminished, [root, third, fifht])
      }
      default: {
        throwTypeError(`Unknown triad type ${type}`)
      }
    }
  }
}
