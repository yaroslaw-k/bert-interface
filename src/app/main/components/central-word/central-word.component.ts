import { Component, OnInit } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material';
import {BertApiService} from '../../services/bert-api.service';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-central-word',
  templateUrl: './central-word.component.html',
  styleUrls: ['./central-word.component.scss']
})
export class CentralWordComponent implements OnInit {
  words: string[] = [];
  bertOutput: string[] = [];
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

  send(){
    this.bertApi.getCentralWord(this.words).pipe(take(1)).subscribe(
      (res: string[]) => {
        this.bertOutput = res;
      }
    )
  }
}
