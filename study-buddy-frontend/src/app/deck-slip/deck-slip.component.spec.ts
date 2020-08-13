import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeckSlipComponent } from './deck-slip.component';

describe('DeckSlipComponent', () => {
  let component: DeckSlipComponent;
  let fixture: ComponentFixture<DeckSlipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeckSlipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeckSlipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
