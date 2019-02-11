import { NoteCode } from "./NoteCode";
import { Note } from "./Note";
import { Gamme } from "./Gamme"
import { HttpClient } from '@angular/common/http'; 
import { Observable, Subscribable, BehaviorSubject, Subscription } from 'rxjs';
import { Injectable, OnInit } from '@angular/core';
import { GammeApiObject } from "./GammeApiObject";

@Injectable({
  providedIn: 'root',
})
export class GammeService implements OnInit{

  /**
   * Gammes object storage
   */
  private _gammes: BehaviorSubject<Gamme[]> = new BehaviorSubject<Gamme[]>([]);
  public readonly gammes: Observable<Gamme[]> = this._gammes.asObservable();

  constructor(private http: HttpClient) {

  }

  ngOnInit(): void {
    this.fetchGammes()
  }

  /**
   * Transforme un tableau de Note données en tableau de NoteCode
   */
  public static asNoteCodes(notes: Note[]): NoteCode[] {
    return notes.map((n: Note)=>n.getNoteCode())
  }

  /**
   * Charge les gammes - Télécharge le fichier contentant 
   * les intervalles de gamme et construit la liste des gammes possibles
   */
  public fetchGammes() {
    console.log("Chargement des gammes ...")
    // Récupération de la liste des gammes de l'API
    const gammeApiObs: Observable<GammeApiObject[]> = this.http.get<GammeApiObject[]>("./assets/gammes.json")
    let subscription: Subscription = gammeApiObs.subscribe((data: GammeApiObject[]) => {
      // Une fois que les données sont récupérées, on construit les gammes
      let gammeNotes: Note[]
      // Pour chaque gamme de l'API
      data.forEach((elt: GammeApiObject) => {
        // Pour chaque tonique possible
        Note.notes.forEach((note: NoteCode) => {
          let newValue = this._gammes.value
          newValue.push(this.getGammeFromJson(note, elt))
          this._gammes.next(newValue)
        })
      })
      // Suppression de la souscribtion
      subscription.unsubscribe()
      console.log("Chargement terminé.")
    })
  }
  /**
   * Génère une gamme à partir d'un ensemble à partir d'une tonique et d'un GammeApiObject
   * @param tonicCode Le code de la tonique de la gamme à générer
   * @param json L'objet Json contenant l'ensemble des gammes de l'API
   */
  private getGammeFromJson(tonicCode: NoteCode, json: GammeApiObject): Gamme {
    let gamme: Gamme = new Gamme()
    // Variable temporaire accumulant les notes, commençant par la tonique
    let output: Note[] = [new Note(tonicCode)];
    // Pour chaque intervalle
    json.intervals.forEach((int: number) => {
      // On récupère la dernière Note de la game en cours de génération
      const lastOutputNote: Note = output[output.length-1];
      // On ajoute une nouvelle Note formée de la dernière note plus l'intervalle voulu
      output.push(Note.numberToNote( lastOutputNote.getNumber() + int ) )
    })
    gamme.name = json.name
    gamme.tonique = tonicCode
    gamme.notes = GammeService.asNoteCodes(output)
    gamme.intervals = json.intervals
    return gamme;
  }
  
}