import { Note } from './Note'
import { ScaleName } from './ScaleName'

export class Scale {
  private readonly _name: ScaleName
  private readonly _notes: ReadonlyArray<Note>

  constructor(name: ScaleName, notes: Note[]) {
    this._name = name
    this._notes = Object.freeze(Array.from(notes))
  }

  public name(): ScaleName {
    return this._name
  }

  public notes(): ReadonlyArray<Note> {
    return this._notes
  }
}

export function scale(root: Note, scaleName: ScaleName): Scale {
  return null
}
