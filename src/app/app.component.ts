import { Component, OnInit } from '@angular/core';
import { Note } from './music/Note';
import { Gamme } from './music/Gamme'
import { NoteCode } from './music/NoteCode';
import { GammeService } from './music/GammeService';
import { EventEmitter } from 'events';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  GammeService = GammeService
  NoteCode = NoteCode
  Note = Note
  allowedNotes: Array<NoteCode> = []

  private _gammeService: GammeService

  private _gammes: Gamme[] = []
  private _filteredGammes: Gamme[] = []
  
  title = 'Choord';

  constructor(gammeService: GammeService) {
    this._gammeService = gammeService
  }

  ngOnInit() {
    // Récupération des gammes
    this._gammeService.fetchGammes()
    this._gammeService.gammes.subscribe((gammes: Gamme[]) => {
      this._gammes = gammes
    })
  }

  onSelectionChanges(e: Array<NoteCode>) {
    if (e.length >= 2) {
      this._filteredGammes = this._gammeService.searchGamme(e, 10)
    } else {
      this._filteredGammes = []
    }
  }

}
