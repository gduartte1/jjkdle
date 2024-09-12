import { Component, OnInit } from '@angular/core';
import { CharactersService } from '../characters.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  guess: string = '';
  currentCharacter: any;
  guessedCharacter: any;
  guessedCharacters: any[] = [];
  message: string = '';
  validCharacters: string[] = [];
  searchResults: any[] = [];  // Altere para um array de objetos contendo nome e foto

  constructor(private charactersService: CharactersService) { }

  ngOnInit(): void {
    this.loadRandomCharacter();
    this.loadvalidCharacters();
  }

  loadRandomCharacter() {
    const character = this.charactersService.getCharacters();
    this.currentCharacter = character[Math.floor(Math.random() * character.length)];
  }

  loadvalidCharacters() {
    this.validCharacters = this.charactersService.getCharacters().map(character => character.name.toLowerCase());
  }

  updateSearchResults() {
    if (this.guess.length > 0) {
      const lowercaseGuess = this.guess.toLowerCase();
      this.searchResults = this.charactersService.getCharacters()
        .filter(character => 
          character.name.toLowerCase().includes(lowercaseGuess) && 
          !this.guessedCharacters.some(char => char.name.toLowerCase() === character.name.toLowerCase())
        )
        .map(character => ({
          name: character.name,
          photo: character.photo // Supondo que `photo` é a URL da imagem
        }));
    } else {
      this.searchResults = [];
    }
  }

  selectCharacter(name: string) {
    this.guess = name;
    this.searchResults = [];
    this.checkGuess(); // Limpa os resultados da pesquisa ao selecionar um personagem
  }

  checkGuess() {
    if (!this.validCharacters.includes(this.guess.toLowerCase())) {
      this.message = 'Invalid character! Please try again.';
      return;
    }
    this.guessedCharacter = this.charactersService.getCharacter(this.guess);
    // Verifica se o personagem já foi adivinhado antes de adicionar à lista
    if (!this.guessedCharacters.some(character => character.name === this.guessedCharacter.name)) {
      this.guessedCharacters.push(this.guessedCharacter);
    }
    if (this.guess.toLowerCase() === this.guessedCharacter.name.toLowerCase()) {
      this.message = 'You guessed it!';
    } else {
      this.message = 'Try again!';
    }
    this.guess = ''; // Limpar o campo de entrada após cada adivinhação
  }

  isHintCommon(guessedValue: string, correctValue: string): boolean {
    return guessedValue?.toLowerCase() === correctValue?.toLowerCase();
  }

  characteristicNames_: string[] = ['gender',  'species',  'hair',  'innateTechniques',  'domainExpansion',  'grade',  'arcDebut'];

  characteristicNames: string[] = [  'Character', 'Gender',  'Species',  'Hair',  'Innate <br> Techniques',  'Domain <br> Expansion',  'Grade',  'Arc <br> Debut'];

}
