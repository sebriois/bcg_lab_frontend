export class Budget {
  team: string;
  name: string;
  budget_type: string;
  default_nature: string;
  amount_spent: number;
  amount_left: number;
}

export class BudgetLine {
  team: string;
  budget: string;
  number: number;
  date: Date;
  nature: string;
  budget_type: string;
  provider: string;
  product: string;
  credit: string;
  debit: number;
  quantity: number;
}
