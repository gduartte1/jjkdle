import { Component, OnInit } from '@angular/core';
import { CharactersService } from '../characters.service';
import { interval } from 'rxjs';

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
  searchResults: any[] = [];
  timeRemaining: string = '';

  constructor(private charactersService: CharactersService) { }

  ngOnInit(): void {
    this.checkDailyCharacter();
    this.loadvalidCharacters();
    this.startCountdown();
  }
  

  checkDailyCharacter() {
    const lastGeneratedDate = localStorage.getItem('lastGeneratedDate');
    const now = new Date();

    // Define o horário fixo para gerar o novo personagem (por exemplo, meia-noite)
    const targetTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);

    if (lastGeneratedDate) {
      const lastGenerated = new Date(lastGeneratedDate);
      
      // Verifica se o dia atual é diferente do dia do último personagem gerado
      if (now.getDate() !== lastGenerated.getDate() || now.getTime() <= targetTime.getTime()) {
        this.loadRandomCharacter();
      } else {
        // Carrega o personagem atual salvo
        const savedChampion = localStorage.getItem('currentChampion');
        if (savedChampion) {
          this.currentCharacter = JSON.parse(savedChampion);
        }
      }
    } else {
      this.loadRandomCharacter(); // Gera o primeiro personagem se nunca foi gerado
    }
  }

  getTimeRemaining(): string {
    const now = new Date();
    const nextReset = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0); // Próxima meia-noite
    const diffInMs = nextReset.getTime() - now.getTime();

    const hours = Math.floor((diffInMs / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diffInMs / (1000 * 60)) % 60);
    const seconds = Math.floor((diffInMs / 1000) % 60);
    return `${this.formatTime(hours)}:${this.formatTime(minutes)}:${this.formatTime(seconds)}`;
  }

  formatTime(unit: number): string {
    return unit < 10 ? '0' + unit : unit.toString();
  }

  startCountdown() {
    interval(1000).subscribe(() => {
      this.timeRemaining = this.getTimeRemaining();
    });
  }

  loadRandomCharacter() {
    const character = this.charactersService.getCharacters();
    this.currentCharacter = character[Math.floor(Math.random() * character.length)];
    localStorage.setItem('currentChampion', JSON.stringify(this.currentCharacter));
    const now = new Date();
    localStorage.setItem('lastGeneratedDate', now.toISOString());
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
