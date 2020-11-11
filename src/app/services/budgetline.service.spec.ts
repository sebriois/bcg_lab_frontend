import { TestBed } from '@angular/core/testing';

import { BudgetlineService } from './budgetline.service';

describe('BudgetlineService', () => {
  let service: BudgetlineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BudgetlineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
