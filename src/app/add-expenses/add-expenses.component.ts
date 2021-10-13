import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { ExpenseService } from "../services/expense-service.service";
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MonthlyLimitComponent } from '../monthly-limit/monthly-limit.component';
import { AddPastExpenseComponent } from '../add-past-expense/add-past-expense.component';
import { Router } from '@angular/router';


@Component({
  selector: 'add-expenses',
  templateUrl: './add-expenses.component.html',
  styleUrls: ['./add-expenses.component.css']
})
export class AddExpensesComponent implements OnInit {
  expenseDetails: any;
  monthlyLimitDetails: any;
  amount: any = 0;
  todayTotalExpense: any = 0;
  totalMonthExpense: any = 0;
  totalBudget: any = 0;
  addExpenseForm: FormGroup;
  past_expense = false;
  maxDate = new Date();

  // displayFormFlag: any = true;
  // displayLoaderFlag: any = false;

  constructor(
    private fb: FormBuilder,
    private ExpenseService: ExpenseService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    private router: Router 
  ) { }

  ngOnInit() {
    this.addExpenseForm = this.fb.group({
      amount: ['0', Validators.required],
      reason: ['', Validators.required],
      past_expense: ['', Validators.required],
      past_expense_date: '',
      items: this.fb.array([
        //this.addItemFormGroup()
      ])
    })

    this.getExpenseDetails();

    this.maxDate;
    this.maxDate.setDate(this.maxDate.getDate() - 1);
  }

  addItemFormGroup(): FormGroup{
    return this.fb.group({
       item_name: ['', Validators.required],
       item_price: ['', Validators.required],
     })
   }

  pastExpenseToggle(){
    console.log(this.past_expense)
  }

   
  addCustomTagButtonClick(): void {
    (<FormArray>this.addExpenseForm.get('items')).push(this.addItemFormGroup());
  }

  removeCustomTagButtonClick(ctIndex: number): void {
    const customgTagFormArray = (<FormArray>this.addExpenseForm.get('items'));
    customgTagFormArray.removeAt(ctIndex);
  }

  addEditExpense() {

    if(this.totalBudget == undefined || this.totalBudget == null || this.totalBudget <= 0){
      this.openSnackBar("Please set monthly limit first.");
      return false;
    }

    if(this.addExpenseForm.value.amount <= 0){
      this.openSnackBar('Expense amount must be greater than 0.');
      return false;
   }

    if(this.addExpenseForm.value.amount > this.totalBudget){
      this.openSnackBar("Monthly limit can't exceed.");
      return false;
    }

    if(this.addExpenseForm.value.past_expense && 
      (this.addExpenseForm.value.past_expense_date.toLocaleString() == undefined || this.addExpenseForm.value.past_expense_date.toLocaleString() == null || 
      this.addExpenseForm.value.past_expense_date.toLocaleString() == "")){

        this.openSnackBar("Please select past expense date.");
        return false;
    }
  

    // console.log(this.addExpenseForm.value);
    // this.displayFormFlag = false;
    // this.displayLoaderFlag = true;
    
    let item_arr = this.addExpenseForm.value.items;

    let item_price_arr = item_arr.map(obj => obj.item_price);

    let total_item_price = item_price_arr.reduce((a, b) => a + b, 0);

    if(parseInt(total_item_price)>0 && (parseInt(total_item_price) !== this.addExpenseForm.value.amount)){
        this.openSnackBar('Total item price must be equal to total expense amount.');
        return false;
    }

    if(this.addExpenseForm.value.past_expense_date != undefined && this.addExpenseForm.value.past_expense_date != null && this.addExpenseForm.value.past_expense_date != ""){

      this.addExpenseForm.value.past_expense_date = this.addExpenseForm.value.past_expense_date.toLocaleString();
    }
    
    this.ExpenseService.addExpense(this.addExpenseForm.value).subscribe((data) => {
      // this.displayFormFlag = true;
      // this.displayLoaderFlag = false;
      this.openSnackBar('Expense Added Successfully!!');

      this.addExpenseForm.reset();
      Object.keys(this.addExpenseForm.controls).forEach(key => {
        this.addExpenseForm.controls[key].setErrors(null)
      });

      this.addExpenseForm.controls["amount"].setValue(0);

      let frmArray = this.addExpenseForm.get('items') as FormArray;
      frmArray.clear();

      this.getExpenseDetails();
      // this.addExpenseForm.controls["reason"].setValue('');

      // this.addExpenseForm.patchValue({ "amount": ['0', Validators.required] });
      // this.addExpenseForm.patchValue({ "reason": [null, Validators.required] });

      
      //this.addExpenseForm.reset();
    });
  }

  calculateExpense(action, amount): boolean {

    let currentAmount = 0;
    let monthlyAmount = 0;

    if(amount>0){
      switch(action){
        case "add": {
          currentAmount = parseInt(this.todayTotalExpense) + parseInt(amount);
          monthlyAmount = parseInt(this.totalMonthExpense) + parseInt(amount);
        }break;
        case "remove": {
          currentAmount = parseInt(this.todayTotalExpense) - parseInt(amount);
          monthlyAmount = parseInt(this.totalMonthExpense) - parseInt(amount);
        }break;
        default:
      }
  
      if(currentAmount<0){
        currentAmount = 0;
      }

      if(monthlyAmount<0){
        monthlyAmount = 0;
      }

      if(monthlyAmount > this.totalBudget){
        this.openSnackBar("Monthly budget can't exceed.");
        return false;
      }else{
        this.todayTotalExpense = currentAmount;
        this.totalMonthExpense = monthlyAmount;
      }
     
    }
   
    

    return true;
  }

  populateExpenses() {
    this.ExpenseService.expenseDetails.subscribe(res => {
      
      this.expenseDetails = res;

      this.todayTotalExpense = this.expenseDetails.today_total_expense;
      this.totalMonthExpense = this.expenseDetails.total_month_expense;
    });

    this.ExpenseService.monthlyLimitDetails.subscribe(res => {
      this.monthlyLimitDetails = res;

      if(this.monthlyLimitDetails != undefined && this.monthlyLimitDetails != null && Object.keys(this.monthlyLimitDetails).length>0){
        this.totalBudget = this.monthlyLimitDetails.limit_amount;
      }
      
    });
  }

  openSnackBar(message) {
    this._snackBar.open(message, 'Close', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  getExpenseDetails() {
    this.ExpenseService.getMonthlyLimit().subscribe(res => {

    });
    this.ExpenseService.getExpenseDetails().subscribe(res => {
      this.populateExpenses();
    });
  }

  logout() {
    localStorage.removeItem("userToken");
    this.router.navigate(['/login']);
  }

  openMonthlyLimitSetDialog(): void {
    const dialogRef = this.dialog.open(MonthlyLimitComponent, {
      width: '300px',
      data: { }
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

  openAddPastExpenseDialog(): void {
    const dialogRef = this.dialog.open(AddPastExpenseComponent, {
      width: '500px',
      data: { }
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }
  
}