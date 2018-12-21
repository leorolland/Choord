import { Component, OnInit } from '@angular/core';
import { Note } from './music/Note';
import { NoteCode } from './music/NoteCode';
import { Gamme } from './music/Gamme';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  Gamme = Gamme;
  NoteCode = NoteCode;
  Note = Note;
  
  title = 'SolfegeJs';

  allowedNotes: Array<NoteCode> = Gamme.asNoteCodes(Gamme.majorOf(NoteCode.C));


  ngOnInit() {
  }

  

}
