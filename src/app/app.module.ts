import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { ChampionComponent } from './champion/champion.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    ChampionComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
 
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
