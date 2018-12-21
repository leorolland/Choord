import { NoteCode } from "./NoteCode";
import { Note } from "./Note";

export class Gamme {

  public static asNoteCodes(notes: Note[]): NoteCode[] {
    return notes.map((n: Note)=>n.getNoteCode())
  }

  // ton - ton - 1/2 ton - ton - ton - ton
  public static majorOf(tonicCode: NoteCode): Note[] {
    const tonic: Note = new Note(tonicCode);
    // Création de la gamme à partir de la tonique
    let gamme: Note[] = [tonic];
    gamme.push( Note.numberToNote(tonic.getNumber() + 2) );
    gamme.push( Note.numberToNote(tonic.getNumber() + 4) );
    gamme.push( Note.numberToNote(tonic.getNumber() + 5) );
    gamme.push( Note.numberToNote(tonic.getNumber() + 7) );
    gamme.push( Note.numberToNote(tonic.getNumber() + 9) );
    gamme.push( Note.numberToNote(tonic.getNumber() + 11) );
    return gamme;
  }
  

}