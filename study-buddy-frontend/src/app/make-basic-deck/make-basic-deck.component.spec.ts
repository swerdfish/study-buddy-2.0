import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeBasicDeckComponent } from './make-basic-deck.component';

describe('MakeBasicDeckComponent', () => {
  let component: MakeBasicDeckComponent;
  let fixture: ComponentFixture<MakeBasicDeckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MakeBasicDeckComponent ]
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
