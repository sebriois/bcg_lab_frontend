import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-budget-filter-form',
  templateUrl: './budget-filter-form.component.html',
  styleUrls: ['./budget-filter-form.component.scss']
})
export class BudgetFilterFormComponent implements OnInit {
  @Output() onSubmit = new EventEmitter<any>();
  @Input() loading: boolean;

  isHidden: boolean;
  filters: any;

  constructor() { }

  ngOnInit(): void {
    this.filters = {};
    this.isHidden = false;
  }

  searchBudgetLines() {
    this.isHidden = true;
    this.onSubmit.emit(this.filters);
  }
}
