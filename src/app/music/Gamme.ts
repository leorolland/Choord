import { NoteCode } from "./NoteCode";

export class Gamme {
  public tonique: NoteCode;
  public name: String;
  public intervals: Array<number>;
  public notes: Array<NoteCode>;
}