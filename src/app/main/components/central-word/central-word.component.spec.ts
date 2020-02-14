import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CentralWordComponent } from './central-word.component';

describe('CentralWordComponent', () => {
  let component: CentralWordComponent;
  let fixture: ComponentFixture<CentralWordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CentralWordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CentralWordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
