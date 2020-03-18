import { Component, OnInit } from '@angular/core';
import {GameService} from '../../services/game.service';

@Component({
  selector: 'app-game-concept',
  templateUrl: './game-concept.component.html',
  styleUrls: ['./game-concept.component.scss']
})
export class GameConceptComponent implements OnInit {

  constructor(private gs: GameService) { }

  ngOnInit() {
  }

}
