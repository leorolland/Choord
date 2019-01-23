import { Component, OnInit } from '@angular/core';
import { Note } from './music/Note';
import { NoteCode } from './music/NoteCode';
import { GammeService } from './music/GammeService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  GammeService = GammeService;
  NoteCode = NoteCode;
  Note = Note;
  allowedNotes: Array<NoteCode>;

  private _gammeService: GammeService;
  
  title = 'Choord';

  constructor(gammeService: GammeService) {
    this._gammeService = gammeService;
  }

  ngOnInit() {
    this._gammeService.buildGamme("Majeure", NoteCode.C).then((notes: Note[])=>{
      this.allowedNotes = GammeService.asNoteCodes(notes);
    })
  }

}
