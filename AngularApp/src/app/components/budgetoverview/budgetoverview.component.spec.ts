import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetoverviewComponent } from './budgetoverview.component';

describe('BudgetoverviewComponent', () => {
  let component: BudgetoverviewComponent;
  let fixture: ComponentFixture<BudgetoverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BudgetoverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetoverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
