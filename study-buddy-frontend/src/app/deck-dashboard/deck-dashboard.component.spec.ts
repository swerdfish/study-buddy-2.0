import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeckDashboardComponent } from './deck-dashboard.component';

describe('DeckDashboardComponent', () => {
  let component: DeckDashboardComponent;
  let fixture: ComponentFixture<DeckDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeckDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeckDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
