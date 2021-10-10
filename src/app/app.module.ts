import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddExpensesComponent } from './add-expenses/add-expenses.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material/material.module';
import { ReactiveFormsModule, FormsModule  } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { ListExpensesComponent } from './list-expenses/list-expenses.component';
import { MonthlyLimitComponent } from './monthly-limit/monthly-limit.component';
import { AddPastExpenseComponent } from './add-past-expense/add-past-expense.component';
import { SignupComponent } from './signup/signup.component';
import { DisplayProfilePicComponent } from './display-profile-pic/display-profile-pic.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AuthGuard } from './auth.guard';


@NgModule({
  declarations: [
    AppComponent,
    AddExpensesComponent,
    LoginComponent,
    ListExpensesComponent,
    MonthlyLimitComponent,
    AddPastExpenseComponent,
    SignupComponent,
    DisplayProfilePicComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: "", canActivate:[AuthGuard], component: SignupComponent },
      { path: "add-expenses", canActivate:[AuthGuard], component: AddExpensesComponent },
      { path: "list-expenses", canActivate:[AuthGuard], component: ListExpensesComponent },
      { path: "login", component: LoginComponent },
    ]),
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent],
  entryComponents: [MonthlyLimitComponent, AddPastExpenseComponent]
})
export class AppModule { }
