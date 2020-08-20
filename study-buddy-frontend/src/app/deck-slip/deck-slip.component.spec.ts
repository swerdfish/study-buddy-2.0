import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeckSlipComponent } from './deck-slip.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Component } from '@angular/core';
import { FlashcardDeck } from '../model/flashcard-deck';

fdescribe('DeckSlipComponent', () => {
  let component: DeckSlipComponent;
  let fixture: ComponentFixture<DeckSlipComponent>;

  let testHostComponent: TestHostComponent;
  let testHostFixture: ComponentFixture<TestHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DeckSlipComponent, TestHostComponent],
      imports: [RouterTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeckSlipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    testHostFixture = TestBed.createComponent(TestHostComponent);
    testHostComponent = testHostFixture.componentInstance;
    testHostFixture.detectChanges();
  })

  it('should create', () => {
    expect(testHostFixture.nativeElement).toBeTruthy();
    expect(component).toBeTruthy();
  });

  @Component({
    selector: `host-component`,
    template: `<app-deck-slip id="slip" [deck]=deck></app-deck-slip>`
  })
  class TestHostComponent {
    deck: FlashcardDeck;

    constructor() {
      this.deck = new FlashcardDeck("1N5NjMvqfpCFYrj71UlHmsdnp98XwZbwZwwuetnExHzY", "Typescript", "A", "B", null, 1, "0");
    }
  }
});
