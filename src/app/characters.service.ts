import { Injectable } from '@angular/core';
import { CHARACTERS_DATA, CharacterData } from './characters/constants/characters.constant';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {
  readonly charactersData = CHARACTERS_DATA;
  private characters: CharacterData[] = this.charactersData;

  constructor() { }

  getCharacters() {
    return this.characters;
  }

  getCharacter(name: string) {
    return this.characters.find(champion => champion.name.toLowerCase() === name.toLowerCase());
  }
}
