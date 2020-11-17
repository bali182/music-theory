import { heptatonicScale, HeptatonicScale } from './HeptatonicScale'
import { HeptatonicScaleName } from './HeptatonicScaleName'
import { Note } from './Note'
import { NoteAccidental } from './NoteAccidental'
import { NoteName } from './NoteName'
import { Triad } from './Triad'
import { TriadType } from './TriadType'

describe(HeptatonicScale.constructor.name, () => {
  const { Ionian, Aeolian, Locrian, Mixolydian, Lydian, Phrygian, Dorian } = HeptatonicScaleName
  const { C, D, E, F, G, A, B } = NoteName
  const { Sharp, Flat, sharps } = NoteAccidental
  const { Major, Minor, Diminished } = TriadType
  const { create: note } = Note

  describe(`creation using ${heptatonicScale.name}`, () => {
    it('should check if the intervals are set up correctly', () => {
      const cLocrian = [note(C), note(D, Flat), note(E, Flat), note(F), note(G, Flat), note(A, Flat), note(B, Flat)]
      expect(heptatonicScale(note(C), Locrian)).toHaveNotes(cLocrian)

      const dAeolian = [note(D), note(E), note(F), note(G), note(A), note(B, Flat), note(C)]
      expect(heptatonicScale(note(D), Aeolian)).toHaveNotes(dAeolian)

      const eMixolydian = [note(E), note(F, Sharp), note(G, Sharp), note(A), note(B), note(C, Sharp), note(D)]
      expect(heptatonicScale(note(E), Mixolydian)).toHaveNotes(eMixolydian)

      const fLydian = [note(F), note(G), note(A), note(B), note(C), note(D), note(E)]
      expect(heptatonicScale(note(F), Lydian)).toHaveNotes(fLydian)

      const gPhrygian = [note(G), note(A, Flat), note(B, Flat), note(C), note(D), note(E, Flat), note(F)]
      expect(heptatonicScale(note(G), Phrygian)).toHaveNotes(gPhrygian)

      const aDorian = [note(A), note(B), note(C), note(D), note(E), note(F, Sharp), note(G)]
      expect(heptatonicScale(note(A), Dorian)).toHaveNotes(aDorian)

      const bIonian = [note(B), note(C, Sharp), note(D, Sharp), note(E), note(F, Sharp), note(G, Sharp), note(A, Sharp)]
      expect(heptatonicScale(note(NoteName.B), Ionian)).toHaveNotes(bIonian)
    })

    it('should construct the trickier ionian scales', () => {
      const asIonian = [
        note(A, Sharp),
        note(B, Sharp),
        note(C, ...sharps(2)),
        note(D, Sharp),
        note(E, Sharp),
        note(F, ...sharps(2)),
        note(G, ...sharps(2)),
      ]
      expect(heptatonicScale(note(NoteName.A, Sharp), Ionian)).toHaveNotes(asIonian)

      const fsIonian = [
        note(F, Sharp),
        note(G, Sharp),
        note(A, Sharp),
        note(B),
        note(C, Sharp),
        note(D, Sharp),
        note(E, Sharp),
      ]
      expect(heptatonicScale(note(F, Sharp), Ionian)).toHaveNotes(fsIonian)
    })

    it('should construct the trickier aeolian scales', () => {
      const dsAeolian = [
        note(D, Sharp),
        note(E, Sharp),
        note(F, Sharp),
        note(G, Sharp),
        note(A, Sharp),
        note(B),
        note(C, Sharp),
      ]
      expect(heptatonicScale(note(D, Sharp), Aeolian)).toHaveNotes(dsAeolian)

      const esAeolian = [
        note(E, Sharp),
        note(F, ...sharps(2)),
        note(G, Sharp),
        note(A, Sharp),
        note(B, Sharp),
        note(C, Sharp),
        note(D, Sharp),
      ]
      expect(heptatonicScale(note(E, Sharp), Aeolian)).toHaveNotes(esAeolian)

      const asAeolian = [
        note(A, Sharp),
        note(B, Sharp),
        note(C, Sharp),
        note(D, Sharp),
        note(E, Sharp),
        note(F, Sharp),
        note(G, Sharp),
      ]
      expect(heptatonicScale(note(A, Sharp), Aeolian)).toHaveNotes(asAeolian)

      const bsAeolian = [
        note(B, Sharp),
        note(C, ...sharps(2)),
        note(D, Sharp),
        note(E, Sharp),
        note(F, ...sharps(2)),
        note(G, Sharp),
        note(A, Sharp),
      ]
      expect(heptatonicScale(note(B, Sharp), Aeolian)).toHaveNotes(bsAeolian)
    })
  })

  describe('triad', () => {
    const scale = heptatonicScale(note(C), Ionian)
    expect(scale.triad(0)).toEqualChord(Triad.create(note(C), Major))
    expect(scale.triad(1)).toEqualChord(Triad.create(note(D), Minor))
    expect(scale.triad(2)).toEqualChord(Triad.create(note(E), Minor))
    expect(scale.triad(3)).toEqualChord(Triad.create(note(F), Major))
    expect(scale.triad(4)).toEqualChord(Triad.create(note(G), Major))
    expect(scale.triad(5)).toEqualChord(Triad.create(note(A), Minor))
    expect(scale.triad(6)).toEqualChord(Triad.create(note(B), Diminished))
  })
})
