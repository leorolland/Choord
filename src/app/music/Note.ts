import { notStrictEqual } from "assert";
import { NoteCode } from "./NoteCode";

export class Note {

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

  public static notes: Array<NoteCode> = [NoteCode.C, NoteCode.CS, NoteCode.D, NoteCode.DS, NoteCode.E, NoteCode.F, NoteCode.FS, NoteCode.G, NoteCode.GS, NoteCode.A, NoteCode.AS, NoteCode.B];

  private noteCode: NoteCode;
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

  public static numberToNote(input: number): Note {
    const rest: number = input % Note.notes.length;
    return new Note(Note.notes[rest]);
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