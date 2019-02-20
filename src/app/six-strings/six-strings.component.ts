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

  /**
   * Defines how much frets should be displayed
   */
  public static fretsCount = 21;

  /**
   * Defines activated notes in representation
   */
  @Input()
  allowedNotes: Array<NoteCode> = [];

  /**
   * Defines highlighted notes (yellow blinking)
   */
  @Input()
  highlightedNotes: Array<NoteCode> = [];

  /**
   * Defines if user can edit allowedNotes by clicking
   */
  @Input()
  frozen: boolean = false;

  /**
   * Emits allowedNotes
   */
  @Output()
  selectedNotes: EventEmitter<Array<NoteCode>> = new EventEmitter();

  private soundplayerService: SoundplayerService;

  /**
   * Default strings 0 notecodes
   */
  public static strings: Note[] = [
    new Note(NoteCode.E, 4),
    new Note(NoteCode.B, 3),
    new Note(NoteCode.G, 3),
    new Note(NoteCode.D, 3),
    new Note(NoteCode.A, 2),
    new Note(NoteCode.E, 2)
  ]

  /**
   * The notes on each string
   */
  private completeStrings: Note[][] = new Array<Array<Note>>()

  constructor(private _soundplayerService: SoundplayerService) { 
    this.soundplayerService = _soundplayerService
  }

  ngOnInit() {
    // Complete strings notes generation (executed once for optimisation)
    this.completeStrings = SixStringsComponent.strings.map((n: Note)=>this.getNotesFromString(n))
  }

  /**
   * Builds the complete string notes from the base 0 fret
   * @param stringNote String 0 fret Note
   */
  public getNotesFromString(stringNote: Note): Note[] {
    let output: Note[] = [];
    output.push(stringNote)
    for (let i = 1; i < SixStringsComponent.fretsCount; i++) {
      output.push((output[output.length-1].notePlusUn()))
    }
    return output;
  }

  /**
   * Action executed on note clicked on representation
   * @param note Note clicked
   */
  onNoteClick(note: Note) {
    // On émet un son
    this.soundplayerService.playNote(note)
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

  /**
   * Emits allowed notes to output of component
   */
  emitAllowedNotes() {
    this.selectedNotes.emit(this.allowedNotes);
  }

  /**
   * Plays allowed notes to speakers
   */
  playAllowedNotes() {
    let hauteur: number = 3;
    // Si la note actuelle est inférieure à la note précédente, on augmente la hauteur
    // Cela permet de faire sonner la gamme du plus grave au plus aigu
    for (let i = 0; i < this.allowedNotes.length; i++) {
      if (i>0 && Note.getNoteCodeIndex(this.allowedNotes[i]) < Note.getNoteCodeIndex(this.allowedNotes[i-1])) {
        hauteur++
      }
      const note: Note = new Note(this.allowedNotes[i], hauteur);
      setTimeout(()=>{
        this.soundplayerService.playNote(note)
      }, i*300)
    }
  }

}
