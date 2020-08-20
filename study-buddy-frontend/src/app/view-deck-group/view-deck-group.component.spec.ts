import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDeckGroupComponent } from './view-deck-group.component';

describe('ViewDeckGroupComponent', () => {
  let component: ViewDeckGroupComponent;
  let fixture: ComponentFixture<ViewDeckGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewDeckGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDeckGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
