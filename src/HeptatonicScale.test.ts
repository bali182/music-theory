import { heptatonicScale, HeptatonicScale } from './HeptatonicScale'
import { HeptatonicScaleName } from './HeptatonicScaleName'
import { note } from './Note'
import { NoteAccidental } from './NoteAccidental'
import { NoteName } from './NoteName'

describe(HeptatonicScale.constructor.name, () => {
  const { Ionian } = HeptatonicScaleName
  const { C, D, E, F, G, A, B } = NoteName
  const { Sharp, Flat } = NoteAccidental

  it('should construct the proper Ionian scales', () => {
    const cIonianNotes = [note(C), note(D), note(E), note(F), note(G), note(A), note(B)]
    expect(heptatonicScale(note(NoteName.C), Ionian)).toHaveNotes(cIonianNotes)

    const dIonianNotes = [note(D), note(E), note(F, Sharp), note(G), note(A), note(B), note(C, Sharp)]
    expect(heptatonicScale(note(NoteName.D), Ionian)).toHaveNotes(dIonianNotes)

    const eIonianNotes = [note(E), note(F, Sharp), note(G, Sharp), note(A), note(B), note(C, Sharp), note(D, Sharp)]
    expect(heptatonicScale(note(NoteName.E), Ionian)).toHaveNotes(eIonianNotes)

    const fIonianNotes = [note(F), note(G), note(A), note(B, Flat), note(C), note(D), note(E)]
    expect(heptatonicScale(note(NoteName.F), Ionian)).toHaveNotes(fIonianNotes)

    const gIonianNotes = [note(G), note(A), note(B), note(C), note(D), note(E), note(F, Sharp)]
    expect(heptatonicScale(note(NoteName.G), Ionian)).toHaveNotes(gIonianNotes)

    const aIonianNotes = [note(A), note(B), note(C, Sharp), note(D), note(E), note(F, Sharp), note(G, Sharp)]
    expect(heptatonicScale(note(NoteName.A), Ionian)).toHaveNotes(aIonianNotes)

    const bIonianNotes = [
      note(B),
      note(C, Sharp),
      note(D, Sharp),
      note(E),
      note(F, Sharp),
      note(G, Sharp),
      note(A, Sharp),
    ]
    expect(heptatonicScale(note(NoteName.B), Ionian)).toHaveNotes(bIonianNotes)
  })
})
