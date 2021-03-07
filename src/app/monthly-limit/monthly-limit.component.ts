import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ExpenseService } from "../services/expense-service.service";
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-monthly-limit',
  templateUrl: './monthly-limit.component.html',
  styleUrls: ['./monthly-limit.component.css']
})
export class MonthlyLimitComponent implements OnInit {
  monthlyLimitDetails: any;
  monthlyLimitForm: FormGroup;
  monthlyLimit: any = 0;
  constructor(
    public dialogRef: MatDialogRef<MonthlyLimitComponent>,
    private fb: FormBuilder,
    private ExpenseService: ExpenseService,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.monthlyLimitForm = this.fb.group({
      limit_amount: ['0', Validators.required]
    })

    this.getMonthlyLimit();
  }

  addMonthlyLimit() {
    this.ExpenseService.addMonthlyLimit(this.monthlyLimitForm.value).subscribe((data) => {

      this.openSnackBar('Monthly Limit Added Successfully!!');
      this.monthlyLimitForm.reset();
      this.monthlyLimitForm.controls["limit_amount"].setValue(0);
      this.getMonthlyLimit();

      this.dialogRef.close();
    });
  }

  getMonthlyLimit() {
    this.ExpenseService.getMonthlyLimit().subscribe(res => {
      this.populateMonthlyLimit();
    });
  }

  populateMonthlyLimit() {
    this.ExpenseService.monthlyLimitDetails.subscribe(res => {
      
      this.monthlyLimitDetails = res;
      this.monthlyLimit = this.monthlyLimitDetails.limit_amount;
      //console.log(this.monthlyLimitDetails);
      this.monthlyLimitForm.controls["limit_amount"].setValue(this.monthlyLimit);
    });
  }
  
  onNoClick(): void {
    this.dialogRef.close();
  }

  openSnackBar(message) {
    this._snackBar.open(message, 'Close', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

}
