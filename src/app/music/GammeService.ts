import { NoteCode } from "./NoteCode";
import { Note } from "./Note";
import { Gamme } from "./Gamme"
import { HttpClient } from '@angular/common/http'; 
import { Observable, Subscribable, BehaviorSubject, Subscription } from 'rxjs';
import { Injectable, OnInit } from '@angular/core';
import { GammeApiObject } from "./GammeApiObject";
import { getAllDebugNodes } from "@angular/core/src/debug/debug_node";

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
   * Renvoie les notes de s1 non contenues dans s2
   * @param s1 Un set de notes
   * @param s2 Un set de notes
   */
  public static notIn(s1: NoteCode[], s2: NoteCode[]) {
    return s1.filter(n=>!s2.includes(n))
  }

  /**
   * Renvoie les gammes qui contiennent les notes recherchées
   * @param notes Un ensemble de notes à chercher
   * @param max Le nombre maximal de gammes à retourner
   */
  public searchGamme(notes: NoteCode[], max?: number): Gamme[] {
    let output: Gamme[] = []
    this._gammes.value.forEach((g:Gamme) => {
      if (max && output.length>=max) return output
      let includeIt = true
      let index = 0
      while (includeIt && index<notes.length) {
        includeIt = g.notes.includes(notes[index])
        index++
      }
      if (includeIt) output.push(g)
    })
    return output
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
      // Accumulateur
      let gammes: Gamme[] = []
      // Pour chaque gamme de l'API
      data.forEach((elt: GammeApiObject) => {
        // Pour chaque tonique possible
        Note.notes.forEach((note: NoteCode) => gammes.push(this.getGammeFromJson(note, elt)) )
      })
      // Attribution des nouvelles gammes
      this._gammes.next(gammes)
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