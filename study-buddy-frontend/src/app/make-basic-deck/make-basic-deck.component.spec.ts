import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeBasicDeckComponent } from './make-basic-deck.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';

describe('MakeBasicDeckComponent', () => {
  let component: MakeBasicDeckComponent;
  let fixture: ComponentFixture<MakeBasicDeckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MakeBasicDeckComponent],
      imports: [RouterTestingModule, FormsModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MakeBasicDeckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
