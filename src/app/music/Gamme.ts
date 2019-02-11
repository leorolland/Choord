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

  // 1 - 1/2 - 1 - 1 - 1/2 - 1,5 - 1/2
  public static harmonicMinorOf(tonicCode: NoteCode): Note[] {
    const tonic: Note = new Note(tonicCode);
    // Création de la gamme à partir de la tonique
    let gamme: Note[] = [tonic];
    gamme.push( Note.numberToNote(tonic.getNumber() + 2) ); // 2M
    gamme.push( Note.numberToNote(tonic.getNumber() + 3) ); // 3M
    gamme.push( Note.numberToNote(tonic.getNumber() + 5) ); // 4j
    gamme.push( Note.numberToNote(tonic.getNumber() + 7) ); // 5j
    gamme.push( Note.numberToNote(tonic.getNumber() + 8) ); // 6m
    gamme.push( Note.numberToNote(tonic.getNumber() + 11) ); // 7m
    gamme.push( Note.numberToNote(tonic.getNumber() + 12) );
    return gamme;
  }
  

}