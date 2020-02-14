import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './components/main/main.component';
import {
  MatButtonModule,
  MatCardModule, MatChipsModule,
  MatDividerModule,
  MatFormFieldModule,
  MatIconModule,
  MatListModule,
  MatSidenavModule,
  MatToolbarModule
} from '@angular/material';
import { WordsDistanceComponent } from './components/words-distance/words-distance.component';
import { NearbyWordsComponent } from './components/nearby-words/nearby-words.component';
import { CentralWordComponent } from './components/central-word/central-word.component';
import {HttpClientModule} from '@angular/common/http';



@NgModule({
  declarations: [MainComponent, WordsDistanceComponent, NearbyWordsComponent, CentralWordComponent],
  exports: [
    MainComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MatToolbarModule,
    MatCardModule,
    MatIconModule,
    MatSidenavModule,
    MatDividerModule,
    MatListModule,
    MatFormFieldModule,
    MatChipsModule,
    MatButtonModule
  ]
})
export class MainModule { }
