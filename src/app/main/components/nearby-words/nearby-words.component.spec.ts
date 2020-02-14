import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NearbyWordsComponent } from './nearby-words.component';

describe('NearbyWordsComponent', () => {
  let component: NearbyWordsComponent;
  let fixture: ComponentFixture<NearbyWordsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NearbyWordsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NearbyWordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
