import { Component, OnInit, Input, Output } from '@angular/core';
import { Note } from '../music/Note';
import { NoteCode } from '../music/NoteCode';
import { EventEmitter } from '@angular/core';

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

  @Output()
  selectedNotes: EventEmitter<Array<NoteCode>>;

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

  onNoteClick(noteCode: NoteCode) {
    // Si la note était présente dans les notes autorisées on la retire
    if (this.allowedNotes.includes(noteCode)) {
      this.allowedNotes.splice(this.allowedNotes.indexOf(noteCode), 1)
      this.emitAllowedNotes()
    }
    // Sinon on l'ajoute
    else {
      this.allowedNotes.push(noteCode)
      this.emitAllowedNotes()
    }

  }

  emitAllowedNotes() {
    this.selectedNotes.emit(this.allowedNotes);
  }

}
