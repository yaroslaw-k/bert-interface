import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BertApiService {

  constructor(private httpClient: HttpClient) {
  }

  getWordDistance(_words: string[]) {
    const words = [..._words];
    const payload = {
      target: words.shift(),
      words: [...words]
    };
    return this.httpClient.post(window.location.origin + '/bert-api/' + 'words-distance', payload);
  }

  getNearbyWords(word: string[]) {
    return this.httpClient.post(window.location.origin + '/bert-api/' + 'nearby-words', word);
  }

  getCentralWord(words: string[]) {
    return this.httpClient.post(window.location.origin + '/bert-api/' + 'central-word', words);
  }
}
