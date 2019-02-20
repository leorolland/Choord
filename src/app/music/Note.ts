import { notStrictEqual } from "assert";
import { NoteCode } from "./NoteCode";

export class Note {

  /**
   * Transforms a given note into string
   * @param note Note à tranformer
   */
  public static asString(note: NoteCode): string {
    switch (note) {
      case NoteCode.C:
        return "Do"
      case NoteCode.CS:
        return "Do#"
      case NoteCode.D:
        return "Ré"
      case NoteCode.DS:
        return "Ré#"
      case NoteCode.E:
        return "Mi"
      case NoteCode.F:
        return "Fa"
      case NoteCode.FS:
        return "Fa#"
      case NoteCode.G:
        return "Sol"
      case NoteCode.GS:
        return "Sol#"
      case NoteCode.A:
        return "La"
      case NoteCode.AS:
        return "La#"
      case NoteCode.B:
        return "Si"
    }
  }
  /**
   * Transforms a given note into string formatted bemol (okay for Tone.js API)
   * @param note Note à tranformer
   */
  public static asStringCodeBemols(note: NoteCode): string {
    switch (note) {
      case NoteCode.C:
        return "C"
      case NoteCode.CS:
        return "Db"
      case NoteCode.D:
        return "D"
      case NoteCode.DS:
        return "Eb"
      case NoteCode.E:
        return "E"
      case NoteCode.F:
        return "F"
      case NoteCode.FS:
        return "Gb"
      case NoteCode.G:
        return "G"
      case NoteCode.GS:
        return "Ab"
      case NoteCode.A:
        return "A"
      case NoteCode.AS:
        return "Bb"
      case NoteCode.B:
        return "B"
    }
  }

  /**
   * Defines all allowed notesCodes in music theory
   */
  public static notes: Array<NoteCode> = [NoteCode.C, NoteCode.CS, NoteCode.D, NoteCode.DS, NoteCode.E, NoteCode.F, NoteCode.FS, NoteCode.G, NoteCode.GS, NoteCode.A, NoteCode.AS, NoteCode.B];

  /**
   * NoteCode of the Note
   */
  private noteCode: NoteCode;

  /**
   * Height of the Note (ex: La3 -> height of 3)
   */
  private hauteur: number;

  constructor(code: NoteCode, hauteur?: number) {
    this.hauteur = hauteur ? hauteur : 3
    this.noteCode = code;
  }

  public getNoteCode(): NoteCode {
    return this.noteCode;
  }
  public getHauteur(): number {
    return this.hauteur
  }
  public setHauteur(h: number) {
    this.hauteur = h
  }
  public toString(): string {
    return this.noteCode;
  }
  public getNumber(): number {
    return Note.notes.indexOf(this.noteCode);
  }

  /**
   * 
   * @param input An integer representing the NoteCode in modulo 12
   */
  public static numberToNote(input: number): Note {
    const rest: number = input % Note.notes.length;
    return new Note(Note.notes[rest]);
  }

  /**
   * Retourne l'index de la noteCode donnée
   */
  public static getNoteCodeIndex(nc: NoteCode): number {
    switch (nc) {
      case NoteCode.C:
        return 0
      case NoteCode.CS:
        return 1
      case NoteCode.D:
        return 2
      case NoteCode.DS:
        return 3
      case NoteCode.E:
        return 4
      case NoteCode.F:
        return 5
      case NoteCode.FS:
        return 6
      case NoteCode.G:
        return 7
      case NoteCode.GS:
        return 8
      case NoteCode.A:
        return 9
      case NoteCode.AS:
        return 10
      case NoteCode.B:
        return 11
    }
  }

  /**
   * Renvoie a note d'un demi-ton au dessus
   */
  public notePlusUn(): Note {
    switch (this.noteCode) {
      case NoteCode.C:
        return new Note(NoteCode.CS, this.hauteur)
      case NoteCode.CS:
        return new Note(NoteCode.D, this.hauteur)
      case NoteCode.D:
        return new Note(NoteCode.DS, this.hauteur)
      case NoteCode.DS:
        return new Note(NoteCode.E, this.hauteur)
      case NoteCode.E:
        return new Note(NoteCode.F, this.hauteur)
      case NoteCode.F:
        return new Note(NoteCode.FS, this.hauteur)
      case NoteCode.FS:
        return new Note(NoteCode.G, this.hauteur)
      case NoteCode.G:
        return new Note(NoteCode.GS, this.hauteur)
      case NoteCode.GS:
        return new Note(NoteCode.A, this.hauteur)
      case NoteCode.A:
        return new Note(NoteCode.AS, this.hauteur)
      case NoteCode.AS:
        return new Note(NoteCode.B, this.hauteur)
      case NoteCode.B:
        return new Note(NoteCode.C, this.hauteur + 1)
    }
  }

  /**
   * Renvoie la note de N demi tons au dessus
   * @param tones Nombre de demi tons
   */
  public notePlusN(tones: number): Note {
    let note: Note = new Note(this.noteCode, this.hauteur)
    for (let i = 0; i < tones; i++) {
      note = note.notePlusUn()
    }
    return note
  }

}