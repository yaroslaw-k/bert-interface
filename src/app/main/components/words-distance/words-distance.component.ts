import {Component, OnInit} from '@angular/core';
import {MatChipInputEvent} from '@angular/material';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {BertApiService} from '../../services/bert-api.service';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-words-distance',
  templateUrl: './words-distance.component.html',
  styleUrls: ['./words-distance.component.scss']
})
export class WordsDistanceComponent implements OnInit {
  words: string[] = [];
  bertOutput: number[] = [];
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(private bertApi: BertApiService) {
  }

  ngOnInit() {
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.words.push(value.trim());
    }
    if (input) {
      input.value = '';
    }
  }

  remove(word: string): void {
    const index = this.words.indexOf(word);

    if (index >= 0) {
      this.words.splice(index, 1);
    }
  }

  reset(): void {
    this.words = [];
    this.bertOutput = [];
  }

  send() {
    this.bertApi.getWordDistance(this.words).pipe(take(1)).subscribe(
      (res: number[]) => {
        this.bertOutput = res;
      }
    );
  }
}
