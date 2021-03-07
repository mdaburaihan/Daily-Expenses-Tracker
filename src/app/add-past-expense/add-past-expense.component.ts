import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ExpenseService } from "../services/expense-service.service";
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-past-expense',
  templateUrl: './add-past-expense.component.html',
  styleUrls: ['./add-past-expense.component.css']
})
export class AddPastExpenseComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AddPastExpenseComponent>,
    private fb: FormBuilder,
    private ExpenseService: ExpenseService,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
  }

}
