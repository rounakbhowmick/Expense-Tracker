import { TestBed } from '@angular/core/testing';

import { ExpenserecordService } from './expenserecord.service';

describe('ExpenserecordService', () => {
  let service: ExpenserecordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExpenserecordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
