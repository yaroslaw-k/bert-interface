import {Injectable} from '@angular/core';
import {BertApiService} from "./bert-api.service";
import {BehaviorSubject} from "rxjs";

export interface IGameState {
  phase: number;
  loading: boolean;
  word?: string;
  nearby?: string[];
  output?: any;
}

@Injectable({
  providedIn: 'root'
})
export class GameService {

  titles: string[] = [
    'Make a word',
    'Guess the word'
  ];
  initialState: IGameState = {
    phase: 0,
    loading: false
  };
  currentState: IGameState;
  stateSub: BehaviorSubject<IGameState>;


  constructor(private api: BertApiService) {
    this.stateSub = new BehaviorSubject<IGameState>(this.initialState);
    this.stateSub.subscribe(s => this.currentState = s);
  }

  dispatchItem() {
    this.stateSub.next(this.currentState);
  }


  makeWord(word: string) {
    word = word.toLowerCase();
    this.currentState.loading = true;
    this.dispatchItem();
    this.api.getNearbyWords([word]).toPromise().then(
      (words: string[]) => {
        this.currentState.output = words;
        this.currentState.loading = false;
        this.currentState.phase++;
        this.dispatchItem();
      }
    );
  }

  guessWord(word: string) {
    word = word.toLowerCase();
    if (word === this.currentState.word){

    }
  }


}
