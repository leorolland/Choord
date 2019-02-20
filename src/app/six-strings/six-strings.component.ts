import { Component, OnInit, Input, Output } from '@angular/core';
import { Note } from '../music/Note';
import { NoteCode } from '../music/NoteCode';
import { EventEmitter } from '@angular/core';
import { SoundplayerService } from '../music/soundplayer.service';

@Component({
  selector: 'app-six-strings',
  templateUrl: './six-strings.component.html',
  styleUrls: ['./six-strings.component.css']
})
export class SixStringsComponent implements OnInit {
  Note = Note

  public static fretsCount = 21;

  @Input()
  allowedNotes: Array<NoteCode> = [];

  @Input()
  highlightedNotes: Array<NoteCode> = [];

  @Input()
  frozen: boolean = false;

  @Output()
  selectedNotes: EventEmitter<Array<NoteCode>> = new EventEmitter();

  private soundplayerService: SoundplayerService;

  public static strings: Note[] = [
    new Note(NoteCode.E, 4),
    new Note(NoteCode.B, 3),
    new Note(NoteCode.G, 3),
    new Note(NoteCode.D, 3),
    new Note(NoteCode.A, 2),
    new Note(NoteCode.E, 2)
  ]

  private completeStrings: Note[][] = new Array<Array<Note>>()

  constructor(private _soundplayerService: SoundplayerService) { 
    this.soundplayerService = _soundplayerService
  }

  ngOnInit() {
    // Génération des cordes completes
    this.completeStrings = SixStringsComponent.strings.map((n: Note)=>this.getNotesFromString(n))
    console.log(this.completeStrings)
  }

  public getNotesFromString(stringNote: Note): Note[] {
    let output: Note[] = [];
    output.push(stringNote)
    for (let i = 1; i < SixStringsComponent.fretsCount; i++) {
      output.push((output[output.length-1].notePlusUn()))
    }
    return output;
  }

  onNoteClick(note: Note) {
    // On émet un son
    this.soundplayerService.playNote(note.getNoteCode(), note.getHauteur())
    if (!this.frozen) {
      // Si la note était présente dans les notes autorisées on la retire
      if (this.allowedNotes.includes(note.getNoteCode())) {
        this.allowedNotes.splice(this.allowedNotes.indexOf(note.getNoteCode()), 1)
        this.emitAllowedNotes()
      }
      // Sinon on l'ajoute
      else {
        this.allowedNotes.push(note.getNoteCode())
        this.emitAllowedNotes()
      }
    }
  }

  emitAllowedNotes() {
    this.selectedNotes.emit(this.allowedNotes);
  }

}
