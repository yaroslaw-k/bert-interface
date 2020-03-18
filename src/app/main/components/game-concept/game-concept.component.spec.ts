import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameConceptComponent } from './game-concept.component';

describe('GameConceptComponent', () => {
  let component: GameConceptComponent;
  let fixture: ComponentFixture<GameConceptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameConceptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameConceptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
