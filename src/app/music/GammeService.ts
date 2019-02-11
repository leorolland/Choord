import { NoteCode } from "./NoteCode";
import { Note } from "./Note";
import { HttpClient } from '@angular/common/http'; 
import { Observable, Subscribable, BehaviorSubject } from 'rxjs';
import { Injectable, OnInit } from '@angular/core';
import { GammeApiObject } from "./GammeApiObject";

@Injectable({
  providedIn: 'root',
})
export class GammeService {

  /**
   * Gammes object storage
   */
  private _gammesJson: BehaviorSubject<GammeApiObject[]> = new BehaviorSubject<GammeApiObject[]>(null);
  public readonly gammesJson: Observable<GammeApiObject[]> = this._gammesJson.asObservable();

  constructor(private http: HttpClient) {
  }

  /**
   * Transforme un tableau de Note données en tableau de NoteCode
   */
  public static asNoteCodes(notes: Note[]): NoteCode[] {
    return notes.map((n: Note)=>n.getNoteCode())
  }

  /**
   * Construit une gamme à partir des paramètres entrés
   * @param name Le nom de la gamme (par ex: "Pentatonique Mineure")
   * @param tonicCode La tonique de la gamme
   * @returns Une promesse contenant les notes de la gamme
   */
  public buildGamme(name: string, tonicCode: NoteCode): Promise<Note[]> {
    return new Promise((resolve, reject) => {
      // Si l'objet gammesJson n'est pas déjà téléchargé
      if (this._gammesJson.getValue() == null) {
        // On télécharge les données de l'API qui sera stoqué dans un observable local
        this.getGammesApiObjects().subscribe( (data:GammeApiObject[]) => {
          this._gammesJson.next(data); // On stoque la réponse
          resolve( GammeService.getGammeFromJson(name, tonicCode, data) ) // On resolve la réponse
        });
      } else {
        // La réponse de l'API est déjà téléchargée, on resolve la réponse
        resolve( GammeService.getGammeFromJson(name, tonicCode, this._gammesJson.getValue()) )
      }
    })
  }

  /**
   * Génère un ensemble de notes (gammes) à partir d'un ensemble de gammes généré par l'API et d'une tonique
   * @param gamme Le nom de la gamme à générer Ex: "Pentatonique Majeure"
   * @param tonicCode Le code de la tonique de la gamme à générer
   * @param json L'objet Json contenant l'ensemble des gammes de l'API
   */
  private static getGammeFromJson(gamme: string, tonicCode: NoteCode, json:GammeApiObject[]): Note[]{
    // Intervalles de génération de la gamme à partir d'une tonique quelconque
    let intervals: number[];
    json.forEach(element => {
      if (element.name == gamme)
        intervals = element.intervals;
    });
    // Gamme (sortie)
    let output: Note[] = [new Note(tonicCode)];
    // Pour chaque intervalle
    intervals.forEach((int: number) => {
      // On récupère la dernière Note de la game en cours de génération
      const lastOutputNote: Note = output[output.length-1];
      // On ajoute une nouvelle Note formée de la dernière note plus l'intervalle voulu
      output.push(Note.numberToNote( lastOutputNote.getNumber() + int ) )
    })
    return output;
  }

  public getGammesApiObjects(): Observable<GammeApiObject[]> {
    // Map les valeurs du JSON de l'API dans des objets GammeApiObject
    return this.http.get<GammeApiObject[]>("./assets/gammes.json")
  }
  
}