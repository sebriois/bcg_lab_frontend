import { Component, OnInit } from '@angular/core';
import {BudgetLine} from '../../models/budgets.model';
import {Pagination} from '../../models/pagination.model';
import {BudgetlineService} from '../../services/budgetline.service';

@Component({
  selector: 'app-budget-lines',
  templateUrl: './budget-lines.component.html',
  styleUrls: ['./budget-lines.component.scss']
})
export class BudgetLinesComponent implements OnInit {
  budgetLines: Array<BudgetLine>;
  teams: Array<string>;
  pagination: Pagination;
  filters: any;
  loading: boolean;

  constructor(
    private budgetLineService: BudgetlineService
  ) { }

  ngOnInit(): void {
    this.filters = {};
    this.loadBudgetLines();
  }

  loadBudgetLines(page = 0) {
    this.budgetLineService.retrieve(page.toString(), this.filters).subscribe(response => {
      this.budgetLines = response.results;
      this.pagination.totalItems = response.count;
      this.pagination.currentPage = page;
      this.pagination.nextPage = response.next;
      this.pagination.prevPage = response.previous;
      this.teams = Array.from(new Set(this.budgetLines.map(bl => bl.team)));
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }

  filterBudgetLines(filters) {
    console.log(filters);
    this.filters = filters;
    this.loadBudgetLines(0);
  }

  getBudgetLinesFor(team) {
    return this.budgetLines.filter(bl => bl.team === team);
  }
}
