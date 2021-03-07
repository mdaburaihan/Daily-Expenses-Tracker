import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPastExpenseComponent } from './add-past-expense.component';

describe('AddPastExpenseComponent', () => {
  let component: AddPastExpenseComponent;
  let fixture: ComponentFixture<AddPastExpenseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPastExpenseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPastExpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
