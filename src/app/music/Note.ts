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
        return "Sol#"
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

  public static notes: Array<NoteCode> = [NoteCode.C, NoteCode.CS, NoteCode.D, NoteCode.DS, NoteCode.E, NoteCode.F, NoteCode.FS, NoteCode.G, NoteCode.GS, NoteCode.A, NoteCode.AS, NoteCode.B];

  private noteCode: NoteCode;

  constructor(code: NoteCode) {
    this.noteCode = code;
  }

  public getNoteCode(): NoteCode {
    return this.noteCode;
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

}