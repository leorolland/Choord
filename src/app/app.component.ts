import { Component, OnInit } from '@angular/core';
import { Note } from './music/Note';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  title = 'SolfegeJs';

  gamme: Note[] = [];

  ngOnInit() {
    for (let index = 0; index < 50; index++) {
      this.gamme.push(Note.numberToNote(index))
    }
  }

}
