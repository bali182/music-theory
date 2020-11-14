import { Chord } from './Chord'
import { Note } from './Note'
import { TriadType } from './TriadType'

export class Triad extends Chord<TriadType> {
  private readonly _root: Note
  private readonly _third: Note
  private readonly _fifth: Note

  constructor(root: Note, third: Note, fifth: Note) {
    super([root, third, fifth], TriadType.detect(root, third, fifth))
    this._root = root
    this._third = third
    this._fifth = fifth
  }

  public root(): Note {
    return this._root
  }

  public third(): Note {
    return this._third
  }

  public fifth(): Note {
    return this._fifth
  }
}
