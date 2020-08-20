import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDeckComponent } from './view-deck.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('ViewDeckComponent', () => {
  let component: ViewDeckComponent;
  let fixture: ComponentFixture<ViewDeckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ViewDeckComponent],
      imports: [RouterTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDeckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
