import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeckDashboardComponent } from './deck-dashboard.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('DeckDashboardComponent', () => {
  let component: DeckDashboardComponent;
  let fixture: ComponentFixture<DeckDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DeckDashboardComponent],
      imports: [RouterTestingModule]
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
