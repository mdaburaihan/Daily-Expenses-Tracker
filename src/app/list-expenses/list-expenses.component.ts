import { Component, OnInit } from '@angular/core';
import { ExpenseService } from "../services/expense-service.service";

export interface Expense {
  amount: number;
  reason: string;
  time: number;
}


@Component({
  selector: 'app-list-expenses',
  templateUrl: './list-expenses.component.html',
  styleUrls: ['./list-expenses.component.css']
})
export class ListExpensesComponent implements OnInit {

  displayedColumns: string[] = [];
  expenseListArr: Expense[] = [];
  panelOpenState = false;
  totalAmount: any = 0;

  constructor(
    private ExpenseService: ExpenseService,
  ) { }

  ngOnInit() {
    this.ExpenseService.getExpenseList().subscribe(res => {
      
      this.expenseListArr = res;
      this.displayedColumns = ['date_time', 'amount', 'reason', 'items'];
    });
  }

   /** Gets the total cost of all transactions. */
  getTotalCost(expense) {
    return expense.map(t => t.amount).reduce((acc, value) => acc + value, 0);
  }

}
