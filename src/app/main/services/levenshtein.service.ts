import { Injectable } from '@angular/core';
import levenshtein from 'fast-levenshtein';

@Injectable({
  providedIn: 'root'
})
export class LevenshteinService {
  constructor() {
  }

  getDif(w1, w2){

    return(levenshtein.get(w1, w2));
  }


}
