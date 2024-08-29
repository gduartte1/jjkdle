// champion.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChampionService {
  private champions = [
    {
      name: 'Itadori Yuuji',
      gender: 'Male',
      species: 'Human',
      hairColor: 'Pink',
      status: 'Alive',
      occupation: 'Jujutsu Sorcerer / Student',
      innateTechniques: 'Blood Manipulation / Shrine',
      domainExpansion: 'Unnamed',
      grade: 'Unknow',
      mangaDebut: '1',
      animeDebut: '1' ,
      photo: '../assets/images/yuuji.png'
      
},
{
      name: 'Satoru Gojo',
      gender: 'Male',
      species: 'Human',
      hairColor: 'White',
      status: 'Deceased',
      occupation: 'Jujutsu Sorcerer / Teacher',
      innateTechniques: 'Limitless / Six Eyes',
      domainExpansion: 'Unlimited Void',
      grade: 'Special',
      mangaDebut: '1',
      animeDebut: '1',
      photo: '../assets/images/gojo.png'
},
{
      name: 'Ryomen Sukuna',
      gender: 'Male',
      species: 'Human / Incarnation',
      hairColor: 'Pink',
      status: 'Alive',
      occupation: 'Calamity',
      innateTechniques: 'Shrine / Divine Flame / Ten Shadowns Technique',
      domainExpansion: 'Malevolent Shrine',
      grade: 'Special',
      mangaDebut: '1',
      animeDebut: '1',
      photo: '../assets/images/sukuna.png'
},
{
      name: 'Megumi Fushiguro',
      gender: 'Male',
      species: 'Human',
      hairColor: 'Black',
      status: 'Alive',
      occupation: 'Jujutsu Sorcerer / Student',
      innateTechniques: 'Ten Shadowns Technique',
      domainExpansion: 'Chimera Shadow Garden',
      grade: '2',
      mangaDebut: '1',
      animeDebut: '1',
      photo: '../assets/images/megumi.jpg'
},
{
      name: 'Yuta Okkotsu',
      gender: 'Male',
      species: 'Human',
      hairColor: 'Black',
      status: 'Alive',
      occupation: 'Jujutsu Sorcerer / Student',
      innateTechniques: 'Copy',
      domainExpansion: 'Authentic Mutual Love',
      grade: 'Special',
      mangaDebut: '137',
      animeDebut: '47',
      photo: '../assets/images/yuta.jpg'
},
{
      name: 'Nobara Kugisaki',
      gender: 'Female',
      species: 'Human',
      hairColor: 'Ginger',
      status: 'Unknow',
      occupation: 'Jujutsu Sorcerer / Student',
      innateTechniques: 'Straw Doll Technique',
      domainExpansion: 'None',
      grade: '3',
      mangaDebut: '3',
      animeDebut: '2',
      photo: '../assets/images/nobara.png'
},
{
      name: 'Masamichi Yaga',
      gender: 'Male',
      species: 'Human',
      hairColor: 'Dark Brown',
      status: 'Deceased',
      occupation: 'Jujutsu Sorcerer / Principal',
      innateTechniques: 'Cursed Corpse',
      domainExpansion: 'None',
      grade: '1',
      mangaDebut: '3',
      animeDebut: '2',
      photo: '../assets/images/yaga.png'
},
{
      name: 'Atsuya Kusakabe',
      gender: 'Male',
      species: 'Human',
      hairColor: 'Brown',
      status: 'Alive',
      occupation: 'Jujutsu Sorcerer / Teacher',
      innateTechniques: 'None',
      domainExpansion: 'None',
      grade: '1',
      mangaDebut: '83',
      animeDebut: '31',
      photo: '../assets/images/kusakabe.png'
},
{
      name: 'Kiyotaka Ijichi',
      gender: 'Male',
      species: 'Human',
      hairColor: 'Black',
      status: 'Alive',
      occupation: 'Jujutsu Sorcerer / Assistant Director / Driver',
      innateTechniques: 'None',
      domainExpansion: 'None',
      grade: 'Unknow',
      mangaDebut: '2',
      animeDebut: '4',
      photo: '../assets/images/ijichi.png'
},
{
      name: 'Shoko Ieiri',
      gender: 'Female',
      species: 'Human',
      hairColor: 'Brown',
      status: 'Alive',
      occupation: 'Jujutsu Sorcerer / Doctor',
      innateTechniques: 'None',
      domainExpansion: 'None',
      grade: 'Unknow',
      mangaDebut: '10',
      animeDebut: '5',
      photo: '../assets/images/ieiri.png'
},
{
      name: 'Akari Nitta',
      gender: 'Female',
      species: 'Human',
      hairColor: 'Blonde',
      status: 'Alive',
      occupation: 'Jujutsu Sorcerer / Auxiliary Manager',
      innateTechniques: 'None',
      domainExpansion: 'None',
      grade: 'Unknow',
      mangaDebut: '55',
      animeDebut: '22',
      photo: '../assets/images/nitta.jpeg'
},
{
      name: 'Maki Zenin',
      gender: 'Female',
      species: 'Human',
      hairColor: 'Dark Green',
      status: 'Alive',
      occupation: 'Jujutsu Sorcerer / Student',
      innateTechniques: 'Heavenly Restriction',
      domainExpansion: 'None',
      grade: '4',
      mangaDebut: '10',
      animeDebut: '5',
      photo: '../assets/images/maki.jpg'
},
{
      name: 'Toge Inumaki',
      gender: 'Male',
      species: 'Human',
      hairColor: 'Platinum Blonde',
      status: 'Alive',
      occupation: 'Jujutsu Sorcerer / Student',
      innateTechniques: 'Cursed Speech',
      domainExpansion: 'None',
      grade: 'Semi 1',
      mangaDebut: '1',
      animeDebut: '10',
      photo: '../assets/images/toge.jpg'
},
{
      name: 'Panda',
      gender: 'Male',
      species: 'Cursed Corpse',
      hairColor: 'No hair',
      status: 'Alive',
      occupation: 'Jujutsu Sorcerer / Student',
      innateTechniques: 'None',
      domainExpansion: 'None',
      grade: 'Semi 2',
      mangaDebut: '1',
      animeDebut: '10',
      photo: '../assets/images/panda.jpg'
},
{
      name: 'Kinji Hakari',
      gender: 'Male',
      species: 'Human',
      hairColor: 'Blonde',
      status: 'Alive',
      occupation: 'Jujutsu Sorcerer / Student / Bookie',
      innateTechniques: 'Private Pure Love Train',
      domainExpansion: 'Idle Death Gamble',
      grade: 'Unknow',
      mangaDebut: '153',
      animeDebut: 'N/A',
      photo: '../assets/images/hakari.jpg'
},
{
      name: 'Kirara Hoshi',
      gender: 'Male',
      species: 'Human',
      hairColor: 'Black',
      status: 'Alive',
      occupation: 'Jujutsu Sorcerer / Student',
      innateTechniques: 'Love Rendezvous',
      domainExpansion: 'None',
      grade: 'Unknow',
      mangaDebut: '153',
      animeDebut: 'N/A',
      photo: '../assets/images/kirara.png'
},
{
      name: 'Mahito',
      gender: 'Male',
      species: 'Cursed Spirit',
      hairColor: 'Ligth Blue',
      status: 'Deceased',
      occupation: '',
      innateTechniques: 'Idle Transfiguration',
      domainExpansion: 'Self-Embodiment of Perfection',
      grade: 'Special',
      mangaDebut: '16',
      animeDebut: '7',
      photo: '../assets/images/mahito.jpg'
},
{
      name: 'Jogo',
      gender: 'Male',
      species: 'Cursed Spirit',
      hairColor: 'No hair',
      status: 'Deceased',
      occupation: '',
      innateTechniques: 'Disaster Flames',
      domainExpansion: 'Coffin of the Iron Mountain',
      grade: 'Special',
      mangaDebut: '10',
      animeDebut: '5',
      photo: '../assets/images/jogo.png'
},
{
      name: 'Hanami',
      gender: 'Male',
      species: 'Cursed Spirit',
      hairColor: 'No hair',
      status: 'Deceased',
      occupation: '',
      innateTechniques: 'Disaster Plants',
      domainExpansion: 'Shining Sea of Growing Branches',
      grade: 'Special',
      mangaDebut: '10',
      animeDebut: '5',
      photo: '../assets/images/hanami.jpg'
},
{
      name: 'Dagon',
      gender: 'Male',
      species: 'Cursed Spirit',
      hairColor: 'No hair',
      status: 'Deceased',
      occupation: '',
      innateTechniques: 'Disaster Tides',
      domainExpansion: 'Horizon of the Captivating Skandha',
      grade: 'Special',
      mangaDebut: '10',
      animeDebut: '5',
      photo: '../assets/images/dagon.png'
},
{
      name: 'Rika Orimoto',
      gender: 'Female',
      species: 'Cursed Spirit',
      hairColor: 'No hair',
      status: 'Deceased',
      occupation: '',
      innateTechniques: 'None',
      domainExpansion: 'None',
      grade: 'Special',
      mangaDebut: '??',
      animeDebut: '??',
      photo: '../assets/images/rika.jpg'
}
  ];

  constructor() { }

  getChampions() {
    return this.champions;
  }

  getChampion(name: string) {
    return this.champions.find(champion => champion.name.toLowerCase() === name.toLowerCase());
  }
}
