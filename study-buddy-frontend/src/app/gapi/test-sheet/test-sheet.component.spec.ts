import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestSheetComponent } from './test-sheet.component';

describe('TestSheetComponent', () => {
  let component: TestSheetComponent;
  let fixture: ComponentFixture<TestSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestSheetComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
