import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, tap} from 'rxjs/operators';
import {LevenshteinService} from './levenshtein.service';

@Injectable({
  providedIn: 'root'
})
export class BertApiService {

  constructor(private httpClient: HttpClient, private lev: LevenshteinService) {
  }

  getWordDistance(_words: string[]) {
    const words = [..._words];
    const payload = {
      target: words.shift(),
      words: [...words]
    };
    this.lev.getDif(payload.target, words[0]);
    return this.httpClient.post(window.location.origin + '/' + 'words-distance', payload).pipe(map(
      (res: string) => {
        return JSON.parse(res);
      }
    ));
  }

  getNearbyWords(word: string[]) {
    return this.httpClient.post(window.location.origin + '/' + 'nearby-words', {request_word: word[0], n_similar: 20}).pipe(map(
      (res: string) => {
        return JSON.parse(res);
      }
    ));
  }

  getCentralWord(words: string[]) {
    return this.httpClient.post(window.location.origin + '/' + 'central-word', {words: words}).pipe(map(
      (res: string) => {
        return JSON.parse(res);
      }
    ));
  }
}
