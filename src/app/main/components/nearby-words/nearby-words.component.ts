import { Component, OnInit } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material';
import {BertApiService} from '../../services/bert-api.service';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-nearby-words',
  templateUrl: './nearby-words.component.html',
  styleUrls: ['./nearby-words.component.scss']
})
export class NearbyWordsComponent implements OnInit {

  words: string[] = [];
  bertOutput: any[] = [];
  readonly separatorKeysCodes: number[] = [ENTER];

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
    this.bertOutput = []
  }

  send() {
    this.bertApi.getNearbyWords(this.words).pipe(take(1)).subscribe(
      (res: any[]) => {
        this.bertOutput = res;
      }
    );
  }
}
