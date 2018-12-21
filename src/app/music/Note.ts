export class Note {

  frequency: number;
  name: String;

  constructor(name) {
    this.name = name
  }

  public toString(): String {
    return this.name;
  }

  public static numberToNote(input: number): Note {
    const rest: number = input % 12;
    switch (rest) {
      case 0:
        return new Note("Do");
      case 1:
        return new Note("Do#");
      case 2:
        return new Note("Ré");
      case 3:
        return new Note("Ré#");
      case 4:
        return new Note("Mi");
      case 5:
        return new Note("Fa");
      case 6:
        return new Note("Fa#");
      case 7:
        return new Note("Sol");
      case 8:
        return new Note("Sol#");
      case 9:
        return new Note("La");
      case 10:
        return new Note("La#");
      case 11:
        return new Note("Si");
      default:
        return new Note("ERREUR:Note")
    }
  }

}