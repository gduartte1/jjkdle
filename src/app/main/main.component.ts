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
    this.loadGuessedCharacters();
    this.checkDailyCharacter();
    this.loadvalidCharacters();
    this.startCountdown();
  }
  
  loadCurrentChampion(): void {
    const today = new Date();
    const currentDate = today.toDateString(); // Usar a data como string única para o dia
  
    const lastPlayedDate = localStorage.getItem('lastPlayedDate');
  
    if (lastPlayedDate !== currentDate) {
      // Novo dia, gera novo personagem
      this.currentCharacter = this.checkDailyCharacter();
  
      // Atualiza a data no localStorage
      localStorage.setItem('lastPlayedDate', currentDate);
  
      // Limpa os guessedCharacters do dia anterior SOMENTE quando um novo personagem for gerado
      localStorage.removeItem('guessedCharacters');
      this.guessedCharacters = []; // Limpa também a lista atual
  
      // Armazena o novo personagem do dia no localStorage
      localStorage.setItem('currentChampion', JSON.stringify(this.currentCharacter));
    } else {
      // Carregar o personagem do dia anterior do localStorage (se disponível)
      const storedChampion = localStorage.getItem('currentChampion');
      if (storedChampion) {
        this.currentCharacter = JSON.parse(storedChampion);
      } else {
        this.currentCharacter = this.checkDailyCharacter(); // Backup caso o storage falhe
      }
  
      // Carregar os guessedCharacters do localStorage
      this.loadGuessedCharacters();
    }
  }
  
  

  checkDailyCharacter() {
    const lastGeneratedDate = localStorage.getItem('lastGeneratedDate');
    const now = new Date();

    // Define o horário fixo para gerar o novo personagem (por exemplo, meia-noite)
    const targetTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);

    if (lastGeneratedDate) {
      const lastGenerated = new Date(lastGeneratedDate);
      
      // Verifica se o dia atual é diferente do dia do último personagem gerado
      if (now >= targetTime && (now.getDate() !== lastGenerated.getDate() || lastGenerated < targetTime)) {
        this.loadRandomCharacter();
        localStorage.setItem('lastGeneratedDate', now.toString()); // Atualiza a data de geração
        localStorage.removeItem('guessedCharacters'); // Limpa os personagens chutados
        this.guessedCharacters = [];
      } else {
        // Carrega o personagem atual salvo
        const savedChampion = localStorage.getItem('currentChampion');
        if (savedChampion) {
          this.currentCharacter = JSON.parse(savedChampion);
        }
      }
    } else {
      this.loadRandomCharacter(); // Gera o primeiro personagem se nunca foi gerado
      localStorage.setItem('lastGeneratedDate', now.toString()); // Armazena a primeira data de geração
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
    const champions = this.charactersService.getCharacters();
  
    // Obtém a data atual (ano, mês, dia)
    const now = new Date();
    const daySeed = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
  
    // Converte a string da data em um hash numérico
    const seed = this.hashString(daySeed);
  
    // Usa o hash como índice para selecionar o personagem
    const index = seed % champions.length;
    this.currentCharacter = champions[index];
  
    // Armazena o personagem atual localmente (para manter durante o dia)
    localStorage.setItem('currentChampion', JSON.stringify(this.currentCharacter));
  }
  
  // Função para criar um hash numérico a partir de uma string
  hashString(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = (hash << 5) - hash + str.charCodeAt(i);
      hash = hash & hash; // Converte para um número de 32 bits
    }
    return Math.abs(hash); // Retorna sempre um número positivo
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
      localStorage.setItem('guessedCharacters', JSON.stringify(this.guessedCharacters));
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

  loadGuessedCharacters() {
    const storedGuessedCharacters = localStorage.getItem('guessedCharacters');
  if (storedGuessedCharacters) {
    this.guessedCharacters = JSON.parse(storedGuessedCharacters);
  } else {
    this.guessedCharacters = [];
  }
  }

  characteristicNames_: string[] = ['gender',  'species',  'hair',  'innateTechniques',  'domainExpansion',  'grade',  'arcDebut'];

  characteristicNames: string[] = [  'Character', 'Gender',  'Species',  'Hair',  'Innate <br> Techniques',  'Domain <br> Expansion',  'Grade',  'Arc <br> Debut'];

}
