import { Component, OnInit, Input } from '@angular/core';
import { Note } from '../music/Note';
import { NoteCode } from '../music/NoteCode';

@Component({
  selector: 'app-six-strings',
  templateUrl: './six-strings.component.html',
  styleUrls: ['./six-strings.component.css']
})
export class SixStringsComponent implements OnInit {
  Note = Note

  public static fretsCount = 21;

  @Input()
  allowedNotes: Array<NoteCode>;

  private strings: Note[];

  constructor() { }

  ngOnInit() {
    this.strings = [
      new Note(NoteCode.E),
      new Note(NoteCode.B),
      new Note(NoteCode.G),
      new Note(NoteCode.D),
      new Note(NoteCode.A),
      new Note(NoteCode.E)
    ]
  }

  public getNotesFromString(stringNote: Note): Note[] {
    let output: Note[] = [];
    for (let index = stringNote.getNumber(); index < stringNote.getNumber() + SixStringsComponent.fretsCount; index++) {
      output.push(Note.numberToNote(index))
    }
    return output;
  }

}
