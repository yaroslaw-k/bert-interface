import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WordsDistanceComponent } from './words-distance.component';

describe('WordsDistanceComponent', () => {
  let component: WordsDistanceComponent;
  let fixture: ComponentFixture<WordsDistanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WordsDistanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WordsDistanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
