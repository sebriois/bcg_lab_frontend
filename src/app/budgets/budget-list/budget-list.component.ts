import { Component, OnInit } from '@angular/core';
import {Pagination} from '../../models/pagination.model';
import {Budget} from '../../models/budgets.model';
import {BudgetService} from '../../services/budget.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-budget-list',
  templateUrl: './budget-list.component.html',
  styleUrls: ['./budget-list.component.scss']
})
export class BudgetListComponent implements OnInit {
  pagination: Pagination;
  budgets: Array<Budget>;
  loading: boolean;

  constructor(
    private budgetService: BudgetService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.loadBudgets();
  }

  loadBudgets(page = 0): void {
    this.loading = true;
    this.budgetService.retrieve(page.toString()).subscribe(response => {
      this.budgets = response.results;
      this.pagination.totalItems = response.count;
      this.pagination.currentPage = page;
      this.pagination.nextPage = response.next;
      this.pagination.prevPage = response.previous;
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }

}
