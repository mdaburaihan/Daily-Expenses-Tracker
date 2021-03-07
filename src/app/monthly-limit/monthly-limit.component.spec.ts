import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyLimitComponent } from './monthly-limit.component';

describe('MonthlyLimitComponent', () => {
  let component: MonthlyLimitComponent;
  let fixture: ComponentFixture<MonthlyLimitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthlyLimitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthlyLimitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
