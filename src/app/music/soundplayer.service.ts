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

  public playNote(noteCode: NoteCode, hauteur: number) {
    let note: String = Note.asStringCodeBemols(noteCode) + hauteur.toString()
    console.log("Note jouée : " + note)
    this.synth.triggerAttackRelease(note, "8n");
  }

}
