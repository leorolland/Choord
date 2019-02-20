import { Injectable } from '@angular/core';
import { NoteCode } from './NoteCode';
import { Note } from '../music/Note'
@Injectable({
  providedIn: 'root'
})
export class SoundplayerService {

  private synth;

  constructor() {
    this.synth = new Tone.Synth().toMaster();
  }

  /**
   * Joue la note entrée en paramètre
   */
  public playNote(note: Note) {
    let noteStr: String = Note.asStringCodeBemols(note.getNoteCode()) + note.getHauteur().toString()
    console.log("Note jouée : " + noteStr)
    this.synth.triggerAttackRelease(noteStr, "8n");
  }

}
