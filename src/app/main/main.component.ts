import { Component, OnInit } from '@angular/core';
import { ChampionService } from '../champion.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  guess: string = '';
  currentChampion: any;
  guessedChampion: any;
  guessedCharacters: any[] = [];
  message: string = '';
  validChampions: string[] = [];
  searchResults: any[] = [];  // Altere para um array de objetos contendo nome e foto

  constructor(private championService: ChampionService) { }

  ngOnInit(): void {
    this.loadRandomChampion();
    this.loadValidChampions();
  }

  loadRandomChampion() {
    const champions = this.championService.getChampions();
    this.currentChampion = champions[Math.floor(Math.random() * champions.length)];
  }

  loadValidChampions() {
    this.validChampions = this.championService.getChampions().map(champion => champion.name.toLowerCase());
  }

  updateSearchResults() {
    if (this.guess.length > 0) {
      const lowercaseGuess = this.guess.toLowerCase();
      this.searchResults = this.championService.getChampions()
        .filter(champion => 
          champion.name.toLowerCase().includes(lowercaseGuess) && 
          !this.guessedCharacters.some(champ => champ.name.toLowerCase() === champion.name.toLowerCase())
        )
        .map(champion => ({
          name: champion.name,
          photo: champion.photo // Supondo que `photo` é a URL da imagem
        }));
    } else {
      this.searchResults = [];
    }
  }

  selectCharacter(name: string) {
    this.guess = name;
    this.searchResults = []; // Limpa os resultados da pesquisa ao selecionar um personagem
  }

  checkGuess() {
    if (!this.validChampions.includes(this.guess.toLowerCase())) {
      this.message = 'Invalid character! Please try again.';
      return;
    }
    this.guessedChampion = this.championService.getChampion(this.guess);
    // Verifica se o personagem já foi adivinhado antes de adicionar à lista
    if (!this.guessedCharacters.some(character => character.name === this.guessedChampion.name)) {
      this.guessedCharacters.push(this.guessedChampion);
    }
    if (this.guess.toLowerCase() === this.currentChampion.name.toLowerCase()) {
      this.message = 'You guessed it!';
    } else {
      this.message = 'Try again!';
    }
    this.guess = ''; // Limpar o campo de entrada após cada adivinhação
  }

  isHintCommon(guessedValue: string, correctValue: string): boolean {
    return guessedValue?.toLowerCase() === correctValue?.toLowerCase();
  }

  characteristicnames: string[] = [  'Character', 'Gender',  'Species',  'Hair',  'Innate <br> Techniques',  'Domain <br> Expansion',  'Grade',  'Arc <br> Debut'];

}
