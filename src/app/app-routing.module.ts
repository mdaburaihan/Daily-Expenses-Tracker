import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { SignupComponent } from './signup/signup.component';
import { AddExpensesComponent } from './add-expenses/add-expenses.component';
import { ListExpensesComponent } from './list-expenses/list-expenses.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  { path: "", canActivate:[AuthGuard], component: SignupComponent },
  { path: "add-expenses", canActivate:[AuthGuard], component: AddExpensesComponent },
  { path: "list-expenses", canActivate:[AuthGuard], component: ListExpensesComponent },
  { path: "login", component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
